import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen';
import SemesterScreen from '../screens/SemesterScreen';
import LeistungenScreen from '../screens/LeistungenScreen';
import ToDoScreen from '../screens/ToDoScreen';

export function BottomNavigation() {

  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#e91e63"
      labelStyle={{ fontSize: 12 }}
      style={{ backgroundColor: 'tomato' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Stundenplan',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Semesters"
        component={SemesterScreen}
        options={{
          tabBarLabel: 'Semester',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="format-list-numbered" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Leistungen"
        component={LeistungenScreen}
        options={{
          tabBarLabel: 'Leistungen',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="clipboard-list-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="ToDo"
        component={ToDoScreen}
        options={{
          tabBarLabel: 'ToDo',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="playlist-check" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
