import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Octicons } from '@expo/vector-icons'; // Import Octicons
import CustomBottomTabBar from '../components/CustomBottomTabBar';
import { MaterialCommunityIcons, FontAwesome5, MaterialIcons,Ionicons, AntDesign} from '@expo/vector-icons'; 
import authService from '../screens/services/authService';
import styles from './styles/ProfileScreenStyles';


const ProfileScreen = ({ route, navigation }) => {
  const { userData } = route.params;


  const handleLogout = async () => {
    try {
      await authService.logout();
      // Alert.alert('Logout', 'You have been logged out successfully.');
      const role = await authService.getUserRole();
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
          <Text style={styles.userName}>{userData.data.firstName} {userData.data.lastName}</Text>
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
              <Text style={styles.title}>Personal Details</Text>
              <MaterialCommunityIcons name="arrow-right" size={24} color="#00B4FE" />
            </TouchableOpacity>


            <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('PaymentMethods')}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="payment" size={24} color="#00B4FE" />
              </View>
              <Text style={styles.title}>Payment Methods</Text>
              <MaterialCommunityIcons name="arrow-right" size={24} color="#00B4FE" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('MedicalRecords')}>
              <View style={styles.iconContainer}>
                <FontAwesome5 name="clipboard-list" size={24} color="#00B4FE" />
              </View>
              <Text style={styles.title}>Medical Records</Text>
              <MaterialCommunityIcons name="arrow-right" size={24} color="#00B4FE" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('MyAppointments')}>
              <View style={styles.iconContainer}>
                <FontAwesome5 name="calendar-week" size={24} color="#00B4FE" />
              </View>
              <Text style={styles.title}>My Appointments</Text>
              <MaterialCommunityIcons name="arrow-right" size={24} color="#00B4FE" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('MyOrders')}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="cart" size={24} color="#00B4FE" />
              </View>
              <Text style={styles.title}>My Orders</Text>
              <MaterialCommunityIcons name="arrow-right" size={24} color="#00B4FE" />
            </TouchableOpacity>
          </View>

          {/* Group 2: Saved Items - System Setting */}
          <View style={styles.groupContainer}>
            <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('SavedItems')}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="bookmark" size={24} color="#00B4FE" />
              </View>
              <Text style={styles.title}>Saved Items</Text>
              <MaterialCommunityIcons name="arrow-right" size={24} color="#00B4FE" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('HelpAndSupport')}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="face-agent" size={24} color="#00B4FE" />
              </View>
              <Text style={styles.title}>Help and Support</Text>
              <MaterialCommunityIcons name="arrow-right" size={24} color="#00B4FE" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('SystemSetting')}>
              <View style={styles.iconContainer}>
                <Ionicons name="settings" size={24} color="#00B4FE" />
              </View>
              <Text style={styles.title}>System Setting</Text>
              <MaterialCommunityIcons name="arrow-right" size={24} color="#00B4FE" />
            </TouchableOpacity>
          </View>

          {/* Group 3: Terms & Condition - Feedback */}
          <View style={styles.groupContainer}>
            <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('ScreenName')}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="bookmark" size={24} color="#00B4FE" />
              </View>
              <Text style={styles.title}>Terms & Condition</Text>
              <MaterialCommunityIcons name="arrow-right" size={24} color="#00B4FE" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('ScreenName')}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="privacy-tip" size={24} color="#00B4FE" />
              </View>
              <Text style={styles.title}>Privacy Policy</Text>
              <MaterialCommunityIcons name="arrow-right" size={24} color="#00B4FE" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('ScreenName')}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="medical-information" size={24} color="#00B4FE" />
              </View>
              <Text style={styles.title}>About Pronex Health</Text>
              <MaterialCommunityIcons name="arrow-right" size={24} color="#00B4FE" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('ScreenName')}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="feedback" size={24} color="#00B4FE" />
              </View>
              <Text style={styles.title}>Feedback</Text>
              <MaterialCommunityIcons name="arrow-right" size={24} color="#00B4FE" />
            </TouchableOpacity>
          </View>

          {/* Log Out */}
          <TouchableOpacity style={[styles.itemContainer, styles.logoutContainer]} onPress={handleLogout}>
            <View style={styles.iconContainer}>
              <AntDesign name="logout" size={24} color="#C23534" />
            </View>
            <Text style={styles.logout}>Log Out</Text>
            <MaterialCommunityIcons name="arrow-right" size={23} color="#00B4FE" />
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={styles.fixedBottom}>
        <CustomBottomTabBar navigation={navigation} route={route} userDataResponse={userData} />
      </View>
      <View style={styles.header}>
        <Octicons name="bell" size={24} color="#fff" style={styles.icon} />
      </View>
    </View>
  );
};



export default ProfileScreen;
