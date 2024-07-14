import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, TextInput, ScrollView } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import PopularCategories from '../components/PopularCategories';
import DoctorCard from './DoctorCard';
import { ActivityIndicator } from 'react-native';
import doctorService from '../screens/services/doctorService'; // Adjust the path if necessary

const FindDoctorScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = 'YOUR_TOKEN_HERE'; // Replace with your actual token
        const data = await doctorService.fetchDoctors(token);
        setDoctors(data.data); // Adjust to use the 'data' field from the API response
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const fullName = `${doctor.firstName} ${doctor.lastName}`.toLowerCase();
    const specialization = doctor.specialization.toLowerCase();
    const query = searchQuery.toLowerCase();
    return fullName.includes(query) || specialization.includes(query);
  });

  const handleSeeAllAppointments = () => {
    // Navigate to the screen to see all appointments
    navigation.navigate('AllAppointments');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back-ios" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Find a Doctor</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search Doctor, Specialities, symptoms"
          style={styles.searchInput}
          placeholderTextColor="#777"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <MaterialIcons name="search" size={24} color="#33363F" style={styles.searchIcon} />
        <FontAwesome5 name="sort-amount-down" size={24} color="#00B4FE" style={styles.filterIcon} />
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.appointmentContainer}>
          <Text style={styles.upcomingText}>Popular Categories</Text>
          <TouchableOpacity onPress={handleSeeAllAppointments} style={styles.seeAllContainer}>
            <Text style={styles.seeAllText}>See all</Text>
            <Entypo name="chevron-right" size={18} color="#777" style={styles.seeAllIcon} />
          </TouchableOpacity>
        </View>
        <PopularCategories />
        {loading ? (
          <ActivityIndicator size="large" color="#00B4FE" />
        ) : (
          <DoctorCard doctors={filteredDoctors} />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  seeAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    color: '#777',
    fontSize: 10,
    fontFamily: 'poppins-regular',
    marginRight: 5,
  },
  seeAllIcon: {
    marginLeft: 5,
  },
  appointmentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 15,
  },
  upcomingText: {
    color: '#777',
    fontSize: 10,
    fontFamily: 'Montserrat',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Montserrat',
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'rgba(0, 180, 254, 0.2)',
    borderRadius: 14,
    paddingHorizontal: 42,
    fontStyle: 'italic',
    marginRight: 10,
    height: 35,
  },
  searchIcon: {
    position: 'absolute',
    left: 30,
    top: 6,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontSize: 18,
    color: '#000',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
});

export default FindDoctorScreen;
