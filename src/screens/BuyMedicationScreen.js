import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BuyMedicationScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Buy Medication</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BuyMedicationScreen;

