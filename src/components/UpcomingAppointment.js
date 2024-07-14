import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import authService from '../screens/services/authService';
import axios from 'axios';
import doctorProfileImage from '../../assets/images/doctor.png';

const UpcomingAppointment = () => {
  const [appointmentData, setAppointmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        const token = await authService.getToken();
        const userID = await authService.getUserID();
        if (!token) {
          throw new Error('No authentication token found');
        }

        const options = {
          method: 'GET',
          url: `https://pronex.abdulfortech.com/api/consultations/active?userID=${userID}`,
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axios.request(options);
        setAppointmentData(data.data); // Adjusted to access the nested data object
        
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00B4FE" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error fetching appointment data</Text>
      </View>
    );
  }

  if (!appointmentData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No upcoming appointments</Text>
      </View>
    );
  }

  const { doctor, date, start_time } = appointmentData;
  const { firstName, specialization } = doctor;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.leftContainer}>
          <View style={styles.backgroundCircle}>
            <Image
              style={styles.profilePicture}
              source={doctorProfileImage}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.doctorName}>{firstName}</Text>
            <Text style={styles.specialty}>{specialization}</Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.phoneIconContainer}>
            <FontAwesome name="phone" size={20} color="#00B4FE" />
          </View>
        </View>
      </View>
      <View style={styles.dateTimeContainer}>
        <FontAwesome name="calendar" size={18} color="#00B4FE" style={styles.icon} />
        <Text style={styles.appointmentDateTime}>{date}</Text>
        <View style={styles.lineSeparator}></View>
        <FontAwesome name="clock-o" size={18} color="#00B4FE" style={styles.icon} />
        <Text style={styles.appointmentDateTime}>{start_time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 9,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00B4FE',
    borderRadius: 20,
    width: '96%',
    padding: 15,
    marginLeft: 10,
    marginBottom: 10,
    height: 160,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -60,
  },
  backgroundCircle: {
    backgroundColor: '#fff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicture: {
    width: 55,
    height: 55,
    borderRadius: 40,
    backgroundColor: '#fff',
  },
  textContainer: {
    marginLeft: 10,
  },
  doctorName: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Montserrat',
  },
  specialty: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'poppins-regular',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginTop: -60,
  },
  phoneIconContainer: {
    backgroundColor: '#fff',
    borderRadius: 60,
    padding: 15,
    marginBottom: 10,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    marginTop: -70,
    width: '83%',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 7,
    paddingHorizontal: 15,
    marginLeft: 30,
    paddingVertical: 10,
  },
  appointmentDateTime: {
    fontSize: 10,
    color: '#00B4FE',
    flex: 1,
    marginLeft: 10,
    fontFamily: 'poppins-regular',
  },
  lineSeparator: {
    width: 1,
    height: '100%',
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },
  errorText: {
    fontSize: 13,
    color: '#ddd',
    fontFamily: 'Montserrat',
    textAlign: 'center',
  },
});

export default UpcomingAppointment;
