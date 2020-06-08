import * as React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import  LearnResources from './LearnResources';
import  ClubsNav from './ClubsNav';
import  Profile from './TeacherProfile';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="LearnResources">
        <Drawer.Screen name="Learn Language" component={LearnResources} 
          options={{
            drawerIcon: ({ focused, size }) => (
              <MaterialCommunityIcons name={'school'} size={25} color={'#2196F3'} />
            )}}
       />
        <Drawer.Screen name="Professioal Teachers" component={Profile} 
          options={{
            drawerIcon: ({ focused, size }) => (
              <MaterialCommunityIcons name={'teach'}  size={25}  color={'#2196F3'}/>
            )}}
        />
         <Drawer.Screen name="Language Clubs" component={ClubsNav} 
          options={{
            drawerIcon: ({ focused, size }) => (
              <MaterialCommunityIcons name={'heart'}  size={25} color={'#2196F3'} />
            )}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

