import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import doctorProfileImage from '../../assets/images/doctor.png';
import moment from 'moment';
import authService from '../screens/services/authService';
import ConfirmationModal from '../components/ConfirmationModal';

const PatientDetailsScreen = ({ route, navigation }) => {
  const { consultation } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [action, setAction] = useState(null);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'profile', title: 'profile' },
    { key: 'expertise', title: 'About Consultation' },
    // { key: 'review', title: 'Review' },
  ]);

  const renderScene = SceneMap({
    profile: () => (
      <View style={styles.scene}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.sectionContent}>
           - Name: {consultation.patient.firstName} {consultation.patient.lastName}
          </Text>
          <Text style={styles.sectionContent}>
           - Age: {consultation.patient.dob} 
          </Text>
          <Text style={styles.sectionContent}>
           - Gender: {consultation.patient.gender} 
          </Text>
          <Text style={styles.sectionContent}>
           - Contact: {consultation.address} 
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Affection</Text>
          <Text style={styles.sectionContent}>
          - {consultation.note} 
          </Text>
          <Text style={styles.sectionContent}>
          - {consultation.note} 
          </Text>
          <Text style={styles.sectionContent}>
          - {consultation.note} 
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Medications</Text>
          <Text style={styles.sectionContent}>
          - To be Assigned by Abdull
          </Text>
        </View>
      </View>
    ),
    expertise: () => (
      <View style={styles.scene}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reason for consultation</Text>
          <Text style={styles.sectionContent}>
          - {consultation.note} 
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Consultation Request</Text>
          <Text style={styles.sectionContent}>
          - {consultation.duration} Minutes 
          </Text>
          <Text style={styles.sectionContent}>
          - prepared doctor speciality: {consultation.doctor.specialization} 
          </Text>
          <Text style={styles.sectionContent}>
          - prepared consultation method: {consultation.type} consultation
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Date & Time</Text>
          <Text style={styles.sectionContent}>
          - <Text style={styles.sectionContent}>{formatDate(consultation.date)}</Text>
          </Text>
          <Text style={styles.sectionContent}>
          - <Text style={styles.sectionContent}>{consultation.start_time}</Text>
          </Text>
        </View>
      </View>
    ),

  });

  const formatDate = (date) => moment(date).format('dddd D MMM');

  const truncateLocation = (location) => {
    const words = location.split(' ');
    return words.length > 3 ? words.slice(0, 3).join(' ') + '...' : location;
  };

  const handleAccept = async () => {
    try {
      const response = await authService.acceptConsultation(consultation.id);
      console.log(response);
      // Handle success
    } catch (error) {
      console.error(error);
      // Handle error
    }
    setModalVisible(false);
  };

  const handleReject = async () => {
    try {
      const response = await authService.rejectConsultation(consultation.id);
      console.log(response);
      // Handle success
    } catch (error) {
      console.error(error);
      // Handle error
    }
    setModalVisible(false);
  };


  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#00B4FE' }}
      style={{ backgroundColor: 'white', elevation: 0 }}
      labelStyle={{ color: '#000', textTransform: 'capitalize', fontFamily: 'Montserrat', fontSize: 12, }}
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
          <Text style={styles.headerTitle}>Patient details</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.topContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.name}>
                {consultation.patient.firstName} {consultation.patient.lastName}
              </Text>
              <Text style={styles.specialization}>{consultation.type} Consultation</Text>
            </View>
            <Image style={styles.profilePicture} source={doctorProfileImage} />
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.leftInfo}>
              <Text style={styles.heading}>Requested on</Text>
              <View style={styles.detailRow}>
                <FontAwesome name="map-marker" size={16} color="#555" />
                <Text style={styles.detailText}>{truncateLocation(consultation.address)}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="calendar-number" size={16} color="#555" />
                <Text style={styles.detailText}>{formatDate(consultation.date)}</Text>
              </View>
            </View>
            <View style={styles.rightInfo}>
              <Text style={styles.infoText}>$100/hr</Text>
            </View>
          </View>
          
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.acceptButton]}
          onPress={() => {
            setAction('accept');
            setModalVisible(true);
          }}
        >
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.rejectButton]}
          onPress={() => {
            setAction('reject');
            setModalVisible(true);
          }}
        >
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
      <ConfirmationModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={action === 'accept' ? handleAccept : handleReject}
        message={`Are you sure you want to ${action} this consultation?`}
        imageSource={require('../../assets/images/model.png')}
      />
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
  headerTitle: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'poppins-bold',
    left: 80,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 15,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  acceptButton: {
    backgroundColor: 'rgba(0, 180, 254, 0.5)',

  },
  rejectButton: {
    backgroundColor: 'rgba(0, 180, 254, 0.5)',
  },
  buttonText: {
    color: '#000',
    fontFamily: 'poppins-regular',
    fontSize: 14,
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
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontFamily: 'Montserrat',
    marginBottom: 5,
    left: -5,
  },
  specialization: {
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
    color: '#00B4FE',
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#00B4FE',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 10,
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
    top: -15,
    left: -15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  detailText: {
    fontSize: 10,
    color: '#555',
    fontFamily: 'poppins-regular',
    marginLeft: 4,
  },
  heading: {
    fontSize: 10,
    fontFamily: 'poppins-semibold',
    color: '#00B4FE',
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
    top: 5,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: 'rgba(0, 180, 254, 0.2)',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Montserrat',
    marginBottom: 5,
    color: '#00B4FE',
  },
  sectionContent: {
    fontSize: 14,
    fontFamily: 'poppins-regular',
    color: '#555',
  },
});

export default PatientDetailsScreen;
