import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const DoctorCard = ({ doctors }) => {
  const navigation = useNavigation();

  const renderDoctorCard = (doctor) => {
    const totalYearsOfExperience = doctor.experience
      ? doctor.experience.reduce((total, exp) => total + (new Date(exp.to).getFullYear() - new Date(exp.from).getFullYear()), 0)
      : 0;

    return (
      <View key={doctor.doctorID} style={styles.card}>
        <View style={styles.infoContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.doctorName}>{doctor.firstName} {doctor.lastName}</Text>
            <Text style={styles.specialization}>{doctor.specialization}</Text>
            <View style={styles.ratingContainer}>
              {[...Array(5)].map((_, index) => (
                <FontAwesome
                  key={index}
                  name="star"
                  size={14}
                  color={index < doctor.rating ? '#FFD700' : '#F0C314'}
                />
              ))}
            </View>
            <Text style={styles.experience}>{totalYearsOfExperience} years of experience</Text>
            <Text style={styles.hospital}>{doctor.hospital}</Text>
          </View>
          <View style={styles.profilePictureContainer}>
            <View style={styles.profilePicture}>
              <FontAwesome5 name="user-md" size={24} color="#fff" />
            </View>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('DoctorProfile', { doctorID: doctor.doctorID })}
        >
          <FontAwesome name="calendar" size={24} color="#fff" />
          <Text style={styles.buttonText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {doctors.map(doctor => renderDoctorCard(doctor))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(0, 180, 254, 0.2)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontFamily: 'Montserrat',
    marginBottom: 5,
  },
  specialization: {
    fontSize: 14,
    fontFamily: 'poppins-regular',
    color: '#777',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  experience: {
    fontSize: 12,
    fontFamily: 'poppins-regular',
    color: '#777',
    marginBottom: 5,
  },
  hospital: {
    fontSize: 12,
    fontFamily: 'poppins-regular',
    color: '#777',
  },
  profilePictureContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicture: {
    backgroundColor: '#00B4FE',
    width: 80,
    height: 80,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: '#00B4FE',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Montserrat',
    marginLeft: 10,
  },
  scrollViewContainer: {
    padding: 10,
  },
});

export default DoctorCard;
