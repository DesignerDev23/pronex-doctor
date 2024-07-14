import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Octicons } from '@expo/vector-icons'; // Import Octicons
import CustomBottomTabBar from '../components/CustomBottomTabBar';
import { MaterialCommunityIcons, FontAwesome5, MaterialIcons,Ionicons, AntDesign} from '@expo/vector-icons'; 
import authService from '../screens/services/authService';


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
            {/* <Text style={styles.profileInitial}>{userData?.data.firstName?.charAt(0)}</Text> */}
          {/* {userData && userData.data.picture ? (
            <Image source={{ uri: userData.data.picture }} style={styles.profileImage} />
          ) : (
          
          )} */}
        </View>
        {/* {userData && userData.data.firstName && (
          <Text style={styles.userName}>{userData.data.firstName} {userData.data.lastName}</Text>
        )} */}
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

export default ProfileScreen;
