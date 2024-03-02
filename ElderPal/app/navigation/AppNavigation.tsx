import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreenMain';
import ChatWithVoiceScreen from '../screens/ChatWithVoiceScreen';


const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
      <NavigationContainer>
         <Stack.Navigator   initialRouteName="WelcomeScreen">
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}   options={{ headerShown: false }}/>
          <Stack.Screen name="ChatWithVoiceScreen" component={ChatWithVoiceScreen} 
    
          options={{
            title: 'Voice Assistant', 
            headerStyle: {
              backgroundColor: '#d8d8d8', 
            },
            headerTintColor: 'black', 
            headerTitleStyle: {
              fontWeight: 'bold', 
            },
          }}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default AppNavigation;