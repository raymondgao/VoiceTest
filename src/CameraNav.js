import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import  TakePicture from './TakePicture';
import  ShowLesson from './ShowLesson';
import  LearnResources from './LearnResources';

const Stack = createStackNavigator();

export default class CameraNav extends React.Component {
    render() {
        return (
            
            <Stack.Navigator>
                <Stack.Screen name="TakePicture" component={TakePicture} 
                options={{
                    title: 'Snap Lessons',
                    headerStyle: {
                        height: 20,
                      backgroundColor: '#2196F3',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontSize: 16,
                    },
                  }}/>
                <Stack.Screen name="ShowLesson" component={ShowLesson}
                options={{
                    title: 'Show Lessons',
                    headerStyle: {
                        height: 25,
                      backgroundColor: '#2196F3',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontSize: 16,
                    },
                  }} />
                <Stack.Screen name="LearnResources" component={LearnResources}
                options={{
                    title: 'Lesson',
                    headerStyle: {
                        height: 25,
                      backgroundColor: '#2196F3',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontSize: 16,
                    },
                  }} />
            </Stack.Navigator>
            
        );
    }
}