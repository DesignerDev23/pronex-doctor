import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const MessagesScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../assets/images/come.png')} // Replace this with the path to your image
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.description}>
        Stay tuned! Exciting features and updates are on their way to enhance your healthcare experience with Pronex Health. We're working diligently to bring you the best in telemedicine.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF', // Optional: Set a background color if needed
  },
  content: {
    alignItems: 'center',
    width: '90%',
  },
  image: {
    width: 100, // Adjust the width of the image as needed
    height: 100, // Adjust the height of the image as needed
    marginBottom: 20, // Optional: Add margin bottom to create space between the image and text
  },
  description: {
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 22,
    fontFamily: 'poppins-regular',
    color: '#333', // Optional: Adjust the color of the text
  },
});

export default MessagesScreen;
