import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Hook for navigation
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';

const Header = () => {
  const navigation = useNavigation(); // Hook to access navigation

  return (
    <View style={styles.header}>
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
      <MaterialIcons name="arrow-back-ios" size={22} color="#000" />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>My Appointments</Text>
  </View>
  );
};

const styles = StyleSheet.create({

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  backButton: {

    marginLeft: 20,
  },
  headerTitle: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'poppins-bold',
    left: 80,
  },

});

export default Header;
