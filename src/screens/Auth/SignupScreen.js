
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ImageBackground, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import authService from '../services/authService';
import axios from 'axios';
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const SignupScreen = ({ navigation }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone1: '',
    password: '',
    role: 'doctor',
    password_confirmation: '', 
  });

  const [validFields, setValidFields] = useState({
    firstName: true,
    lastName: true,
    email: true,
    phone1: true,
    password: true,
    password_confirmation: true,
  });

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get('https://pronex.abdulfortech.com/api/auth/check-email', {
        headers: { Accept: 'application/json' },
        params: { email },
      });
      return response.data.exists;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  
  const checkPhoneExists = async (phone) => {
    try {
      const response = await axios.get('https://pronex.abdulfortech.com/api/auth/check-phone', {
        headers: { Accept: 'application/json' },
        params: { phone },
      });
      return response.data.exists;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleSignup = async () => {
    const isValid = validateFields();
    if (!isValid) return;
  
    const emailExists = await checkEmailExists(formData.email);
    const phoneExists = await checkPhoneExists(formData.phone1);
  
    if (emailExists) {
      setErrorMessage('Email already exists');
      setValidFields({ ...validFields, email: false });
      setModalMessage('The email you entered already exists. Please use a different email.');
      setModalVisible(true);
      return;
    }
  
    if (phoneExists) {
      setErrorMessage('Phone number already exists');
      setValidFields({ ...validFields, phone1: false });
      setModalMessage('The phone number you entered already exists. Please use a different phone number.');
      setModalVisible(true);
      return;
    }
  
    try {
      const response = await authService.signUp(formData);
      console.log(response); // Log the response for debugging
      navigation.navigate('Login'); // Redirect to LoginScreen after Signup
    } catch (error) {
      console.error('Signup error:', error);
      if (error.response) {
        console.error('Response data:', error.response.data); // Log response data for detailed error
      }
      // Handle error state or display error message to user
    }
  };
  
  const validateFields = () => {
    const updatedValidFields = {
      firstName: !!formData.firstName,
      lastName: !!formData.lastName,
      email: !!formData.email,
      phone1: !!formData.phone1,
      password: !!formData.password,
      password_confirmation: !!formData.password_confirmation,
    };

    setValidFields(updatedValidFields);

    return Object.values(updatedValidFields).every(Boolean);
  };

  return (
    
    <ImageBackground
      source={require('../../../assets/images/bg.png')}
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
        <View style={styles.titleContainer}>
          <Text style={styles.heading}>Get Started</Text>
          <Text style={styles.subheading}>Create your account and access expert healthcare services instantly.</Text>
        </View>
        <View style={styles.formContainer}>
          {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
          <View style={[styles.inputContainer, !validFields.firstName && styles.invalid]}>
            <FontAwesome5 name="user" size={22} color="#00B4FE" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="First Name"
              onChangeText={(text) => setFormData({ ...formData, firstName: text })}
            />
          </View>
          <View style={[styles.inputContainer, !validFields.lastName && styles.invalid]}>
            <FontAwesome5 name="user" size={22} color="#00B4FE" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              onChangeText={(text) => setFormData({ ...formData, lastName: text })}
            />
          </View>
          <View style={[styles.inputContainer, !validFields.email && styles.invalid]}>
            <MaterialCommunityIcons name="email-outline" size={22} color="#00B4FE" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={(text) => setFormData({ ...formData, email: text })}
            />
          </View>
          <View style={[styles.inputContainer, !validFields.phone1 && styles.invalid]}>
            <Icon name="phone" size={22} color="#00B4FE" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              onChangeText={(text) => setFormData({ ...formData, phone1: text })}
            />
          </View>
          <View style={[styles.inputContainer, !validFields.password && styles.invalid]}>
            <MaterialIcons name="lock-outline" size={22} color="#00B4FE" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={(text) => setFormData({ ...formData, password: text })}
              secureTextEntry={securePassword} // Toggle between secure and normal entry
            />
            <TouchableOpacity onPress={() => setSecurePassword(!securePassword)}>
              <MaterialIcons name={securePassword ? "visibility" : "visibility-off"} size={22} color="#00B4FE" style={styles.eyeIcon} />
            </TouchableOpacity>
          </View>
          <View style={[styles.inputContainer, !validFields.password_confirmation && styles.invalid]}>
            <MaterialIcons name="lock-outline" size={22} color="#00B4FE" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              onChangeText={(text) => setFormData({ ...formData, password_confirmation: text })}
              secureTextEntry={secureConfirmPassword} // Toggle between secure and normal entry
            />
            <TouchableOpacity onPress={() => setSecureConfirmPassword(!secureConfirmPassword)}>
              <MaterialIcons name={secureConfirmPassword ? "visibility" : "visibility-off"} size={22} color="#00B4FE" style={styles.eyeIcon} />
            </TouchableOpacity>
          </View>

          <Text style={styles.termsText}>
            By creating an account you agree to our{" "}
            <Text style={{ color: '#00B4FE' }}>Term of Use</Text>{" "}
            and{" "}
            <Text style={{ color: '#00B4FE' }}>Privacy Policy</Text>.
          </Text>
          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>Already have an account? <Text style={{ color: '#00B4FE' }}>Login</Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 180, 254, 0.99)',
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
    marginBottom: 10,
  },
  subheading: {
    fontSize: 15,
    fontFamily: 'poppins-regular',
    color: '#fff',
    textAlign: 'left',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
    height: '100%',
    paddingBottom: 40,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    transform: [{ translateY: -11 }], // Adjust the translateY value to center the icon vertically
  },  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderColor: '#00B4FE',
    borderWidth: 1,
    borderRadius: 15,
  },
  icon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 13,
    borderRadius: 15,
  },
  termsText: {
    fontSize: 12,
    fontFamily: 'poppins-regular',
    marginBottom: 10,
    textAlign: 'center',
  },
  signupButton: {
    backgroundColor: '#00B4FE',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    fontSize: 13,
    fontFamily: 'poppins-regular',
    marginTop: 10,
    textAlign: 'center',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  invalid: {
    borderColor: 'red',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SignupScreen;
