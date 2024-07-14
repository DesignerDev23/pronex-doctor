import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ImageBackground } from 'react-native';
import * as Font from 'expo-font';

Font.loadAsync({
  'poppins-regular': require('../../../assets/fonts/Poppins-Regular.ttf'), // Update the path accordingly
  'Montserrat': require('../../../assets/fonts/Montserrat-Bold.ttf'), // Update the path accordingly
  'Montserrat-Regular': require('../../../assets/fonts/Montserrat-Regular.ttf'), // Update the path accordingly
  'Montserrat-SemiBold': require('../../../assets/fonts/Montserrat-SemiBold.ttf'), // Update the path accordingly
});

const RoleSelectionScreen = ({ navigation }) => {
  const handleRoleSelect = (role) => {
    // Navigate to the appropriate signup screen based on the selected role
    navigation.navigate('Login', { role });
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/bg.png')} // Replace 'bg.png' with the actual image file path
      style={styles.container}
    >
      {/* Set the background color for the status bar */}
      <StatusBar backgroundColor="#00B4FE" />

      {/* Title and Subtitle Container */}
      <View style={styles.titleContainer}>
        <Text style={styles.heading}>Select User</Text>
        <Text style={styles.subheading}>Choose your role and join Pronex Health as a doctor or patient. </Text>
      </View>

      {/* Buttons Container */}
      <View style={styles.buttonsContainer}>

        {/* Patient and Doctor Buttons */}
        <View style={styles.roleButtonsContainer}>
          <TouchableOpacity
            style={[styles.roleButton]}
            onPress={() => handleRoleSelect('patient')}
          >
            <Text style={[styles.buttonText,  { color: '#00B4FE' }]}>Patient</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.roleButton]}
            onPress={() => handleRoleSelect('doctor')}
          >
            <Text style={[styles.buttonText, { color: '#00B4FE' }]}>Doctor</Text>
          </TouchableOpacity>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => console.log('Continue')}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover", // Cover the entire container
    backgroundColor: 'rgba(0, 180, 254, 0.99)', // Set background color with some transparency
  },
  titleContainer: {
    marginTop: -20,
    marginBottom: 20,
    paddingTop: 150, // Adjusted paddingTop for title and subtitle
    paddingHorizontal: 20, // Add padding for better spacing
    alignItems: 'flex-start', // Align items to the left
  },
  buttonsContainer: {
    flex: 1, // Fill the remaining space
    borderTopLeftRadius: 30, // Apply border radius to top corners
    borderTopRightRadius: 30,
    backgroundColor: '#fff', // Set white background color with some opacity
    paddingHorizontal: 20, // Add padding for better spacing
    paddingTop: 20, // Add paddingTop for better spacing
    justifyContent: 'center', // Center buttons vertically
    alignItems: 'center', // Center buttons horizontally
  },
  heading: {
    fontSize: 28,
    fontFamily: 'Montserrat', // Set Montserrat font family
    color: '#fff', // Set text color to white
    textAlign: 'left', // Align text to the left
  },
  subheading: {
    fontSize: 15,
    fontFamily: 'poppins-regular', // Set Poppins font family
    color: '#fff', // Set text color to white
    textAlign: 'left', // Align text to the left
  },

  roleButtonsContainer: {
    flexDirection: 'column',
    marginBottom: 20,
    marginTop: '-45%',
    justifyContent: 'space-between', // Space evenly between buttons
    width: '100%', // Occupy the full width
  },
  roleButton: {
    paddingVertical: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#00B4FE',
    marginBottom: 10,
    backgroundColor: '#fff', // Set white background color
  },

  continueButton: {
    backgroundColor: '#00B4FE',
    paddingVertical: 15,
    borderRadius: 15,
    marginBottom: 20,
    alignSelf: 'stretch', // Stretch button to fill the width
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'poppins-regular',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  continueButtonText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'poppins-regular',
    textAlign: 'center',
  },
});

export default RoleSelectionScreen;
