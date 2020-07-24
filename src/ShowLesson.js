import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView, AsyncStorage } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default class ShowLesson extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Scanned words', '', ''],
      tableData: [] , 
    }
    this.onEventPress = this.onEventPress.bind(this);
    const  {lessons}  = this.props.route.params;
    this.state.tableData = lessons; 
  }

  onEventPress() {
    const lessons = this.state.tableData;
    this.enterData();
    this.props.navigation.navigate('LearnResources',{ lessons},);
  }
  
  clearAsyncStorage = async() => {
    AsyncStorage.clear();
    
}

  enterData = async () => {
    var currentTime = new Date().toLocaleString();
   // this.clearAsyncStorage();
      try {
        
        AsyncStorage.setItem(currentTime, JSON.stringify( this.state.tableData ));
        //console.log(currentTime + " " + JSON.stringify(this.state.tableData));
        
      } catch (e) {
        alert('Failed to save the data to the storage ' + this.state.tableData + ' ' + e)
      }
  }
  _alertIndex(index) {
    Alert.alert(
      'Delete this word',
      'Are you sure you want to delete this word',
      [
        {text: 'NO', style: 'cancel'},
        {text: 'YES', onPress: () => {this.setState({ tableData: this.state.tableData.filter((_, i) => i !== index)})}},
      ]
    );
  }

  render() {
    const element = (lessons, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={styles.btnTrash}>
          <MaterialCommunityIcons name="trash-can" style={styles.icon} type="MaterialCommunityIcons"></MaterialCommunityIcons>
        </View>
      </TouchableOpacity>
    );
 
    return (
      
      <View style={styles.container}>
        <View style={{alignItems: 'flex-start'}}>
          <MaterialCommunityIcons name="send" size={30} color={'#2196F3'} type="MaterialCommunityIcons"></MaterialCommunityIcons>
        </View>
        <View style={{alignItems: 'flex-end'}}>
     
         <TouchableOpacity onPress={this.onEventPress}>
            <View style={styles.btnPublish}>
              <Text style={styles.btnTextPublish}>Prepare Lesson</Text>
            </View>
          </TouchableOpacity> 
          </View>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{borderColor: 'transparent'}}>
              <Row data={this.state.tableHead} style={styles.head} textStyle={styles.textHead}/>
              {
                this.state.tableData.map((rowData, index) => (
                  <TableWrapper key={index} style={styles.row}>
                    {
                      rowData.map((cellData, cellIndex) => (
                        <Cell key={cellIndex} data={cellIndex === 2 ? element(cellData, index) : cellData} textStyle={styles.textBody}/>
                      ))
                    }
                  </TableWrapper>
                ))
              }
          </Table>
          </ScrollView>
        </View>
      
      
    )
  }
}
 
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#2196F3' },
  textHead: { margin: 6,color: "#fff", },
  textBody: { margin: 6,color: "#2196F3", },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btnTrash: {   width: 88, height: 20,  borderRadius: 3,justifyContent:'space-between', marginBottom: 20 , padding: 18},
  btnPublish: {   width: 135, height: 49, backgroundColor: '#78B7BB',  borderRadius: 3,justifyContent:'space-between', marginBottom: 20 , padding: 18},
  btnText: { textAlign: 'center', color: '#fff' },
  btnTextPublish: { textAlign: 'center', color: '#fff', fontSize: 14 },
  dataWrapper: { marginTop: -1 },
  icon: {
    color: "#2196F3",
    fontSize: 25,
    alignSelf: "center",

  },
});
