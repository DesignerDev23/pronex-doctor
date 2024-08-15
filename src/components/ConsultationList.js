import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import authService from '../screens/services/authService';
import doctorProfileImage from '../../assets/images/doctor.png';

const ConsultationList = () => {
  const navigation = useNavigation(); // Get navigation object
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getConsultations = async () => {
      try {
        const data = await authService.fetchDoctorConsultations();
        console.log('Fetched Consultations:', data); // Log the fetched data
        setConsultations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getConsultations();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const formatDate = (date) => {
    return moment(date).format('dddd D MMM');
  };

  const truncateLocation = (location) => {
    const words = location.split(' ');
    if (words.length > 3) {
      return words.slice(0, 3).join(' ') + '...';
    }
    return location;
  };

  const handleViewRequest = (consultation) => {
    navigation.navigate('PatientDetails', { consultation }); // Navigate and pass data
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={consultations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <ImageBackground
              source={require('../../assets/images/pattern.png')}
              style={styles.backgroundImage}
            >
              <View style={styles.overlay}>
                <View style={styles.consultationItem}>
                  <View style={styles.topContainer}>
                    <Image
                      source={doctorProfileImage}
                      style={styles.profileImage}
                    />
                    <View style={styles.patientInfo}>
                      <Text style={styles.patientName}>{item.patient.firstName} {item.patient.lastName}</Text>
                      <Text style={styles.consultationType}>{item.type} consultation</Text>
                    </View>
                  </View>
                  <View style={styles.bottomContainer}>
                    <View style={styles.requestDetails}>
                      <Text style={styles.heading}>Requested on</Text>
                      <View style={styles.detailRow}>
                        <Ionicons name="calendar-number" size={16} color="#CCF0FF" />
                        <Text style={styles.detailText}>{formatDate(item.date)}</Text>
                      </View>
                      <View style={styles.detailRow}>
                        <FontAwesome name="map-marker" size={16} color="#CCF0FF" />
                        <Text style={styles.detailText}>{truncateLocation(item.address)}</Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.viewRequestButton} onPress={() => handleViewRequest(item)}>
                      <MaterialCommunityIcons name="eye-plus" size={16} color="#000" />
                      <Text style={styles.buttonText}>View Request</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  cardContainer: {
    marginBottom: 8,
    borderRadius: 15,
    overflow: 'hidden',
  },
  consultationItem: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImage: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    marginRight: 8, // Reduced margin
  },
  patientInfo: {
    flexDirection: 'column',
  },
  patientName: {
    fontSize: 14,
    fontFamily: 'poppins-semibold',
    color: '#fff',
  },
  consultationType: {
    fontSize: 12,
    fontFamily: 'poppins-regular',
    color: '#fff',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 180, 254, 0.9)',
    padding: 20,
    paddingLeft: 30,
  },
  requestDetails: {
    flex: 1,
  },
  heading: {
    fontSize: 14,
    fontFamily: 'poppins-semibold',
    color: '#fff',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  detailText: {
    fontSize: 10,
    color: '#fff',
    fontFamily: 'poppins-regular',
    marginLeft: 4, // Reduced margin
  },
  viewRequestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 18,
  },
  buttonText: {
    marginLeft: 4, // Reduced margin
    fontSize: 12,
    color: '#000',
    fontFamily: 'poppins-semibold',
  },
});

export default ConsultationList;
