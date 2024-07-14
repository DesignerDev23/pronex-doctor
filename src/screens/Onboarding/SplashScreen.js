import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import authService from '../services/authService'; // Import authService

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    checkUserData();
  }, []);

  const checkUserData = async () => {
    try {
      // Check if a token exists in AsyncStorage
      const token = await authService.getToken();
      if (token) {
        // If token exists, fetch user data using the token
        const userData = await authService.getUserData(token);
        if (userData) {
          // If user data exists, navigate to HomeScreen with user data
          navigation.replace('HomeScreen', { userData });
        } else {
          // If user data doesn't exist, navigate to Onboarding
          navigation.navigate('Onboarding');
        }
      } else {
        // If token doesn't exist, navigate to Onboarding
        navigation.navigate('Onboarding');
      }
    } catch (error) {
      console.error('Error checking user data:', error);
      // Handle error (e.g., navigate to Onboarding)
      navigation.navigate('Onboarding');
    }
  };
  

  return (
    <LinearGradient colors={['#00B4FE', '#00B4FE']} style={styles.container}>
      <View style={styles.middleContainer}>
        <Image source={require('../../../assets/images/splash.png')} style={styles.largeLogo} />
      </View>
      <View style={styles.bottomContainer}>
        <Image source={require('../../../assets/images/bt.png')} style={styles.smallLogo} />
        <Text style={styles.text}>Powered by Bigtech Agency LTD</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 140,
  },
  bottomContainer: {
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 50,
  },
  largeLogo: {
    width: '87%',
    height: '87%',
    resizeMode: 'contain',
  },
  smallLogo: {
    width: 65,
    height: 45,
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default SplashScreen;
