

import * as React from 'react';
import { View, Text,StyleSheet,Dimensions,Image,TouchableOpacity,StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;


const SplashScreen = ({navigation}) => {
    return (
        <View style={{ flex: 1,
          backgroundColor:'#2196f3'}}>
            <StatusBar backgroundColor={'#2196f3'}/>
          <View style={styles.upperSection}>
            <Animatable.Image 
              animation="bounceIn"
               style={{alignSelf:'center',height:250,width:250}}
              source={require('../assets/images/Agent.png')}
              />
          </View>
          <Animatable.View 
            animation="fadeInUp"
            style={styles.lowerSection}>
            <View style={{width:'80%',alignSelf:'center',marginTop:15,flex:0.7}}>
              <Text style={styles.intro}>Let's Explore your surroundings !</Text>
            </View> 
            <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={styles.btnView} >
            <Animatable.View
              animation="fadeInRight"  
             style={styles.btn}>
              <Text style={styles.getStart}>Get Started</Text>
            
            </Animatable.View>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      );
}



const styles = StyleSheet.create({
  upperSection:{
    flex:2,
    justifyContent:'center'
  },
  lowerSection :{
    flex:1,
    backgroundColor:'white',
    borderTopEndRadius:20,
    borderTopStartRadius:20
  },
  intro :{
    fontSize:28,
    fontWeight:'700',
    color:'black',
    // fontFamily:'AndikaNewBasic-Bold'
  },
  btn: {
    backgroundColor:'#2196f3',
    height:50,
    width:150,
    justifyContent:'center',
    marginRight:10,
    alignSelf:'flex-end',
    borderRadius:10,
    
  },
  btnView: {

    height:50,
    width:150,
    justifyContent:'center',
    marginRight:10,
    alignSelf:'flex-end',
    borderRadius:10,
    
  },
  getStart :{
    fontSize:24,
    fontWeight:'700',
    color:'white',
    textAlign:'center'
  }

})



export default SplashScreen;