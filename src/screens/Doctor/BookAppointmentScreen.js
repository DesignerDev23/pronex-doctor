import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import DoctorCard from './DoctorCard';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import doctorService from '../services/doctorService';
import authService from '../services/authService';
import ProgressBar from './ProgressBar';
import axios from 'axios';

const BookAppointmentScreen = ({ route, navigation, userDataResponse}) => {
  const { doctorID, doctor } = route.params;
  const [step, setStep] = useState(1);
  const [token, setToken] = useState('');
  const [formData, setFormData] = useState({
    doctorID: doctorID,
    type: 'in-person',
    duration: '',
    date: '',
    start_time: '',
    end_time: '',
    address: '',
    contact: '',
    note: ''
  });

  useEffect(() => {
    const fetchToken = async () => {
      const userToken = await authService.getToken();
      setToken(userToken);
    };
    fetchToken();
  }, []);

  const handleInputChange = (name, value) => {
    if (name === 'duration') {
      const startTime = formData.start_time.split(':');
      const startHours = parseInt(startTime[0]);
      const startMinutes = parseInt(startTime[1]);
      const durationMinutes = parseInt(value);
      const endMinutes = (startMinutes + durationMinutes) % 60;
      const endHours = startHours + Math.floor((startMinutes + durationMinutes) / 60);
      const endHoursFormatted = endHours < 10 ? `0${endHours}` : endHours.toString();
      const endMinutesFormatted = endMinutes < 10 ? `0${endMinutes}` : endMinutes.toString();
      const endTime = `${endHoursFormatted}:${endMinutesFormatted}`;

      setFormData({
        ...formData,
        [name]: value,
        end_time: endTime
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    try {
      console.log('Submitting form data:', formData);
      const data = await doctorService.addConsultation(formData, token);
      console.log('Consultation added successfully:', data);
      navigation.navigate('HomeScreen', { userData: userDataResponse  });
    } catch (error) {
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'There was an issue submitting the form. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backNav}>
          <MaterialIcons name="arrow-back-ios" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Schedule an Appointment</Text>
      </View>
      <DoctorCard doctor={doctor} />
      <ProgressBar totalSteps={3} currentStep={step} />
      <Animatable.View animation="fadeIn" style={styles.step}>
        {step === 1 && (
          <Animatable.View key={step} animation="fadeInRight" style={styles.step}>
            <Text style={styles.label}>Type</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.type}
                onValueChange={(value) => handleInputChange('type', value)}
                style={styles.picker}
              >
                <Picker.Item label="In-person" value="in-person" />
                <Picker.Item label="Virtual" value="virtual" />
              </Picker>
            </View>
            <Text style={styles.label}>Duration</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.duration}
                onValueChange={(value) => handleInputChange('duration', value)}
                style={styles.picker}
              >
                <Picker.Item label="Select Duration" value="" />
                <Picker.Item label="15 minutes" value="15" />
                <Picker.Item label="30 minutes" value="30" />
                <Picker.Item label="60 minutes" value="60" />
              </Picker>
            </View>
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </Animatable.View>
        )}
        {step === 2 && (
          <Animatable.View key={step} animation="fadeInRight" style={styles.step}>
            <Text style={styles.label}>Date</Text>
            <TextInput
              style={styles.input}
              value={formData.date}
              onChangeText={(value) => handleInputChange('date', value)}
              placeholder="YYYY-MM-DD"
            />
            <Text style={styles.label}>Start Time</Text>
            <TextInput
              style={styles.input}
              value={formData.start_time}
              onChangeText={(value) => handleInputChange('start_time', value)}
              placeholder="HH:MM"
            />
            <Text style={styles.label}>End Time</Text>
            <TextInput
              style={styles.input}
              value={formData.end_time}
              placeholder="HH:MM"
              editable={false}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        )}
        {step === 3 && (
          <Animatable.View key={step} animation="fadeInRight" style={styles.step}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              value={formData.address}
              onChangeText={(value) => handleInputChange('address', value)}
            />
            <Text style={styles.label}>Contact</Text>
            <TextInput
              style={styles.input}
              value={formData.contact}
              onChangeText={(value) => handleInputChange('contact', value)}
            />
            <Text style={styles.label}>Note</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline={true}
              numberOfLines={4}
              value={formData.note}
              onChangeText={(value) => handleInputChange('note', value)}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        )}
      </Animatable.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff'
  },
  step: {
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    fontFamily: 'Montserrat',
    marginBottom: 5
  },
  backNav: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'poppins-bold',
    left: 48,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontFamily: 'Montserrat'
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 20
  },
  picker: {
    height: 50,
    width: '100%'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  nextButton: {
    backgroundColor: '#00B4FE',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginRight: 5
  },
  backButton: {
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginRight: 5
  },
  submitButton: {
    backgroundColor: '#00B4FE',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    width: '100%',
  },
  textArea: {
    height: 120,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Montserrat'
  }
});

export default BookAppointmentScreen;
