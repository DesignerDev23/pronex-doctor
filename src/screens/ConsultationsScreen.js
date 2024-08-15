import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import axios from 'axios';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import authService from '../screens/services/authService'; // Adjust path if necessary
import Header from '../components/reusable/Header';

const fetchConsultations = async (endpoint) => {
  try {
    const token = await authService.getToken();
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching consultations:', error);
    throw error;
  }
};

const UpcomingRoute = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConsultations('https://pronex.abdulfortech.com/doctor/consultations/active')
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator size="large" color="#007BFF" /> : <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />}
    </View>
  );
};

const formatDate = (date) => moment(date).format('dddd D MMM');
const formatTime = (time) => {
    const [hour, minute] = time.split(':');
    let period = 'am';
    let formattedHour = parseInt(hour, 10);
  
    if (formattedHour >= 12) {
      period = 'pm';
      if (formattedHour > 12) {
        formattedHour -= 12;
      }
    } else if (formattedHour === 0) {
      formattedHour = 12;
    }
  
    return `${formattedHour}:${minute} ${period}`;
  };
  

const CompletedRoute = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchConsultations('https://pronex.abdulfortech.com/doctor/consultations/completed')
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator size="large" color="#007BFF" /> : <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />}
    </View>
  );
};

const CanceledRoute = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConsultations('https://pronex.abdulfortech.com/doctor/consultations/canceled')
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator size="large" color="#007BFF" /> : <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />}
    </View>
  );
};

const PendingRoute = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConsultations('https://pronex.abdulfortech.com/doctor/consultations/pending')
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator size="large" color="#007BFF" /> : <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />}
    </View>
  );
};


const renderItem = ({ item, route }) => (
    <View style={styles.itemContainer}>
      <View style={styles.topContainer}>
        <View style={styles.leftContainer}>
          <View style={styles.profilePictureContainer}>
            {/* Replace with actual profile picture */}
            <Text style={styles.profilePictureText}>P</Text>
          </View>
          <View style={styles.patientDetails}>
            <Text style={styles.patientName}>{item.patient.firstName} {item.patient.lastName}</Text>
            <Text style={styles.itemType}>{item.type} Consultation</Text>
            <Text style={styles.itemCode}>#{item.code}</Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.amount}>₦{item.amount}</Text>
          <Text style={styles.amount}></Text>
          {/* Add other details as needed */}
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.dateTimeContainer}>
          <View style={styles.dateContainer}>
          <Ionicons name="calendar-number" size={16} color="#555" />
          <Text style={styles.dateText}>{formatDate(item.date)}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.timeContainer}>
            {/* Replace with time icon */}
            <FontAwesome name="clock-o" size={16} color="#555" />
            <Text style={styles.timeText}>{formatTime(item.start_time)} - {formatTime(item.end_time)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
  

const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={styles.tabBar}
      indicatorStyle={styles.tabIndicator} // Hide indicator
      renderLabel={({ route, focused }) => (
        <View style={[styles.tabLabelContainer, styles[`tab_${route.key}`]]}>
          <Text style={[styles.tabLabel, focused ? styles.tabLabelFocused : styles.tabLabelDefault]}>
            {route.title}
          </Text>
        </View>
      )}
    />
  );
  

const ConsultationsScreen = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'upcoming', title: 'Upcoming' },
    { key: 'completed', title: 'Completed' },
    { key: 'canceled', title: 'Canceled' },
    { key: 'pending', title: 'Pending' },
  ]);

  const renderScene = SceneMap({
    upcoming: UpcomingRoute,
    completed: CompletedRoute,
    canceled: CanceledRoute,
    pending: PendingRoute,
  });

  return (
    <View style={styles.container}>
      <Header />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: 360 }}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    tabBar: {
      backgroundColor: '#fff',
    },
    tabIndicator: {
      backgroundColor: 'transparent', // Hide tab indicator
    },
    tabLabelContainer: {
      flexDirection: 'row', // Ensure labels are in a row
      alignItems: 'center', // Center labels vertically
      justifyContent: 'center', // Center labels horizontally
      borderWidth: 2,
      width: '100%',
      borderRadius: 8,
      paddingVertical: 5,
      paddingHorizontal: 10, // Adjust spacing between labels
      marginHorizontal: 5, // Add margin to space out tabs
    },
    tabLabel: {
      fontSize: 8, // Adjust font size as needed
      textAlign: 'center',
      fontFamily: 'poppins-semibold',
    },
    tabLabelFocused: {
      color: '#007BFF', // Change color when focused
      borderColor: '#007BFF',
    },
    tabLabelDefault: {
      color: '#000',
      borderColor: '#ddd',
    },
    itemContainer: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    itemTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    itemDetails: {
      fontSize: 14,
      color: '#666',
    },
    tab_upcoming: {
      borderColor: '#007BFF', // Customize border color for Upcoming tab
    },
    tab_completed: {
      borderColor: '#28a745', // Customize border color for Completed tab
    },
    tab_canceled: {
      borderColor: '#dc3545', // Customize border color for Canceled tab
    },
    tab_pending: {
      borderColor: '#ffc107', // Customize border color for Pending tab
    },

    itemContainer: {
        borderRadius: 10,
        backgroundColor: 'rgba(0, 180, 254, 0.2)',
        padding: 15,
        marginVertical: 15,
        marginHorizontal: 15,
      },
      topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
      },
      leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      profilePictureContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#00B4FE',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
      },
      profilePictureText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
      },
      patientDetails: {
        flexDirection: 'column',
      },
      patientName: {
        fontSize: 13,
        fontFamily: 'poppins-semibold',
      },
      itemType: {
        fontSize: 12,
        color: '#00B4FE',
        fontFamily: 'poppins-regular',
      },
      amount: {
        fontSize: 12,
        color: '#0FA958',
        fontFamily: 'poppins-regular',
      },
      itemCode: {
        fontSize: 14,
        color: '#666',
      },
      rightContainer: {
        flexDirection: 'column',
        alignItems: 'flex-end',
      },
      bottomContainer: {
        flexDirection: 'row',
        // left: 30,
        justifyContent: 'space-between',
      },
      dateTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '99%',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0, 180, 254, 0.3)',
        marginTop: 10,
        borderRadius: 15,
        padding: 13,
      },
      dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      icon: {
        marginRight: 5,
      },
      dateText: {
        fontSize: 10,
        fontFamily: 'poppins-semibold',
        color: '#676767',
        marginLeft: 4,
      },
      timeText: {
        fontSize: 10,
        fontFamily: 'poppins-semibold',
        color: '#676767',
        marginLeft: 4,
      },
      separator: {
        width: 1,
        height: 20,
        backgroundColor: '#00B4FE',
        marginHorizontal: 10,
      },
  });
  
  
export default ConsultationsScreen;
