import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import doctorService from '../screens/services/doctorService'; // Adjust the path if necessary

const DoctorCard = ({ token }) => { // Assuming you are passing the token as a prop
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await doctorService.fetchDoctors(token);
        setDoctors(data.data); // Adjust to use the 'data' field from the API response
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [token]);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('DoctorProfile', { doctorID: item.doctorID })} // Navigate to the DoctorProfile screen with doctorID
    >
      <View style={styles.leftContainer}>
        <View style={styles.profilePicture}>
          <FontAwesome5 name="user-md" size={24} color="#fff" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.doctorName}>{item.firstName} {item.lastName}</Text>
          <Text style={styles.specialization}>{item.specialization}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.phoneButton}>
        <FontAwesome5 name="phone-alt" size={18} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color="#00B4FE" />
      ) : (
        <FlatList
          data={doctors}
          renderItem={renderItem}
          keyExtractor={(item) => item.doctorID.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    marginRight: 10,
    width: 290, // Adjust as needed
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    backgroundColor: '#00B4FE',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 10,
  },
  doctorName: {
    fontSize: 15,
    fontFamily: 'Montserrat',
  },
  specialization: {
    fontSize: 12,
    fontFamily: 'poppins-regular',
    color: '#777',
  },
  phoneButton: {
    backgroundColor: '#00B4FE',
    padding: 10,
    borderRadius: 10,
  },
  flatListContainer: {
    paddingHorizontal: 10,
  },
});

export default DoctorCard;
