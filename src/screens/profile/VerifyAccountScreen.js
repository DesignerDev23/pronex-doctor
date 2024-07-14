import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import authService from '../services/authService';
import { Picker } from '@react-native-picker/picker';
import Loader from '../../components/Loader';

const VerifyAccountScreen = ({ navigation }) => {
  const [channel, setChannel] = useState('email');
  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [error, setError] = useState(null);

  const handleVerifyAccount = async () => {
    setLoading(true);
    try {
      console.log('Attempting to verify account with channel:', channel, 'and contact:', contact);
      const data = await authService.verifyAccount(channel, contact);
      setVerificationStatus(data);
      setLoading(false);
      Alert.alert('OTP Sent', `The OTP has been sent to your contact via ${channel}`, [
        {
          text: 'OK',
          onPress: () => navigation.navigate('VerifyOtp', { channel, contact }),
        },
      ]);
    } catch (error) {
      console.error('Verification error:', error);
      setError(error);
      setLoading(false);
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
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
          <MaterialIcons name="arrow-back-ios" size={20} color="#fff" style={{ marginLeft: 5 }} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.heading}>Verify Account</Text>
          <Text style={styles.subheading}>Select a channel to receive your OTP</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="message-text-outline" size={24} color="#00B4FE" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Contact (Email/Phone)"
              onChangeText={(text) => setContact(text)}
              value={contact}
            />
          </View>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="email" size={24} color="#00B4FE" style={styles.icon} />
            <Picker
              selectedValue={channel}
              style={styles.input}
              onValueChange={(itemValue) => setChannel(itemValue)}
            >
              <Picker.Item label="Email" value="email" />
              <Picker.Item label="SMS" value="sms" />
              <Picker.Item label="WhatsApp" value="whatsapp" />
            </Picker>
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={handleVerifyAccount}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
          {verificationStatus && (
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>Status: {verificationStatus.message}</Text>
            </View>
          )}
          {error && <Text style={styles.errorText}>Failed to send OTP. Please try again.</Text>}
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
  icon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 13,
    borderRadius: 15,
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusContainer: {
    marginTop: 20,
  },
  statusText: {
    fontSize: 18,
    color: '#333',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default VerifyAccountScreen;
