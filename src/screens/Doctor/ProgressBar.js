import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const ProgressBar = ({ totalSteps, currentStep }) => {
  const steps = Array.from({ length: totalSteps }, (_, index) => index + 1);

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        {steps.map((step, index) => (
          <View key={step} style={styles.stepContainer}>
            {index !== 0 && <View style={styles.horizontalLine} />}
            <View
              style={[
                styles.stepIndicator,
                step < currentStep ? styles.completedStep : step === currentStep ? styles.currentStep : null,
              ]}
            >
              <Text style={styles.stepText}>{step}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepContainer: {
    alignItems: 'center',
  },
  horizontalLine: {
    flex: 1,
    height: 5,
    backgroundColor: '#000',
  },
  stepIndicator: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentStep: {
    backgroundColor: 'rgba(0, 180, 254, 0.3)',
  },
  completedStep: {
    backgroundColor: '#00B4FE',
  },
  stepText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProgressBar;
