import React from 'react';
import  { useState } from 'react';
import { View, Text, StatusBar, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { MaterialIcons, Octicons, AntDesign, FontAwesome5, Entypo, Feather } from '@expo/vector-icons';
import UpcomingAppointment from '../components/UpcomingAppointment';
import DoctorCard from '../components/DoctorCard';
import CustomBottomTabBar from '../components/CustomBottomTabBar';
import HowCanWeHelpYou from '../components/HowCanWeHelpYou';
import ConsultationList from '../components/ConsultationList';
import StatsSummary from '../components/StatsSummary';
import styles from '../screens/styles/HomeScreenStyles';

const HomeScreen = ({ route, navigation }) => {
  const { userData } = route.params;
  const [searchQuery, setSearchQuery] = useState('');


  const handleSeeAllAppointments = () => {
    navigation.navigate('Request');
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
              <Text style={styles.profileInitial}>{userData.data.firstName.charAt(0)}</Text>
            )}
          </View>
          {userData && userData.data.firstName && (
            <Text style={styles.userName}>Hello Dr. {userData.data.firstName} !</Text>
          )}
        </View>
        <View style={styles.rightContainer}>
          <Octicons name="bell" size={24} color="#33363F" style={styles.icon} />
          <Feather name="send" size={24} color="#33363F" style={styles.icon} />
        </View>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search Patient"
          style={styles.searchInput}
          placeholderTextColor="#777"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <MaterialIcons name="search" size={24} color="#33363F" style={styles.searchIcon} />
        <FontAwesome5 name="sort-amount-down" size={24} color="#00B4FE" style={styles.filterIcon} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <StatsSummary navigation={navigation} />
        <View style={styles.appointmentContainer}>
          <Text style={styles.upcomingText}>Consultation Requests</Text>
          <TouchableOpacity onPress={handleSeeAllAppointments} style={styles.seeAllContainer}>
            <Text style={styles.seeAllText}>See all</Text>
            <Entypo name="chevron-right" size={18} color="#777" style={styles.seeAllIcon} />
          </TouchableOpacity>
        </View>
        <ConsultationList navigation={navigation} />
      </ScrollView>
      <CustomBottomTabBar navigation={navigation} route={route} userDataResponse={userData} />
    </View>
  );
};

export default HomeScreen;
