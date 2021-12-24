

import * as React from 'react';
import { View, Text,StyleSheet,Dimensions,Image,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;


const ProfileScreen = ({navigation}) => {
    const [username,setUsername] = React.useState('')
    const [fullname,setFullname] = React.useState('')

    
    React.useEffect(async()=>{
      const value =  ''
      setUsername(value)
      const value2 = ''
      setFullname(value2)
    },[])
    return (
        <View style={{ flex: 1,
          backgroundColor:'#2196f3'}}>
          <View style={styles.upperSection}>
          <View
          style={{
            width: '90%',
            alignSelf: 'center',
            flexDirection: 'column-reverse',
            justifyContent: 'space-around',
          }}>
          <Animatable.Text
            useNativeDriver={true}
            duration={1000}
            animation="fadeInLeft"
            style={{
              fontSize: 28,
              fontWeight: '700',
              color: 'white',
              letterSpacing: 2,
              textAlign:'center',
              alignSelf: 'center',
            }}>
            Welcome! {"\n"}
            {fullname} {"\n"}
            Username : {username}
          </Animatable.Text>
        
          <Animatable.Image
            useNativeDriver={true}
            duration={1000}
            animation="fadeInRight"
            style={{height:150,width:150,alignSelf:'center'}}
            source={require('../assets/images/Agent2.png')}
          />
        </View>
          </View>
          <Animatable.View 
            animation="fadeInUp"
            style={styles.lowerSection}>
            
            <TouchableOpacity onPress={()=>navigation.navigate('Spalsh')} style={styles.btnView} >
            <Animatable.View
              animation="fadeInRight"  
             style={[styles.btn]}>
              <Text style={styles.getStart}>Logout</Text>
            
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
    flex:2,
    backgroundColor:'white',
    borderTopEndRadius:20,
    borderTopStartRadius:20,
    justifyContent:'center'
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
    alignSelf:'center',
    borderRadius:10,
    
  },
  btnView: {

    height:50,
    width:150,
    justifyContent:'center',
    alignSelf:'center',
    borderRadius:10,
    
  },
  getStart :{
    fontSize:24,
    fontWeight:'700',
    color:'white',
    textAlign:'center'
  }

})



export default ProfileScreen;