import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const DoctorCard = ({ doctor }) => {
  const totalYearsOfExperience = doctor.experience
    ? doctor.experience.reduce((total, exp) => total + (new Date(exp.to).getFullYear() - new Date(exp.from).getFullYear()), 0)
    : 0;
  const doctorProfileImage = { uri: doctor.profilePicture }; // Assuming profile picture is a URL

  return (
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
          <Text style={styles.infoText}>${doctor.rate}/hr</Text>
          <Text style={styles.infoText}>I'm {doctor.status}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(0, 180, 254, 0.2)',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    marginBottom: 20,
    
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
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
    fontSize: 14,
    fontFamily: 'poppins-regular',
    color: '#555',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  star: {
    marginRight: 2,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftInfo: {
    flex: 1,
  },
  rightInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#555',
  },
});

export default DoctorCard;
