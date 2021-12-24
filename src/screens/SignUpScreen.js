


import React,{useState} from 'react';
import { View,TextInput, Text,StyleSheet,Dimensions,Image,TouchableOpacity, ToastAndroid,ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const SignUpScreen = ({navigation}) => {

  const [email, setEmail] = React.useState('');
  const [emailError,setEmailError]  = React.useState(false)
  const [pwd, setPwd] = React.useState('');
  const [pwdError,setPwdError]  = React.useState(false)
  const [confirmPwd, setConfirmPwd] = React.useState('');
  const [confirmPwdError,setConfirmPwdError]  = React.useState(false)
  const [username,setUsername] = React.useState('')
  const [userError,setUserError] = React.useState(false)
  const [fullname,setFullname] = React.useState('')
  const [fullnameError,setFullnameError] = React.useState(false)
  const handleRegistration = async() => {
    if(!(pwdError||confirmPwdError||emailError||userError||fullnameError)){     
      //register(email,confirmPwd)
      try {
        auth()
          .createUserWithEmailAndPassword(email, pwd)
          .then(() => {
            ToastAndroid.show("Registration Succesfull , Please Login", ToastAndroid.LONG);
            navigation.navigate('Login')
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
            }

        console.error(error);
      });
      } catch (error) {
        // Error saving data
      }

     
    }
    else {
      ToastAndroid.show("Please Enter Valid Details", ToastAndroid.LONG);
    }
  }

  const setEmailHandler = (text) => {

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    console.log(text.length)
    if(text.length === 0) {
      setEmailError(false);
    }
    if (reg.test(text) === false) {
    console.log("Email is Not Correct");
    setEmail(text)
    setEmailError(true)
  }
  else {
    setEmail(text)
    setEmailError(false)
    console.log("Email is Correct");
  }
  }

  const setPwdHandler = (text) => {
    setEmailError(false)
    if(text.length < 5 ){
      setPwd(text)
      setPwdError(true)
    }
    else{
      setPwd(text)
      setPwdError(false)
    }
  }

  const setUserHandler = (text) => {
      if (text!=null) {
          setUsername(text)
          setUserError(false)
      }
      else{
          setUserError(true)
      }
  }
  const setFullNameHandler = (text) => {
    if (text!=null) {
        setFullname(text)
        setFullnameError(false)
    }
    else{
        setFullnameError(true)
    }
}
  const setConfirmPwdHandler = ( text ) => {
    if(pwd != text) {
      setConfirmPwd(text)
      setConfirmPwdError(true)
   }else{
    setConfirmPwd(text)
    setConfirmPwdError(false)
   }
  }
    return (
        <View style={{ flex: 1,
          backgroundColor:'#2196f3'}}>
          <View style={styles.upperSection}>
            <View style={{width:'90%',alignSelf:'center',flexDirection:'row',justifyContent:'space-around'}}>
              <Animatable.Text
                animation="fadeInLeft" 
                style={{fontSize:28,fontWeight:'700',color:'white',letterSpacing:2,alignSelf:'center'}}>
                Sign Up!
              </Animatable.Text>
              <Animatable.Image 
              animation="fadeInRight"
              style={{height:150,width:150}}
              source={require('../assets/images/Agent1.png')}
              />
            </View>
          </View>

          <Animatable.View 
            animation="fadeInUp"
            style={styles.lowerSection}>
            <ScrollView style={{width:'90%',alignSelf:'center',marginTop:30}}>
            <View style={[{flexDirection:'row'},styles.textbox]}>
                 {/* <Text style={{fontWeight:'700',fontSize:22}}>Email</Text> */}
                 <View style={{flex:0.1,justifyContent:'center'}}>
                   <MaterialIcon style={{alignSelf:'center'}} name="account" size={20}/>
                 </View>
                <View  style={{flex:1}}>
                  <TextInput
                    style={styles.email}
                    onChangeText={text => setUserHandler(text)}
                    value={username}
                    placeholder="enter username"
                  />
                </View>
              
              </View>
              <View style={[{flexDirection:'row'},styles.textbox]}>
                 {/* <Text style={{fontWeight:'700',fontSize:22}}>Email</Text> */}
                 <View style={{flex:0.1,justifyContent:'center'}}>
                   <MaterialIcon style={{alignSelf:'center'}} name="account" size={20}/>
                 </View>
                <View  style={{flex:1}}>
                  <TextInput
                    style={styles.email}
                    onChangeText={text => setFullNameHandler(text)}
                    value={fullname}
                    placeholder="enter full name"
                  />
                </View>
              
              </View>
            <View style={[{flexDirection:'row'},styles.textbox]}>
                 {/* <Text style={{fontWeight:'700',fontSize:22}}>Email</Text> */}
                 <View style={{flex:0.1,justifyContent:'center'}}>
                   <MaterialIcon style={{alignSelf:'center'}} name="email" size={20}/>
                 </View>
                <View  style={{flex:1}}>
                  <TextInput
                    style={styles.email}
                    onChangeText={text => setEmailHandler(text)}
                    value={email}
                    placeholder="enter email"
                  />
                </View>
              
              </View>
              {emailError?<Text style={{alignSelf:'flex-end',paddingTop:5,color:'red',fontWeight:'700'}}>enter a valid email</Text>:null}
                <View style={[{flexDirection:'row',marginTop:10},styles.textbox]}>
                  {/* <Text style={{fontWeight:'700',fontSize:22}}>Password</Text> */}
                  <View style={{flex:0.1,justifyContent:'center'}}>
                   <MaterialIcon style={{alignSelf:'center'}} name="lock" size={20}/>
                 </View>
                 <View  style={{flex:1}}>
                    <TextInput
                      secureTextEntry={true}
                      textContentType="password"
                        style={styles.password}
                        onChangeText={text => setPwdHandler(text)}
                        value={pwd}
                        placeholder="enter password"
                      />
                 </View>
                
                </View> 
                {pwdError?<Text style={{alignSelf:'flex-end',paddingTop:5,color:'red',fontWeight:'700'}}>password length should be more than 6 digits</Text>:null}

                <View style={[{flexDirection:'row',marginTop:10},styles.textbox]}>
                  {/* <Text style={{fontWeight:'700',fontSize:22}}>Password</Text> */}
                  <View style={{flex:0.1,justifyContent:'center'}}>
                   <MaterialIcon style={{alignSelf:'center'}} name="lock" size={20}/>
                 </View>
                 <View  style={{flex:1}}>
                    <TextInput
                      secureTextEntry={true}
                      textContentType="password"
                      // onFocus ={()=>setPwdError(false)}
                        style={styles.password}
                        onChangeText={text => setConfirmPwdHandler(text)}
                        value={confirmPwd}
                        placeholder="enter confirm password"
                      />
                 </View>
                
                </View> 
                {confirmPwdError?<Text style={{alignSelf:'flex-end',paddingTop:5,color:'red',fontWeight:'700'}}>password didn't matched</Text>:null}

                <TouchableOpacity onPress={()=>handleRegistration()} style={styles.loginBtn}>
                  <Text style={styles.loginBtnText}>Sign Up</Text>
                </TouchableOpacity>
                <View style={{height:1,backgroundColor:'black',marginTop:20}}>
                </View>
                <Text style={{alignSelf:'center',top:-12,backgroundColor:'white',fontWeight:'700',fontSize:18}}>OR</Text>

               

                <TouchableOpacity onPress={()=>{navigation.navigate('Login')}} style={styles.signUpBtn}>
                  <Text style={{color:'black',alignSelf:'center',fontSize:18,fontWeight:'700',marginTop:5}}>Have a account? Login</Text>
                </TouchableOpacity>

            </ScrollView>
          </Animatable.View>
        </View>
      );
}



const styles = StyleSheet.create({
  upperSection:{
    flex:0.6,
    justifyContent:'center'
  },
  lowerSection :{
    flex:2,
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
 
  password :{ 
    fontSize:18,
    paddingLeft:10,
    
    fontWeight:'700',
   },


   loginBtn :{
    height:50,
    backgroundColor:'#2196f3',
    elevation:10,
    marginTop:30,
    borderRadius:10,
    justifyContent:'center'
  },
  loginBtnText :{
    alignSelf:'center',
    fontSize:22,
    fontWeight:'700',
  borderWidth: 0.5,
  borderColor:'transparent',
color:'white'},

signUpBtn :{
  justifyContent:'center'
},
loginBtnGoogle :{
  height:50,
  backgroundColor:'#DB4437',
  elevation:10,
  marginTop:5,
  borderRadius:10,
  justifyContent:'center'
},
loginBtnFb : {
  height:50,
  backgroundColor:'#4267B2',
  elevation:10,
  marginTop:5,
  borderRadius:10,
  justifyContent:'center'
},
googleBtn : {
  color:'white',
  alignSelf:'center'
  ,fontSize:18,
  fontWeight:'700',
},
fbBtn : {
  color:'white',
  alignSelf:'center'
  ,fontSize:18,
  fontWeight:'700',
},
email: {
  fontSize:18,
  fontWeight:'700',
  paddingLeft:10
 },

textbox: { height: 50,
  marginTop:10,
  borderRadius:5,
 backgroundColor:'white',
  elevation:5,
 borderColor: 'gray', 
 borderWidth: 0.5,
borderColor:'transparent' },

})



export default SignUpScreen;