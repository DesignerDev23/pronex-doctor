import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import authService from '../screens/services/authService';
import { MaterialIcons, Octicons, AntDesign, FontAwesome5, Entypo, Feather } from '@expo/vector-icons';

const StatsSummary = ({ navigation }) => {
  const [totalConsultations, setTotalConsultations] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStats = async () => {
      try {
        const consultationsData = await authService.fetchDoctorConsultations();
        const patientNames = new Set(consultationsData.map(item => item.patientName));

        setTotalConsultations(consultationsData.length);
        setTotalPatients(patientNames.size);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getStats();
  }, []);

  const handleSeeAllConsultations = () => {
    navigation.navigate('Request');
  };

  const handleSeeAllPatients = () => {
    navigation.navigate('AllPatients');
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.statContainer}>
        <Text style={styles.statTitle}>Consultation Request </Text>
        <Text style={styles.statNumber}>{totalConsultations}</Text>
        <TouchableOpacity onPress={handleSeeAllConsultations} style={styles.seeAllContainer}>
            <Text style={styles.seeAllText}>See all</Text>
            <Entypo name="chevron-right" size={18} color="#777" style={styles.seeAllIcon} />
          </TouchableOpacity>
      </View>
      <View style={styles.statContainer}>
        <Text style={styles.statTitle}>Total Patients Served</Text>
        <Text style={styles.statNumber}>{totalPatients}</Text>
        <TouchableOpacity onPress={handleSeeAllConsultations} style={styles.seeAllContainer}>
            <Text style={styles.seeAllText}>See all</Text>
            <Entypo name="chevron-right" size={18} color="#777" style={styles.seeAllIcon} />
          </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  statContainer: {
    width: '48%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    alignItems: 'center',
  },
  statTitle: {
    fontSize: 10,
    color: '#64748B',
    fontFamily: 'poppins-semibold',
    marginBottom: 8,
  },
  seeAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
//   seeAllText: {
//     color: '#777',
//     fontSize: 1,
//     fontFamily: 'poppins-regular',
//     marginRight: 5,
//   },
  seeAllIcon: {
    marginLeft: 2,
  },
  statNumber: {
    fontSize: 40,
    fontFamily: 'Montserrat',
    color: '#00B4FE',
    marginBottom: 8,
  },
  seeAllText: {
    fontSize: 12,
    color: '#00B4FE',
    fontFamily: 'poppins-regular',
  },
});

export default StatsSummary;
