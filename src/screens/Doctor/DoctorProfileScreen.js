import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, StatusBar, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { FontAwesome, MaterialIcons, Feather } from '@expo/vector-icons';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import doctorService from '../../screens/services/doctorService';
import doctorProfileImage from '../../../assets/images/doctor.png';



const DoctorProfileScreen = ({ route, navigation }) => {
  const { doctorID } = route.params;
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = "YOUR_AUTH_TOKEN"; // Replace with actual token handling
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'overview', title: 'Overview' },
    { key: 'expertise', title: 'Expertise' },
    { key: 'review', title: 'Review' },
  ]);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const data = await doctorService.fetchDoctorById(doctorID, token);
        setDoctor(data.data); // Adjust to use the 'data' field from the API response
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [doctorID, token]);

  if (loading) {
    return <ActivityIndicator size="large" color="#00B4FE" top="20"/>;
  }

  if (!doctor) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Doctor not found.</Text>
      </View>
    );
  }

  // Calculate years of experience based on the experience data
  const totalYearsOfExperience = doctor.experience
    ? doctor.experience.reduce((total, exp) => total + (new Date(exp.to).getFullYear() - new Date(exp.from).getFullYear()), 0)
    : 0;

    const renderScene = SceneMap({
        overview: () => (
          <View style={styles.scene}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>About Me</Text>
              <Text style={styles.sectionContent}>As a dedicated cardiologist with {totalYearsOfExperience}+ years of experience, I am committed to providing compassionate and comprehensive care to patients with various cardiovascular conditions. My expertise lies in diagnosing, treating, and managing a wide range of heart-related ailments, ensuring optimal cardiac health and well-being for my patients.</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education & Training</Text>
              <Text style={styles.sectionContent}>I obtained my medical degree from [University/School], where I developed a passion for cardiology. Following medical school, I completed my residency in Internal Medicine, specializing in cardiology, at [Hospital/Institution]. I further honed my skills through fellowship training in Cardiology, focusing on [specific areas of interest or specialization].</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Clinical Approach</Text>
              <Text style={styles.sectionContent}>My approach to patient care revolves around personalized treatment plans tailored to each individual's unique needs and circumstances. Through thorough evaluation, advanced diagnostic techniques, and evidence-based therapies, I strive to optimize cardiovascular health and improve overall quality of life for my patients.</Text>
            </View>
          </View>
        ),
        expertise: () => (
          <View style={styles.scene}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>About Me</Text>
              <Text style={styles.sectionContent}>As a dedicated cardiologist with {totalYearsOfExperience}+ years of experience, I am committed to providing compassionate and comprehensive care to patients with various cardiovascular conditions. My expertise lies in diagnosing, treating, and managing a wide range of heart-related ailments, ensuring optimal cardiac health and well-being for my patients.</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education & Training</Text>
              <Text style={styles.sectionContent}>I obtained my medical degree from [University/School], where I developed a passion for cardiology. Following medical school, I completed my residency in Internal Medicine, specializing in cardiology, at [Hospital/Institution]. I further honed my skills through fellowship training in Cardiology, focusing on [specific areas of interest or specialization].</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Clinical Approach</Text>
              <Text style={styles.sectionContent}>My approach to patient care revolves around personalized treatment plans tailored to each individual's unique needs and circumstances. Through thorough evaluation, advanced diagnostic techniques, and evidence-based therapies, I strive to optimize cardiovascular health and improve overall quality of life for my patients.</Text>
            </View>
          </View>
        ),
        review: () => (
          <View style={styles.scene}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>About Me</Text>
              <Text style={styles.sectionContent}>As a dedicated cardiologist with {totalYearsOfExperience}+ years of experience, I am committed to providing compassionate and comprehensive care to patients with various cardiovascular conditions. My expertise lies in diagnosing, treating, and managing a wide range of heart-related ailments, ensuring optimal cardiac health and well-being for my patients.</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education & Training</Text>
              <Text style={styles.sectionContent}>I obtained my medical degree from [University/School], where I developed a passion for cardiology. Following medical school, I completed my residency in Internal Medicine, specializing in cardiology, at [Hospital/Institution]. I further honed my skills through fellowship training in Cardiology, focusing on [specific areas of interest or specialization].</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Clinical Approach</Text>
              <Text style={styles.sectionContent}>My approach to patient care revolves around personalized treatment plans tailored to each individual's unique needs and circumstances. Through thorough evaluation, advanced diagnostic techniques, and evidence-based therapies, I strive to optimize cardiovascular health and improve overall quality of life for my patients.</Text>
            </View>
          </View>
        ),
      });
      

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#00B4FE' }}
      style={{ backgroundColor: 'white', elevation: 0 }}
      labelStyle={{ color: '#000', textTransform: 'capitalize', fontFamily: 'Montserrat' }}
    />
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back-ios" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Doctor's Details</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.topContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.name}>Dr. {doctor.firstName} {doctor.lastName}</Text>
            <Text style={styles.specialization}>{doctor.specialization}</Text>
            <View style={styles.ratingContainer}>
              {[...Array(5)].map((_, index) => (
                <FontAwesome
                  key={index}
                  name="star"
                  size={12}
                  color={index < doctor.rating ? "#F0C314" : "#F0C314"} // Adjust color based on rating
                  style={styles.star}
                />
              ))}
            </View>
          </View>
          <Image
            style={styles.profilePicture}
            source={doctorProfileImage} // Use the imported image
          />
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.leftInfo}>
            <Text style={styles.infoText}>{totalYearsOfExperience}+ Years</Text>
            <Text style={styles.infoText}>Aminu Kano TH</Text>
          </View>
          <View style={styles.rightInfo}>
            <Text style={styles.infoText}>$100/hr</Text>
            <Text style={styles.infoText}>Doctor is {doctor.status}</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => navigation.navigate('BookAppointment', { doctorID: doctorID, doctor })}
      >
        <Feather name="calendar" size={22} color="#ffffff" style={styles.bookIcon} />
        <Text style={styles.bookButtonText}>Book Appointment</Text>
      </TouchableOpacity>



        <TouchableOpacity style={styles.bookmarkButton}>
          <Feather name="bookmark" size={20} color="#00B4FE" />
        </TouchableOpacity>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={renderTabBar}
        style={styles.tabView}
      />
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  backButton: {
    marginRight: 10,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'poppins-bold',
    left: 80,
  },
  card: {
    backgroundColor: 'rgba(0, 180, 254, 0.2)',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    marginBottom: 20,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontFamily: 'Montserrat',
    marginBottom: 5,
  },
  specialization: {
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
    color: '#00B4FE',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  star: {
    marginRight: 2,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#00B4FE',
  },
  bottomContainer: {
    flexDirection: 'row',
    top: 10,
    justifyContent: 'space-between',
  },
  leftInfo: {
    flex: 1,
    alignItems: 'flex-start',
  },
  rightInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'poppins-regular',
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00B4FE',
    paddingVertical: 13,
    paddingHorizontal: 60,
    borderRadius: 15,
    marginRight: 10,
  },
  bookIcon: {
    marginRight: 10,
  },
  bookButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Montserrat',
  },
  bookmarkButton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 180, 254, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  tabView: {
    flex: 1,
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
  scene: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scene: {
    flex: 1,
    padding: 20,
    top: 5,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: 'rgba(0, 180, 254, 0.2)',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: 'Montserrat',
    marginBottom: 5,
    color: '#00B4FE',
  },
  sectionContent: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    fontFamily: 'poppins-regular',
  },
});

export default DoctorProfileScreen;
