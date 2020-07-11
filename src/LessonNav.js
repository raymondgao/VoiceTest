import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';


import  ListLesson from './ListLesson';
import  LearnResources from './LearnResources';

const Stack = createStackNavigator();

export default class CameraNav extends React.Component {
    render() {
        return (
            
            <Stack.Navigator>
                <Stack.Screen name="ListLesson" component={ListLesson}  options={{
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
                    title:  'Learn Lessons',
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