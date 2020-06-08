import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';


export default class BasicTimeLine extends Component {
  constructor() {
    super();
    this.onEventPress = this.onEventPress.bind(this);
    this.data = [
      {
        time: '09:00',
        title: 'Event 1',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
      {
        time: '10:45',
        title: 'Event 2',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
      {
        time: '12:00',
        title: 'Event 3',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
      },
      {
        time: '14:00',
        title: 'Event 4',
        description:
          'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s.',
      },
      {
        time: '16:30',
        title: 'Event 5',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      },
    ];
  }

  onEventPress(data) {
    
    this.setState({ selected: data });
    let url = "https://www.google.com";
    this.props.navigation.navigate('WebView',{ url },);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            padding: 16,
            fontSize: 20,
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          Schedule Events
        </Text>
        <Timeline style={{ flex: 1 }} data={this.data}   onEventPress={this.onEventPress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
});