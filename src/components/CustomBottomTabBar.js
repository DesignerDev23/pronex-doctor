import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import HomeScreen from '../screens/HomeScreen';

const CustomBottomTabBar = ({ navigation, route, userDataResponse }) => {
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName, { userDataResponse });
  };

  return (
    <View style={[styles.container, { bottom: 0 }]}>
<TouchableOpacity onPress={() => navigation.navigate('HomeScreen', { userData: userDataResponse })} style={styles.tab}>
  <Image source={require('../../assets/icons/home.png')} style={styles.icon} />
  <Text style={styles.tabText}>Home</Text>
</TouchableOpacity>

      <TouchableOpacity onPress={() => navigateToScreen('Request')} style={styles.tab}>
        <Image source={require('../../assets/icons/doctor.png')} style={styles.icon} />
        <Text style={styles.tabText}>Patients</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('Consultations')} style={styles.tab}>
        <Image source={require('../../assets/icons/appointments.png')} style={styles.icon} />
        <Text style={styles.tabText}>Appointments</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('Messages')} style={styles.tab}>
        <Image source={require('../../assets/icons/messages.png')} style={styles.icon} />
        <Text style={styles.tabText}>Messages</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile', { userData: userDataResponse })} style={styles.tab}>
        <Image source={require('../../assets/icons/profile.png')} style={styles.icon} />
        <Text style={styles.tabText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'fixed',
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#00B4FE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    height: 80,
    top: 15,
    bottom: 15,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  tab: {
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 2,
  },
  tabText: {
    fontSize: 8,
    marginTop: 2,
    color: '#fff',
    fontFamily: 'Montserrat',
  },
});

export default CustomBottomTabBar;
