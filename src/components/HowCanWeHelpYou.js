import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HowCanWeHelpYou = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate('FindDoctor')}
      >
        <Image source={require('../../assets/icons/Nurse.png')} style={styles.image} />
        <Text style={styles.title}>Find a Doctor</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate('BuyMedication')}
      >
        <Image source={require('../../assets/icons/medication.png')} style={styles.image} />
        <Text style={styles.title}>Buy Medication</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate('LabTest')}
      >
        <Image source={require('../../assets/icons/lab.png')} style={styles.image} />
        <Text style={styles.title}>Lab Test</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginLeft: 10,
  },
  itemContainer: {
    backgroundColor: 'rgba(0, 180, 254, 0.2)',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
    marginHorizontal: 10,
  },
  image: {
    width: 45,
    height: 45,
    marginBottom: 10,
  },
  title: {
    fontSize: 10,
    color: '#333',
    fontFamily: 'poppins-regular',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'rgba(0, 180, 254, 0.2)',
    borderRadius: 14,
    paddingHorizontal: 42,
    fontStyle: 'italic',
    marginRight: 10,
    height: 35,
  },
  searchIcon: {
    position: 'absolute',
    left: 30,
    top: 6,
  },
});

export default HowCanWeHelpYou;
