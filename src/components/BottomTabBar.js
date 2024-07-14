import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Platform } from 'react-native';
import HomeScreen from '../HomeScreen';
// Import other screen components as needed

const Tab = createBottomTabNavigator();

const BottomTabBar = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          borderRadius: 15,
          backgroundColor: '#FFF',
          elevation: 5,
          height: 70,
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            },
            android: {
              elevation: 5,
            },
          }),
        },
      }}>
      {/* Add Tab.Screen components for each tab */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/icons/home_icon.png')}
              style={{ width: 24, height: 24, tintColor: focused ? '#00B4FE' : '#777' }}
            />
          ),
        }}
      />
      {/* Add other Tab.Screen components for other tabs */}
    </Tab.Navigator>
  );
};

export default BottomTabBar;
