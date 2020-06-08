import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import  Clubs from './Clubs';
import  MyWebView from './WebView';

const Stack = createStackNavigator();

export default class ClubsNav extends React.Component {
    render() {
        return (
            
            <Stack.Navigator>
                <Stack.Screen name="Clubs" component={Clubs} />
                <Stack.Screen name="WebView" component={MyWebView} />
            </Stack.Navigator>
            
        );
    }
}