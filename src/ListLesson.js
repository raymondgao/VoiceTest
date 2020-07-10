
import React from 'react';
import { AsyncStorage, StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { CommonActions } from '@react-navigation/native';

export default class ListLesson extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Saved Lessons', '', ''],
      tableData: [] , 
      isLoading: true,
      lessonsArray: [],
    }
    this.onEventPressDelete = this.onEventPressDelete.bind(this);
    this.onEventPressShow = this.onEventPressShow.bind(this);
    this.onEventPress = this.onEventPress.bind(this);
  }

  onEventPressShow(index) {
    var lessons = [];
    const lessonsString = this.state.lessonsArray[index];
    var topArray =  eval(lessonsString );

    for (let i = 0; i < topArray.length; i++) {
         
       var childArray = eval (topArray[i]);
       lessons.push(childArray);
       
      }

      
   this.props.navigation.navigate('LearnResources',{ lessons},);
  }

  onEventPressDelete(index) {
    const lesson = this.state.tableData[index][0];
    //console.log(lesson);
    AsyncStorage.removeItem(lesson);
    this.setState({ tableData: this.state.tableData.filter((_, i) => i !== index)});
  }

  _getLessons = async () => {
    try {
        const keys =  await AsyncStorage.getAllKeys();
        this.state.lessonsArray = [];
        this.state.tableData = [];

        for (let lesson of keys) {
            
            var value = await AsyncStorage.getItem(lesson);
            //var array2d = JSON.parse( value);
            //console.log(lesson + " "  + array2d );
            this.state.lessonsArray.push(value);
            this.state.tableData.push([ lesson,'']);
        }
        this.setState({
            isLoading: false
          });
    
        
    } catch (error) {
        console.error(error)
    }
  }


 
  _alertIndex(index) {
    Alert.alert(
      'Delete this word',
      'Are you sure you want to delete this word',
      [
        {text: 'NO', style: 'cancel'},
        {text: 'YES', onPress: () => {this.onEventPressDelete(index)}},
      ]
    );
  }

  componentDidMount() {
   this._getLessons();
  }

  onEventPress() {
    this._getLessons();
  }
  
  render() {
    
    const element = (lessons, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={styles.btnTrash}>
          <MaterialCommunityIcons name="trash-can" style={styles.icon} type="MaterialCommunityIcons"></MaterialCommunityIcons>
        </View>
      </TouchableOpacity>
    );

    //console.log(this.state.tableData);

    if (this.state.isLoading) {
        return <View><Text>Loading...</Text></View>;
      }

    return (
      
      <View style={styles.container}>
        <View style={{alignItems: 'flex-end'}}>
         <TouchableOpacity onPress={this.onEventPress}>
            <View style={styles.btnPublish}>
              <Text style={styles.btnTextPublish}>Refresh</Text>
            </View>
          </TouchableOpacity> 
          </View>
        <Table borderStyle={{borderColor: 'transparent'}}>
          <Row data={this.state.tableHead} style={styles.head} textStyle={styles.textHead}/>
          {
            this.state.tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={cellIndex === 1 ? element(cellData, index) : cellData} onPress={() => this.onEventPressShow(index)} textStyle={styles.textBody}/>
                  )) 
                }
              </TableWrapper>
            ))
          }
        </Table>
        
         
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
  btnPublish: {   width: 105, height: 49, backgroundColor: '#78B7BB',  borderRadius: 3,justifyContent:'space-between', marginBottom: 20 , padding: 18},
  btnText: { textAlign: 'center', color: '#fff' },
  btnTextPublish: { textAlign: 'center', color: '#fff', fontSize: 14 },
  icon: {
    color: "#2196F3",
    fontSize: 25,
    alignSelf: "center",

  },
});
