import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomNavigation } from './layout/BottomNavigation';
import AddScreen from './screens/AddScreen';
import EditScreen from './screens/EditScreen';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="BottomNavigation"
          component={BottomNavigation}
          options={{ title: 'Studienübersicht' }}
        />
        <Stack.Screen
          name="AddScreen"
          component={AddScreen}
          options={{ title: 'Neues Modul' }}
        />
        <Stack.Screen
          name="EditScreen"
          component={EditScreen}
          options={{ title: 'Modul bearbeiten' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
