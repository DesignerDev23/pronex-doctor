import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import authReducer from './src/redux/reducers';
import AppNavigator from './src/navigation/AppNavigator';

const store = createStore(authReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    'poppins-regular': require('./assets/fonts/Poppins-Regular.ttf'), // Update the path accordingly
    'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'), // Update the path accordingly
    'poppins-semibold': require('./assets/fonts/Poppins-SemiBold.ttf'), // Update the path accordingly
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'), // Update the path accordingly
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'), // Update the path accordingly
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        SplashScreen.preventAutoHideAsync();
        await fetchFonts();
        setFontsLoaded(true);
      } catch (e) {
        console.warn(e);
      } finally {
        SplashScreen.hideAsync();
      }
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Prevent rendering until fonts are loaded
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}
