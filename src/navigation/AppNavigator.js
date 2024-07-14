// AppNavigator.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/Onboarding/SplashScreen';
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';
import RoleSelectionScreen from '../screens/Auth/RoleSelectionScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import AuthScreen from '../screens/Auth/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import ResetPassword from '../screens/Auth/ResetPassword';
import CustomBottomTabBar from '../components/CustomBottomTabBar'; // Import the CustomBottomTabBar component
import DoctorsScreen from '../screens/DoctorsScreen';
import PharmacyScreen from '../screens/PharmacyScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PersonalDetailsScreen from '../screens/profile/PersonalDetailsScreen';
import VerifyAccountScreen from '../screens/profile/VerifyAccountScreen';
import VerifyOtpScreen from '../screens/profile/VerifyOtpScreen';
import DoctorProfileScreen from '../screens/Doctor/DoctorProfileScreen';
import BookAppointmentScreen from '../screens/Doctor/BookAppointmentScreen';
import AboutPronexHealth from '../screens/profile/AboutPronexHealth';
import MyOrders from '../screens/profile/MyOrders';
import Feedback from '../screens/profile/Feedback';
import HelpAndSupport from '../screens/profile/HelpAndSupport';
import MedicalRecords from '../screens/profile/MedicalRecords';
import MyAppointments from '../screens/profile/MyAppointments';
import PaymentMethods from '../screens/profile/PaymentMethods';
import PrivacyPolicy from '../screens/profile/PrivacyPolicy';
import SavedItems from '../screens/profile/SavedItems';
import SystemSetting from '../screens/profile/SystemSetting';
import TermsAndCondition from '../screens/profile/TermsAndCondition';
import FindDoctorScreen from '../screens/FindDoctorScreen';
import LabTestScreen from '../screens/LabTestScreen';
import BuyMedicationScreen from '../screens/BuyMedicationScreen';



const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="SelectRole" component={RoleSelectionScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="DoctorProfile" component={DoctorProfileScreen} />
      <Stack.Screen name="BookAppointment" component={BookAppointmentScreen} />
      {/* Add the screens for the tabs */}
      {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
      <Stack.Screen name="Doctors" component={DoctorsScreen} />
      <Stack.Screen name="Pharmacy" component={PharmacyScreen} />
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="PersonalDetails" component={PersonalDetailsScreen} />
      <Stack.Screen name="VerifyAccount" component={VerifyAccountScreen} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
      <Stack.Screen name="AboutPronexHealth" component={AboutPronexHealth} />
      <Stack.Screen name="MyOrders" component={MyOrders} />
      <Stack.Screen name="FeedBack" component={Feedback} />
      <Stack.Screen name="HelpAndSupport" component={HelpAndSupport} />
      <Stack.Screen name="MedicalRecords" component={MedicalRecords} />
      <Stack.Screen name="MyAppointments" component={MyAppointments} />
      <Stack.Screen name="PaymentMethods" component={PaymentMethods} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="SavedItems" component={SavedItems} />
      <Stack.Screen name="SystemSetting" component={SystemSetting} />
      <Stack.Screen name="TermsAndCondition" component={TermsAndCondition} />
      <Stack.Screen name="FindDoctor" component={FindDoctorScreen} />
      <Stack.Screen name="LabTest" component={LabTestScreen} />
      <Stack.Screen name="BuyMedication" component={BuyMedicationScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
