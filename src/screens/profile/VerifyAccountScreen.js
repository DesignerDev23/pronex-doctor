import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Modal } from 'react-native';
import authService from '../services/authService';

const VerifyAccountScreen = ({ navigation }) => {
  const [channel, setChannel] = useState('');
  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleVerifyAccount = async () => {
    try {
      const response = await authService.verifyAccount(channel, contact);
      console.log('Account verification response:', response);
      setModalMessage('Verification code sent successfully.');
      setModalVisible(true);
    } catch (error) {
      console.error('Verification error:', error.message);
      setErrorMessage(error.message || 'An error occurred. Please try again.');
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await authService.verifyOTP(channel, contact, otp);
      console.log('OTP verification response:', response);
      setModalMessage('OTP verified successfully.');
      setModalVisible(true);
    } catch (error) {
      console.error('OTP verification error:', error.message);
      setErrorMessage(error.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <ImageBackground source={require('../../../assets/images/bg.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Verify Your Account</Text>
        <Text style={styles.errorText}>{errorMessage}</Text>
        <TextInput
          style={styles.input}
          placeholder="Channel (e.g., email, phone)"
          value={channel}
          onChangeText={(text) => setChannel(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Contact (e.g., email address or phone number)"
          value={contact}
          onChangeText={(text) => setContact(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleVerifyAccount}>
          <Text style={styles.buttonText}>Send Verification Code</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          value={otp}
          onChangeText={(text) => setOtp(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
          <Text style={styles.buttonText}>Verify OTP</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
    margin: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default VerifyAccountScreen;
