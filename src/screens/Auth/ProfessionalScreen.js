import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ImageBackground, Modal } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import authService from '../../screens/services/authService'; // Import your authService

const ProfessionalScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    username: 'Designer',
    specialization: 'Dentists',
    start_date: '12/12/2003',
    license_number: '12WMSKJE',
    license_body: 'National doctors association',
    license_validity_from: '12/12/2013',
    license_validity_to: '12/12/2017',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleRegister = async () => {
    // Combine day, month, and year into a single start_date value
    const { day, month, year } = formData.start_date;
    const startDate = `${day}/${month}/${year}`;
    const data = { ...formData, start_date: startDate };

    try {
      await authService.registerProfessional(data);
      navigation.navigate('NextScreen'); // Redirect to the next screen after registration
    } catch (error) {
      console.error('Registration error:', error);
      setModalMessage('An error occurred during registration. Please try again later.');
      setModalVisible(true);
    }
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
          <Text style={styles.heading}>Professional Registration</Text>
          <Text style={styles.subheading}>Complete your professional profile to get started.</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="user" size={22} color="#00B4FE" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={(text) => setFormData({ ...formData, username: text })}
            />
          </View>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="briefcase-outline" size={22} color="#00B4FE" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Specialization"
              onChangeText={(text) => setFormData({ ...formData, specialization: text })}
            />
          </View>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="calendar" size={22} color="#00B4FE" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Start Date (dd/mm/yyyy)"
              onChangeText={(text) => setFormData({ ...formData, start_date: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="credit-card" size={22} color="#00B4FE" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="License Number"
              onChangeText={(text) => setFormData({ ...formData, license_number: text })}
            />
          </View>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="file-document-outline" size={22} color="#00B4FE" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="License Body"
              onChangeText={(text) => setFormData({ ...formData, license_body: text })}
            />
          </View>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="calendar" size={22} color="#00B4FE" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="License Validity From (dd/mm/yyyy)"
              onChangeText={(text) => setFormData({ ...formData, license_validity_from: text })}
            />
          </View>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="calendar" size={22} color="#00B4FE" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="License Validity To (dd/mm/yyyy)"
              onChangeText={(text) => setFormData({ ...formData, license_validity_to: text })}
            />
          </View>
          <TouchableOpacity style={styles.signupButton} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
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
  dateInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dateInput: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderColor: '#00B4FE',
    borderWidth: 1,
    borderRadius: 15,
    marginHorizontal: 5,
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
  },
});

export default ProfessionalScreen;
