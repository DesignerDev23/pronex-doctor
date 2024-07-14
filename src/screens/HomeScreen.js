import React from 'react';
import { View, Text, StatusBar, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons, Octicons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import UpcomingAppointment from '../components/UpcomingAppointment';
import DoctorCard from '../components/DoctorCard';
import CustomBottomTabBar from '../components/CustomBottomTabBar';
import HowCanWeHelpYou from '../components/HowCanWeHelpYou';
import PopularCategories from '../components/PopularCategories';

const HomeScreen = ({ route, navigation }) => {
  const { userData } = route.params;

  const handleSeeAllAppointments = () => {
    // Navigate to the screen to see all appointments
    navigation.navigate('AllAppointments');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FFF" />
      <View style={styles.header}>
        <View style={styles.leftContainer}>
          <View style={styles.profilePicture}>
            {userData && userData.picture ? (
              <Image source={{ uri: userData.picture }} style={styles.profileImage} />
            ) : (
              <Text style={styles.profileInitial}>{userData.firstName}</Text>
            )}
          </View>
          {userData && userData.firstName && (
            <Text style={styles.userName}>Hello {userData.doctor.firstName} !</Text>
          )}
        </View>
        <View style={styles.rightContainer}>
          <Octicons name="bell" size={24} color="#33363F" style={styles.icon} />
          <AntDesign name="shoppingcart" size={24} color="#33363F" style={styles.icon} />
        </View>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search Doctor, Specialities, symptoms"
          style={styles.searchInput}
          placeholderTextColor="#777"
        />
        <MaterialIcons name="search" size={24} color="#33363F" style={styles.searchIcon} />
        <FontAwesome5 name="sort-amount-down" size={24} color="#00B4FE" style={styles.filterIcon} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}
                   showsVerticalScrollIndicator={false}
                   showsHorizontalScrollIndicator={false}
      >
        <View style={styles.appointmentContainer}>
          <Text style={styles.upcomingText}>Upcoming Appointments</Text>
          <TouchableOpacity onPress={handleSeeAllAppointments} style={styles.seeAllContainer}>
            <Text style={styles.seeAllText}>See all</Text>
            <Entypo name="chevron-right" size={18} color="#777" style={styles.seeAllIcon} />
          </TouchableOpacity>
        </View>
        <UpcomingAppointment />
        <View style={styles.appointmentContainer}>
          <Text style={styles.upcomingText}>Available Doctors</Text>
          <TouchableOpacity onPress={handleSeeAllAppointments} style={styles.seeAllContainer}>
            <Text style={styles.seeAllText}>See all</Text>
            <Entypo name="chevron-right" size={18} color="#777" style={styles.seeAllIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <DoctorCard />
        </View>
        <View style={styles.appointmentContainer}>
          <Text style={styles.upcomingText}>How can we Help</Text>
          <TouchableOpacity onPress={handleSeeAllAppointments} style={styles.seeAllContainer}>
            <Text style={styles.seeAllText}>See all</Text>
            <Entypo name="chevron-right" size={18} color="#777" style={styles.seeAllIcon} />
          </TouchableOpacity>
        </View>
        <HowCanWeHelpYou />
        <View style={styles.appointmentContainer}>
          <Text style={styles.upcomingText}>Popular Categories</Text>
          <TouchableOpacity onPress={handleSeeAllAppointments} style={styles.seeAllContainer}>
            <Text style={styles.seeAllText}>See all</Text>
            <Entypo name="chevron-right" size={18} color="#777" style={styles.seeAllIcon} />
          </TouchableOpacity>
        </View>
        <PopularCategories />
      </ScrollView>
      <CustomBottomTabBar navigation={navigation} route={route} userDataResponse={userData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00B4FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Montserrat',
  },
  userName: {
    color: '#000',
    fontSize: 20,
    marginLeft: 15,
    fontFamily: 'Montserrat',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
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
  content: {
    // paddingHorizontal: 10,
  },
  scrollViewContent: {
    // paddingBottom: 80, // Ensure there's enough space at the bottom of the scrollable content
  },
  bottomTabBar: {
    position: 'fixed',
    left: 0,
    width: 30,
    right: 0,
  },
});

export default HomeScreen;
