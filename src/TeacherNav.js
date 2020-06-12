import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import  Profile from './TeacherProfile';
import  MyWebView from './WebView';

const Stack = createStackNavigator();

export default class TeacherNav extends React.Component {
    render() {
        return (
            
            <Stack.Navigator>
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="WebView" component={MyWebView} />
            </Stack.Navigator>
            
        );
    }
}