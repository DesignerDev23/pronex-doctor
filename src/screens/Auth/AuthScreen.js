import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import authService from '../services/authService';
import Swiper from 'react-native-swiper';
import SignupScreen from './SignupScreen';
import LoginScreen from './LoginScreen';

const AuthScreen = ({ navigation }) => {
  const swiperRef = useRef(null); // Define swiperRef

  const handleSignup = async (formData) => {
    console.log(formData); // Check form data
    try {
      const response = await authService.signUp(formData);
      console.log(response); // Handle success or error response

      // Navigate to the login form
      navigateToSlide(1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignIn = async (email, password) => {
    try {
      const userData = {
        email,
        password,
      };

      const response = await authService.signIn(userData);
      console.log(response); // Handle success or error response

      // Navigate to the home screen upon successful login
      // Replace 'HomeScreen' with the name of your home screen
      navigation.replace('HomeScreen');
    } catch (error) {
      console.error(error);
    }
  };

  const navigateToSlide = (index) => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(index - swiperRef.current.state.index);
    }
  };

  return (
    <View style={styles.container}>
      <Swiper loop={false} showsPagination={false} ref={swiperRef}>
        {/* Sign Up Form */}
        <View style={styles.slide}>
          <SignupScreen handleSignup={handleSignup} />
        </View>

        {/* Login Form */}
        <View style={styles.slide}>
          <LoginScreen handleSignIn={handleSignIn} />
        </View>
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthScreen;
