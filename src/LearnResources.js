import React from 'react';
import Voice from '@react-native-community/voice';
import Tts from 'react-native-tts';
import RNRestart from 'react-native-restart';
import MyChineseWords from './MyChineseWords';
import { Dropdown } from 'react-native-material-dropdown';
import MyVietnameseWords from './MyVietnameseWords';
//import Toast from 'react-native-simple-toast';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SystemSetting from 'react-native-system-setting';
import Toast from './MyToast';
import { NativeModules } from "react-native";
import { Dimensions } from "react-native";


import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Switch,
  Button,
  TextInput,
  AppRegistry,
  SafeAreaView,
} from 'react-native';

var Login = require('./Login');
const win = Dimensions.get('window');
const imagePath ='./img/';

export default class LearnResource extends React.Component {
 
  constructor(props) {
    super(props);
    this.myWords = MyVietnameseWords.words
    this.isLesson = false;
    this.restart = false;
    var random = this.random()
    console.disableYellowBox = true;
    
    
    
    this.state = {
     
      listImages: [ require(imagePath + 'noodle.jpeg'), require(imagePath +  'water.jpeg'), require(imagePath + 'bread.jpeg')],
      imageIndex: 0,
      recognized: '',
      started: '',
      results: ['Here is what you said:'],
      random: random,
      buttonText: 'Speak',
      pressStatus: false,
      isViet: true,  
      pitch: .8,
      language: "Vietnamese",
      firstLanguage: "Vietnamese",
      secondLanguage: "English",
      currentFirstWord: Object.keys(this.myWords)[random].replace(":","\n"),
      currentSecondWord: Object.values(this.myWords)[random].replace(":","\n"),
    };
 
    try {
     
      const  {lessons}  = this.props.route.params;
      this.state.tableData = lessons; 
     
      if(lessons != null){ 
        this.restart = true;
        var newWords = {}
        for (let i = 0; i < lessons.length; i++) {
         let t = lessons[i][1];
         
         if(t == '')
         {
         
           t = "[UNKNOWN]" + i;
         }     
         newWords[t]= lessons[i][0];
        }
        this.myWords = newWords;
        this.isLesson = true;
        this.restart = true;
        var random = this.random();
        this.state.random = random; 
        
        let b = Object.keys(this.myWords)[random];
        if(b.indexOf("[UNKNOWN]") > -1){
          b = '';
        }
        this.state.currentSecondWord = Object.values(this.myWords)[random].replace(":","\n");
        this.state.currentFirstWord = b;
     
      }

    }
    catch (error) {
       console.log(error);
    }

    this.handlePressIn = this.handlePressIn.bind(this);
    this.handlePressOut = this.handlePressOut.bind(this);
    this.handleSpeak = this.handleSpeak.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleSkip = this.handleSkip.bind(this);
    Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
    this.showIncorrectToast = this.showIncorrectToast.bind(this);
    this.showCorrectToast = this.showCorrectToast.bind(this);    
    Tts.setDefaultRate(0.2);
    this.speakWord(false);
  
  }

  showIncorrectToast()
  {
    this.refs.incorrectToast.showToast('Sorry that is Incorrect... ', 3000);
  }

  showCorrectToast()
  {
    this.refs.correctToast.showToast('You are Correct...', 3000);
  }

  clearText(){
    this.setState({
      results: ''
    });
  }


  onChangeText(value) {
    var random = this.random();
    this.randomImage();
    if (value == "Chinese") {
      this.myWords = MyChineseWords.words;
      this.setState({
        language: "Chinese",
        firstLanguage: "Chinese",
        secondLanguage: "English",
        currentFirstWord: Object.keys(this.myWords)[random].replace(":","\n"),
        currentSecondWord: Object.values(this.myWords)[random].replace(":","\n"),
      });
    } else if (value == "Vietnamese") {
      this.myWords = MyVietnameseWords.words;
      this.setState({
        language: "Vietnamese",
        firstLanguage: "Vietnamese",
        secondLanguage: "English",
        currentFirstWord: Object.keys(this.myWords)[random].replace(":","\n"),
        currentSecondWord: Object.values(this.myWords)[random].replace(":","\n"),
      });
    }
    this.setState({
       isViet: true,
      });
    this.handleSkip();
  }


   async speakWord(bSpeak = true) {
   
    var desireVolume  = .8
    try {
      Tts.stop();
      var currentVolume;
      SystemSetting.getVolume('notification').then((volume)=>{
        currentVolume =  volume;
    });


      Tts.getInitStatus().then(() => {
        if ((currentVolume < 0.1) && (bSpeak == true)){
          currentVolume = desireVolume;
         }
        Tts.setDefaultPitch(this.state.pitch);
        if (this.state.isViet == false) {
           Tts.setDefaultLanguage('en-US');
    
           Tts.speak(Object.keys(this.myWords)[this.state.random],{
            androidParams: {
              KEY_PARAM_PAN: -1,
              KEY_PARAM_VOLUME: currentVolume,
             
            },
          });

        } else {
          var lang = this.state.language == 'Chinese' ? 'zh' : 'vi-VN';
          
           Tts.setDefaultLanguage(lang);
           let word = Object.values(this.myWords)[this.state.random];
           word = word.split(':')[0];
           
           Tts.speak(word,{
            androidParams: {
              KEY_PARAM_PAN: -1,
              KEY_PARAM_VOLUME: currentVolume,
              
            },
          });
        }       

      });
    }
    catch (err) {
      console.log(err);
      error(error);
      if (err.code === 'no_engine') {
        Tts.requestInstallEngine();
      }

      console.log(err);
      Toast("Network error, restarting the app", Toast.LONG);
      RNRestart.Restart();

    }
  }

  randomImage(){
    var imageListLength = this.state.listImages.length;
    while (true){
       var newImageIndex = Math.floor(Math.random() * (imageListLength ));
       console.log(this.state.imagePath + this.state.listImages[this.state.imageIndex]);
       if (this.state.imageIndex !=  newImageIndex) {
        this.setState({
          imageIndex: newImageIndex,
         });
         break;
       }
    }
   
  }

  random() {
    var wordLength = Object.keys(this.myWords).length ;
    
    if(this.isLesson) {
    
      if(wordLength == 1){
        return 0;
      }else
      {       
        var nextRandom  = (this.state.random + 1);

        if (wordLength > nextRandom){
          return nextRandom;  
        }
        else {
          return 0;
        }
      }

    }else {
        return Math.floor(Math.random() * wordLength);
    }
   
  }

  async  handlePressIn() {
    this.setState({
      recognized: '',
      started: '',
      results: [],
      buttonText: 'Listening',
      pressStatus: true,
    });
    try {
      var lang = this.state.language == 'Chinese' ? 'zh' : 'vi-VN';
      if (this.state.isViet == false) {
        lang = 'en-US';
      }
     
      await Voice.start(lang);
    } catch (e) {
      console.error(e);
    }

  }

  handleSkip() {
  
    var random = this.random();
    this.randomImage();
    let t = Object.keys(this.myWords)[random];
    if(t.indexOf("[UNKNOWN]") > -1){
      t = '';
    }
    if (this.state.isViet == false) {

      this.setState({
        currentFirstWord: Object.values(this.myWords)[random],
        currentSecondWord: t,
        //isViet: false,
        random, random,
      });
    } else {
      this.setState({
        currentFirstWord: t,
        currentSecondWord: Object.values(this.myWords)[random],
        //isViet: false,
        random, random,
      });
    }
    this.speakWord();
  }

  handleSwitch() {
    var lang = this.state.language;
    if (this.state.isViet == false) {

      this.setState({
        isViet: true,
        language: this.state.secondLanguage,
        firstLanguage: this.state.secondLanguage,
        secondLanguage: lang,
      });
    } else {
      this.setState({
        isViet: false,
        language: this.state.secondLanguage,
        firstLanguage: this.state.secondLanguage,
        secondLanguage: lang,
      });
    }

    this.speakWord();
  }

  async handlePressOut() {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      buttonText: 'Speak',
      pressStatus: false
    });
  }
  handleSpeak() {
    this.speakWord();
  }
  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }
  componentWillMount() {
   
  }

  onSpeechStart(e) {
    this.setState({
      started: '√',
    });
  };
  onSpeechRecognized(e) {
    this.setState({
      recognized: '√',
    });
  };
  onSpeechResults(e) {
    var currentWord;
    if (this.state.isViet) {

      currentWord = Object.values(this.myWords)[this.state.random];
    }
    else {

      currentWord = Object.keys(this.myWords)[this.state.random];
    }

    var found = false;

    currentWord  = currentWord.split(':')[0];
    e.value.forEach(function (item) {
      if (item.toLowerCase().indexOf(currentWord.toLowerCase()) !== -1) {
        this.showCorrectToast();
        var random = this.random();
        this.randomImage();
        if (this.state.isViet) {

          this.setState({
            random: random,
            currentFirstWord: Object.keys(this.myWords)[random].replace(":","\n"),
            currentSecondWord: Object.values(this.myWords)[random].replace(":","\n"),
          });
        }
        else {

          this.setState({
            random: random,
            currentFirstWord: Object.values(this.myWords)[random].replace(":","\n"),
            currentSecondWord: Object.keys(this.myWords)[random].replace(":","\n"),
          });
        }
        found = true;
      }
    }.bind(this));
    if (found == false) {

      //Toast.showWithGravity('Incorrect !!\n', Toast.LONG, Toast.CENTER);
      
      //Toast.showWithGravity('\n         Incorrect !!        \n', Toast.LONG, Toast.CENTER);
      this.showIncorrectToast();
    }
    else {
      this.speakWord();
    }


    this.setState({
      results: e.value,
    });
  }
  async _startRecognition(e) {


    this.setState({
      recognized: '',
      started: '',
      results: [],
    });
    try {
      var lang = this.state.language == 'Chinese' ? 'zh_CN' : 'vi-VN';
      await Voice.start(language);
    } catch (e) {
      console.error(e);
    }
  }

  static navigationOptions = { headerShown: false };

  render() {
    
    let data = [{
      value: 'Chinese',
    }, {
      value: 'Vietnamese',
    }];
    
    return (
    
      <SafeAreaView style={styles.container}>   
        <View style={{ flex: 0.16, width: wp('33%'), marginLeft: hp('2%'), }}>
         
          <Dropdown
            label='Languages:'
            flex={1}
            data={data}
            dropdownOffset={{ top:  20, left: 20 }}
            dropdownPosition={-3.5}
            onChangeText
            valueExtractor={({ value }) => value}
            onChangeText={(value) => { this.onChangeText(value) }}
          />
        
        </View>
       
           
            
        <View style={styles.materialButtonPinkRow}>

          <TouchableOpacity style={[skipStyles.container, styles.materialButtonSkip]} onPress={() => {
            this.handleSkip();
          }}>
            <Text style={skipStyles.caption}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPressIn={this.handlePressIn}
            onPressOut={this.handlePressOut}

            style={[micStyles.container, micStyles.materialButtonMic]}

          >

            <MaterialCommunityIcons name="microphone" style={micStyles.icon} type="MaterialCommunityIcons"></MaterialCommunityIcons>
          </TouchableOpacity>

          <TouchableOpacity style={[speakStyles.container, speakStyles.materialButtonSkip]} onPress={() => {
            this.handleSpeak();
          }}>
            <Text style={speakStyles.caption}>Hear</Text>
          </TouchableOpacity>

        </View>

        <View style={[styles.materialContainerSwitch, styles.materialSwitch]}>
        
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={this.state.isViet ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={this.handleSwitch}
            value={this.state.isViet}
            style={styles.switch1}
            
          ></Switch>
        
        </View>
        <View style={tabStyles.cupertinoSegmentWithTwoTabsStack}>

          <View style={[tabStyles.container, tabStyles.cupertinoSegmentWithTwoTabs]}>
            <View style={tabStyles.textWrapper}>
              <TouchableOpacity /* Conditional navigation not supported at the moment */
                style={tabStyles.segmentTextWrapperLeft}
              >
                <Text style={tabStyles.titleLeft}> {this.state.currentSecondWord.replace(":","\n")} </Text>
              </TouchableOpacity>
              <TouchableOpacity /* Conditional navigation not supported at the moment */
                style={tabStyles.segmentTextWrapperRight}
              >
                <Text style={tabStyles.titleRight}>{this.state.currentFirstWord.replace(":","\n")} </Text>
              </TouchableOpacity>
            </View>
           <Toast ref = "correctToast"   backgroundColor = "#14AB6D"/>
           <Toast ref = "incorrectToast" backgroundColor = "#FF335E"/>
          </View>
        
          <MaterialCommunityIcons name="school" style={styles.icon} size={30} color={'#2196F3'} type="MaterialCommunityIcons"></MaterialCommunityIcons>
          <Text style={styles.language}>{this.state.language}</Text>
          <Login/>
        </View>
        
        <View style={[textBoxStyles.container, textBoxStyles.materialDisabledTextbox]}>
         
          <Image
              style={{
                width: win.width/2,
                height: win.width/2,
                resizeMode: "contain",
                alignSelf: "center",
                borderWidth: 1,
                borderRadius: 10,
              }}
              //source={require('./img' + '/bread.jpeg')}
              source={this.state.listImages[this.state.imageIndex] } 
              resizeMode="stretch"
            />
             <TextInput
            style={textBoxStyles.inputStyle}
            placeholder={this.state.results.toString()}
            editable={false}
          ></TextInput>
        </View>
        
        
      </SafeAreaView>
     
    );
  }
}
const skipStyles = StyleSheet.create({
  container: {
    backgroundColor: "#E91E63",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 2,
    minWidth: 88,
    paddingLeft: 16,
    paddingRight: 16
  },
  caption: {
    color: "#fff",
    fontSize: 14
  },
  materialButtonSkip: {
    height: 36,
    width: 100,
    marginTop: 20
  },

});

const speakStyles = StyleSheet.create({
  container: {
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 2,
    minWidth: 88,
    paddingLeft: 16,
    paddingRight: 16
  },
  caption: {
    color: "#fff",
    fontSize: 14
  },
  materialButtonSpeak: {
    height: 36,
    width: 100,
 
  },

});

const textBoxStyles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: "#D9D5DC",
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
  },
  inputStyle: {
    color: "#000",
    paddingRight: 5,
    fontSize: 16,
    alignSelf: "stretch",
   
    flex: 1,
    textAlign: "center",
    lineHeight: 16,
    color: 'green',
    paddingTop: 16,
    paddingBottom: 8
  },
  iconStyle: {
    color: "#384850",
    fontSize: 24,
    paddingRight: 8,
    opacity: 0.7
  },
  materialDisabledTextbox: {
     width: "100%",
    aspectRatio: 10 /5.8, 
    padding: 40,
 
  }
});

const micStyles = StyleSheet.create({
  container: {
    backgroundColor: "#3F51B5",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 28,

    shadowColor: "#111",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
    elevation: 2,
    minWidth: 65,
    minHeight: 65,
  },
  icon: {
    color: "#fff",
    fontSize: 30,
    alignSelf: "center",

  },
  materialButtonMic: {
    height: 66,
    width: 66,
    marginLeft: hp('6%'),
    marginRight: hp('6%'),
    marginBottom: 2,
  },

});


const tabStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    flex: 1,
  },
  textWrapper: {
    height: 36,
    flex: 1,
    flexWrap: "wrap",
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: "row"
  },
  segmentTextWrapperLeft: {
    flex: 1,
    alignItems: "center",
    flexWrap: "wrap",
    backgroundColor: "#2196F3",
    padding: 6,
    borderWidth: 1,
    borderColor: "#007AFF",
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5
  },
  titleLeft: {
    fontSize: 18,
    color: "#FFFFFF"
  },
  segmentTextWrapperRight: {
    flex: 1,
    flexWrap: "wrap",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 6,
    borderWidth: 1,
    borderColor: "#007AFF",
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5
  },
  titleRight: {
    fontSize: 18,
    color: "#007AFF"
  },
  cupertinoSegmentWithTwoTabsStack: {
    width: "100%",
    aspectRatio: 10 / 6.5, 
    marginTop: 13,
    
  },
  cupertinoSegmentWithTwoTabs: {
    width: "100%",
    aspectRatio: 10 /6, 
    position: "absolute",
    left: 0,
    top: 13
  },
  icon: {
    color: "#fff",
    fontSize: 30,


  },
});


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "rgba(255,249,249,1)"
  },
  
  materialButtonPinkRow: {
    
    width: "100%",
    aspectRatio: 10 / 1.2, 
    flexDirection: "row",
    marginTop: wp('150%'),
    marginLeft: hp('2%'),
  
  },

  materialContainerSwitch: {
    flex: 0.11,
    alignItems: "center",
    justifyContent: "center"
  },

  materialSwitch: {
    width: 45,
    height: 23,
    shadowOpacity: 1,

    shadowColor: "rgba(74,144,226,1)",
    shadowOffset: {
      width: 5,
      height: 5
    },
    elevation: 0,
    opacity: 1.03,
    alignSelf: 'flex-start',
   
    marginTop: -(hp('85%')),
    left: wp('74%'),
  },
  switch1: {
    width: 45,
    height: 22
  },


  language: {
    top: 0,
    left: wp('70%'),
    position: "absolute",
    color: "rgba(237,15,15,1)",
    opacity: 0.94
  },
});
AppRegistry.registerComponent('VoiceTest', () => VoiceTest);


