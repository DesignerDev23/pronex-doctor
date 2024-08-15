import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import { Ionicons, Feather, FontAwesome, MaterialIcons,FontAwesome5 } from '@expo/vector-icons';
import ConsultationList from '../components/ConsultationList';

const RequestScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Requests</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchBox} placeholder="Search patient" />
        <TouchableOpacity style={styles.icon}>
          <FontAwesome5 name="sort-amount-down" size={24} color="#00B4FE" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Feather name="bookmark" size={24} color="#00B4FE" />
        </TouchableOpacity>
      </View>
      <ConsultationList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    position: 'absolute',
    left: 16,
  },
  headerTitle: {
    fontSize: 14,
    fontFamily: 'poppins-semibold',
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,

  },
  searchBox: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 180, 254, 0.2)',
    paddingHorizontal: 14,
    fontFamily: 'poppins-regular',
    fontSize: 14,
    fontStyle: 'italic',
    marginRight: 5,
  },
  icon: {
    marginHorizontal: 5,
  },
});

export default RequestScreen;
