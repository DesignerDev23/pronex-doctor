import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, StatusBar, Alert } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import styles from './style/helpAndSupportStyle'; // Assuming you will create a similar style file for HelpAndSupportScreen

const HelpAndSupportScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [messageValid, setMessageValid] = useState(true);

  const handleSubmit = () => {
    // Validate email and message fields
    if (email === '') {
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }

    if (message === '') {
      setMessageValid(false);
    } else {
      setMessageValid(true);
    }

    if (email === '' || message === '') {
      return; // Exit if validation fails
    }

    // Handle submission logic here
    Alert.alert('Submitted', 'Your request has been submitted successfully.');
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/bg.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#00B4FE" />
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back-ios" size={20} color="#fff" style={{ marginLeft: 5 }} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.heading}>Help & Support</Text>
          <Text style={styles.subheading}>We're here to assist you with any issues or questions you have.</Text>
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
          <View style={[styles.inputContainer, !messageValid && styles.invalidInput]}>
            <MaterialCommunityIcons name="message-outline" size={24} color="#00B4FE" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Message"
              onChangeText={(text) => setMessage(text)}
              value={message}
              multiline
              numberOfLines={4}
            />
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HelpAndSupportScreen;
