import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, StatusBar, Alert } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import authService from '../services/authService';
import * as LocalAuthentication from 'expo-local-authentication';
import Loader from '../../components/Loader';
import styles from './style/loginStyle';

const LoginScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  useEffect(() => {
    checkLoggedInStatus();
  }, []);

  const checkLoggedInStatus = async () => {
    try {
      const token = await authService.getToken();
      if (token) {
        const userData = await authService.getUserData(token);
        navigation.replace('HomeScreen', { userData });
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  const handleSignIn = async () => {
    // Validate email and password fields
    if (email === '') {
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }
  
    if (password === '') {
      setPasswordValid(false);
    } else {
      setPasswordValid(true);
    }
  
    if (email === '' || password === '') {
      return; // Exit if validation fails
    }
  
    setLoading(true); // Show loader
    try {
      // Sign in and get token
      const userData = { email, password };
      const response = await authService.signIn(userData);
      const { token } = response;
  
      // Store token and fetch user data
      await authService.storeToken(token);
      const userDataResponse = await authService.getUserData(token);
      await authService.storeUserData(userDataResponse);
  
      // Extract isVerified status from the user data
      const { isVerified } = userDataResponse.data;
  
      if (!isVerified) {
        // Send verification request if not verified
        await authService.verifyAccount(email);
  
        // Notify the user and redirect them
        Alert.alert('Verification Required', 'Please verify your account to proceed.');
        
        // Navigate to the verification screen
        navigation.replace('VerifyOtp', {email} );
      } else {
        // Navigate to HomeScreen if verified
        navigation.replace('HomeScreen', { userData: userDataResponse });
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Login Error', 'Invalid credentials or verification issue. Please try again.');
    } finally {
      setLoading(false); // Hide loader
    }
  };
  
  
  
  

  const authenticateWithFingerprint = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync();
      if (result.success) {
        handleSignIn();
      } else {
        console.log('Authentication failed');
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/bg.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#00B4FE" />
        {loading && <Loader />}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back-ios" size={20} color="#fff" style={{marginLeft: 5}} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.heading}>Welcome Back !!</Text>
          <Text style={styles.subheading}>Sign in back to your account and access expert healthcare services instantly.</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={[styles.inputContainer, !emailValid && styles.invalidInput]}>
            <MaterialCommunityIcons name="email-outline" size={24} color="#00B4FE" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
          </View>
          <View style={[styles.inputContainer, !passwordValid && styles.invalidInput]}>
            <MaterialCommunityIcons name="lock-outline" size={24} color="#00B4FE" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry
            />
          </View>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={() => setRememberMe(!rememberMe)} style={styles.checkbox}>
              {rememberMe ? (
                <MaterialCommunityIcons name="checkbox-marked" size={24} color="#00B4FE" />
              ) : (
                <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="#00B4FE" />
              )}
              <Text style={styles.checkboxText}>Remember Me</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.separatorContainer}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>or Login With</Text>
            <View style={styles.separatorLine} />
          </View>
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <MaterialCommunityIcons name="facebook" size={24} color="#00B4FE" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <MaterialCommunityIcons name="google" size={24} color="#00B4FE" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <MaterialCommunityIcons name="apple" size={24} color="#00B4FE" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.fingerprintButton} onPress={authenticateWithFingerprint}>
            <MaterialCommunityIcons name="fingerprint" size={24} color="#00B4FE" />
            <Text style={styles.fingerprintText}>Sign in with fingerprint</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.createAccountButton} onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.createAccountText}>Create an Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
