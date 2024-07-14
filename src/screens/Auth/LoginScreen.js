import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import authService from '../services/authService';
import * as LocalAuthentication from 'expo-local-authentication';
import Loader from '../../components/Loader';

const LoginScreen = ({ navigation, route }) => {
  // const { role } = route.params;
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
      const userData = { email, password };
      const response = await authService.signIn(userData);
      const { token } = response;

      const userDataResponse = await authService.getUserData(token);

      await authService.storeToken(token);
      await authService.storeUserData(userDataResponse);

      navigation.replace('HomeScreen', { userData: userDataResponse });
    } catch (error) {
      console.error(error);
      Alert.alert('Login Error', 'Invalid credentials. Please try again.');
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 180, 254, 0.99)',
  },
  backButton: {
    position: 'absolute',
    alignContent: 'center',
    justifyContent: 'center',
    top: 10,
    left: 20,
    borderRadius: 10,
    padding: 4,
    zIndex: 1,
  },
  titleContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  heading: {
    fontSize: 28,
    fontFamily: 'Montserrat',
    color: '#fff',
    textAlign: 'left',
    marginTop: '60%',
    marginBottom: 10,
  },
  createAccountButton: {
    bottom: -60,
    alignSelf: 'center',
  },
  createAccountText: {
    color: '#00B4FE',
    fontFamily: 'poppins-regular',
    fontSize: 14,
    bottom: 20,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 15,
    fontFamily: 'poppins-regular',
    color: '#fff',
    textAlign: 'left',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
    width: '100%',
    height: '88%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderColor: '#00B4FE',
    borderWidth: 1,
    borderRadius: 15,
  },
  invalidInput: {
    borderColor: 'red',
  },
  icon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 13,
    fontFamily: 'poppins-regular',
    borderRadius: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    marginLeft: 10,
    fontSize: 12,
    fontFamily: 'poppins-regular',
  },
  forgotPasswordText: {
    color: '#00B4FE',
    fontFamily: 'poppins-regular',
    fontSize: 13,
  },
  loginButton: {
    backgroundColor: '#00B4FE',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'poppins-regular',
    fontSize: 16,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  separatorText: {
    marginHorizontal: 10,
    color: '#999',
    fontFamily: 'poppins-regular',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 20,
  },
  socialButton: {
    width: 90,
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#00B4FE',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fingerprintButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  fingerprintText: {
    marginLeft: 10,
    color: '#00B4FE',
    fontFamily: 'poppins-regular',
  },
});

export default LoginScreen;
