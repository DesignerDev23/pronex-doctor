import React from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons'; // Import FontAwesome for the verified icon
import styles from '../styles/MedicalRecordsScreenStyles';

const MedicalRecordsScreen = ({ route, navigation }) => {

  // Dummy data for the records
  const records = [
    { id: 1, title: '#PH230624TP', name: 'Kabeer Baffa', consultationType: 'Consultation Type 1', icon: require('../../../assets/icon1.png') },
    { id: 2, title: '#PH230625TP', name: 'John Doe', consultationType: 'Consultation Type 2', icon: require('../../../assets/icon1.png') },
    { id: 3, title: '#PH230626TP', name: 'Jane Smith', consultationType: 'Consultation Type 3', icon: require('../../../assets/icon1.png') },
    { id: 4, title: '#PH230627TP', name: 'Alice Brown', consultationType: 'Consultation Type 4', icon: require('../../../assets/icon1.png') },
    { id: 5, title: '#PH230628TP', name: 'Bob Johnson', consultationType: 'Consultation Type 5', icon: require('../../../assets/icon1.png') },
    { id: 6, title: '#PH230629TP', name: 'Charlie Davis', consultationType: 'Consultation Type 6', icon: require('../../../assets/icon1.png') },
    { id: 7, title: '#PH230630TP', name: 'Eva White', consultationType: 'Consultation Type 7', icon: require('../../../assets/icon1.png') },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#00B4FE" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Medical Records</Text>
          <Text style={styles.subheading}>Medical records for your completed consultations</Text>
        </View>
      </View>
      <View style={styles.whiteContainer}>
        <ScrollView contentContainerStyle={styles.infoContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.cardsContainer}>
            {records.map(record => (
              <TouchableOpacity 
                key={record.id} 
                style={styles.card} 
                onPress={() => navigation.navigate('RecordDetails', { record })}
              >
                <View style={styles.cardContent}>
                  <Image source={record.icon} style={styles.cardIcon} />
                  <View style={styles.cardDetails}>
                    <View style={styles.nameContainer}>
                      <Text style={styles.cardName}>{record.name}</Text>
                      <FontAwesome name="check-circle" size={16} color="#4CAF50" style={styles.verifiedIcon} />
                    </View>
                    <Text style={styles.consultationType}>{record.consultationType}</Text>
                    <Text style={styles.cardTitle}>{record.title}</Text>
                  </View>
                  <TouchableOpacity style={styles.viewButton}>
                    <Text style={styles.viewButtonText}>View</Text>
                    <Ionicons name="chevron-forward" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default MedicalRecordsScreen;
