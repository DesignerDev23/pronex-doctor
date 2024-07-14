import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const PopularCategories = () => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
      {/* Find a Doctor */}
      <View style={styles.itemContainer}>
        <Image source={require('../../assets/icons/dentisty.png')} style={styles.image} />
        <Text style={styles.title}>Dentistry</Text>
      </View>
      {/* Buy Medication */}
      <View style={styles.itemContainer}>
        <Image source={require('../../assets/icons/neo.png')} style={styles.image} />
        <Text style={styles.title}>Neurology</Text>
      </View>
      {/* Lab Test */}
      <View style={styles.itemContainer}>
        <Image source={require('../../assets/icons/car.png')} style={styles.image} />
        <Text style={styles.title}>Cardiology</Text>
      </View>
      {/* Additional Categories */}
      <View style={styles.itemContainer}>
        <Image source={require('../../assets/icons/the.png')} style={styles.image} />
        <Text style={styles.title}>Therapy</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20, // Add some margin to separate from other components
  },
  itemContainer: {
    backgroundColor: '#00B4FE',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 83.29,
    height: 65,
    marginHorizontal: 5, // Reduce spacing between items
  },
  image: {
    width: 23,
    height: 30,
    marginBottom: 5,
  },
  title: {
    fontSize: 10,
    color: '#FFF',
    fontFamily: 'poppins-regular',
    textAlign: 'center',
  },
});

export default PopularCategories;
