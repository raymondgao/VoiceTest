import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';


import  ListLesson from './ListLesson';
import  LearnResources from './LearnResources';

const Stack = createStackNavigator();

export default class CameraNav extends React.Component {
    render() {
        return (
            
            <Stack.Navigator>
                <Stack.Screen name="ListLesson" component={ListLesson} />
                <Stack.Screen name="LearnResources" component={LearnResources} />
            </Stack.Navigator>
            
        );
    }
}