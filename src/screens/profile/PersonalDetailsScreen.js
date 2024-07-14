import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Octicons } from '@expo/vector-icons'; // Import Octicons
import { MaterialCommunityIcons, FontAwesome5, MaterialIcons,Ionicons, AntDesign} from '@expo/vector-icons'; 
import authService from '../services/authService';
import axios from 'axios';



const PersonalDetailsScreen = ({ route, navigation }) => {
  const { userData } = route.params;
  const [isVerified, setIsVerified] = useState(null);


  useEffect(() => {
    const checkVerificationStatus = async () => {
      try {
        const token = await authService.getToken();
        const options = {
          method: 'GET',
          url: 'https://pronex.abdulfortech.com/api/user/isverified',
          headers: { Accept: 'application/json', Authorization: `Bearer ${token}` }
        };
        const { data } = await axios.request(options);
        setIsVerified(data.verified);
      } catch (error) {
        console.error(error);
      }
    };
  
    checkVerificationStatus();
  }, []);
  

  const handleLogout = async () => {
    try {
      await authService.logout();
      // Alert.alert('Logout', 'You have been logged out successfully.');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Logout error', error);
      Alert.alert('Error', 'An error occurred while logging out.');
    }
  };
  

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#00B4FE" />
      <View style={styles.profileContainer}>
        <View style={styles.profilePicture}>
          {userData && userData.data.picture ? (
            <Image source={{ uri: userData.data.picture }} style={styles.profileImage} />
          ) : (
            <Text style={styles.profileInitial}>{userData?.data.firstName?.charAt(0)}</Text>
          )}
        </View>
        {userData && userData.data.firstName && (
          <Text style={styles.userName}>Personal Details</Text>
        )}
      </View>
      <View style={styles.whiteContainer}>
        <ScrollView contentContainerStyle={styles.infoContainer} showsVerticalScrollIndicator={false}>
          {/* Group 1: Personal Details - My Orders */}
          <View style={styles.groupContainer}>
          <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('PersonalDetails', { userData })}>
              <View style={styles.iconContainer}>
                <FontAwesome5 name="user-alt" size={24} color="#00B4FE" />
              </View>
              <Text style={styles.title}>{userData.data.firstName} {userData.data.lastName}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('PersonalDetails', { userData })}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="email" size={24} color="#00B4FE" />
              </View>
              <Text style={styles.title}>{userData.data.email}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('PersonalDetails', { userData })}>
              <View style={styles.iconContainer}>
                <FontAwesome5 name="phone" size={24} color="#00B4FE" />
              </View>
              <Text style={styles.title}>+234 {userData.data.phone1}</Text>
          </TouchableOpacity>


          </View>

          <View style={styles.groupContainer}>
              {isVerified === false && (
                <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('VerifyAccount')}>
                  <View style={styles.iconContainer}>
                    <FontAwesome5 name="user-alt" size={24} color="#00B4FE" />
                  </View>
                  <Text style={styles.title}>Verify Account</Text>
                  <MaterialCommunityIcons name="arrow-right" size={24} color="#00B4FE" />
                </TouchableOpacity>
              )}

              <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('PersonalDetails', { userData })}>
                <View style={styles.iconContainer}>
                  <FontAwesome5 name="user-alt" size={24} color="#00B4FE" />
                </View>
                <Text style={styles.title}>Update Profile</Text>
                <MaterialCommunityIcons name="arrow-right" size={24} color="#00B4FE" />
              </TouchableOpacity>
            </View>


        </ScrollView>
      </View>

      <View style={styles.header}>
        <Octicons name="bell" size={24} color="#fff" style={styles.icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#00B4FE',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profilePicture: {
    width: 95,
    height: 95,
    borderRadius: 53,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
  },
  profileInitial: {
    color: '#00B4FE',
    fontSize: 36,
    fontFamily: 'Montserrat',
  },
  userName: {
    color: '#FFF',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20,
    fontFamily: 'Montserrat',
  },
  whiteContainer: {
    flex: 1,
    borderTopLeftRadius: 30, // Border radius from the top-left corner
    borderTopRightRadius: 30, // Border radius from the top-right corner
    backgroundColor: '#FFFFFF', // White background color
    paddingHorizontal: 20, // Add horizontal padding as needed
    paddingTop: 20, // Add top padding as needed
    minHeight: '80%', // Define the height to 80% of the screen
  },
  infoContainer: {
    flexGrow: 1,
    paddingBottom: 100, // Add bottom padding as needed
    minHeight: '120%',
  },
  infoText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  icon: {
    marginRight: 15,
    marginTop: '-215%',
  },
  fixedBottom: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 180, 254, 0.2)',
    borderRadius: 15,
    marginBottom: 10,
    height: 60,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  iconContainer: {
    marginRight: 10,
    height: 40,
    width: 40,
    right: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 180, 254, 0.1)',
    borderRadius: 10, // Adjust the border radius as needed
  },
  title: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    fontFamily: 'Montserrat-SemiBold',
  },
  logout: {
    fontSize: 14,
    color: '#C23534',
    flex: 1,
    fontFamily: 'Montserrat-SemiBold',
  },
  groupContainer: {
    marginBottom: 30, // Adjust the margin bottom as needed
  },
  logoutContainer: {
    marginBottom: 50, // Adjust the margin bottom as needed for the log out button
  }
});

export default PersonalDetailsScreen;
