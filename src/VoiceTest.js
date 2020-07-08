import * as React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import  LearnResources from './LearnResources';
import  ClubsNav from './ClubsNav';
import  TeacherNav from './TeacherNav';
import  CameraNav  from './CameraNav';
import  LessonNav  from './LessonNav'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import codePush from "react-native-code-push";


const Drawer = createDrawerNavigator();

export default class VoiceTest extends React.Component {
  render(){
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="LearnResources">
        <Drawer.Screen name="Learn Language" component={LearnResources} 
          options={{
            drawerIcon: ({ focused, size }) => (
              <MaterialCommunityIcons name={'school'} size={25} color={'#2196F3'} />
            )}}
       />
        <Drawer.Screen name="Professioal Teachers" component={TeacherNav} 
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
          <Drawer.Screen name="Snap Lesson" component={CameraNav} 
          options={{
            drawerIcon: ({ focused, size }) => (
              <MaterialCommunityIcons name={'camera'}  size={25} color={'#2196F3'} />
            )}}
        />
           <Drawer.Screen name="Show Lesson" component={LessonNav} 
          options={{
            drawerIcon: ({ focused, size }) => (
              <MaterialCommunityIcons name={'book'}  size={25} color={'#2196F3'} />
            )}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
}
VoiceTest = codePush(VoiceTest);


