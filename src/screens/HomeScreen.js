

import React,{useState} from 'react';
import { View, Text,StyleSheet,Dimensions,Image,TouchableOpacity,TouchableHighlight,FlatList, ToastAndroid,Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as Animatable from 'react-native-animatable';
import MaterialIcon from 'react-native-vector-icons/FontAwesome';
import ProfileScreen from './ProfileScreen';
import firestore from '@react-native-firebase/firestore';
import Geolocation from '@react-native-community/geolocation';
import {ListContext} from '../contextApi/Listing'
import BackgroundTimer from 'react-native-background-timer';
import MapView,{Marker} from 'react-native-maps';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const RESTAURANTS = [
  {
    id: 'r1',
    name: 'Restaurant one',
    location:"location one, Sydney",
    photo:require('../assets/images/restuarants/r1.jpg'),
    type:'restaurant',
    desc:"What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has?"
  },
  {
    id: 'r2',
    name: 'Restaurant two',
    location:"location two, Sydney",
    type:'restaurant',
    photo:require('../assets/images/restuarants/r2.jpg'),
    desc:"What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has?"
  },
  {
    id: 'r3',
    name: 'Restaurant three',
    location:"location three, Sydney",
    photo:require('../assets/images/restuarants/r3.jpg'),
    type:'restaurant',
    desc:"What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has?"
  },
  {
    id: 'r4',
    name: 'Restaurant four',
    location:"location four, Sydney",
    type:'restaurant',
    photo:require('../assets/images/restuarants/r4.jpg'),
    desc:"What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has?"
  },
  {
    id: 'r5',
    name: 'Restaurant five',
    location:"location five, Sydney",
    photo:require('../assets/images/restuarants/r5.jpg'),
    type:'restaurant',
    desc:"What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has?"
  },
  
];

const HomeScreen = ({route,navigation}) => {
    const [username,setUsername] = React.useState(route.params.username)
    const [mapLoaded,setMapLoaded]  = React.useState(false)
    const [
      currentLongitude,
      setCurrentLongitude
    ] = useState('...');
    const [
      currentLatitude,
      setCurrentLatitude
    ] = useState('...');
    const [
      locationStatus,
      setLocationStatus
    ] = useState('');
    const [userList,setUserList] = useState([])
    const cont = React.useContext(ListContext);
    React.useEffect(()=>{
        firstRun()
       

     
      
    },[])

    const firstRun = async() => {
      const value =  []
      setUsername(value)
      getOneTimeLocation()
      requestLocationPermission();
      
        try {
          const response=firestore().collection('Users');
          const data=await response.get();
          console.log("data fetched from firebase",data)
          const list = [];
         data.docs.forEach(item=>{
            
             if(item.data()) {
                 const lstDoc = {ids:item.id,...item.data()}
                 console.log("fetched data from firebase",item.data())
                 list.push(lstDoc)
                 setUserList([...list])
             }
          
         })
       }
       catch (err) {
         //console.log("respsss
       }
      
       
    }
    const intervalId = (value) => {
       BackgroundTimer.setInterval(() => {
        // this will be executed every 200 ms
        // even when app is the background
        console.log("maploaded",new Date())
        fetchLocation()
    }, 300000)

    if(value){
        BackgroundTimer.clearInterval(intervalId);
    }
    } 

    const fetchLocation = () => {
      const getOneTimeLocation = () => {
      setLocationStatus('Getting Location ...');
      Geolocation.getCurrentPosition(
        //Will give you the current location
        (position) => {
          setLocationStatus('You are Here');
  
          //getting the Longitude from the location json
          const currentLongitude = 
            JSON.stringify(position.coords.longitude);
  
          //getting the Latitude from the location json
          const currentLatitude = 
            JSON.stringify(position.coords.latitude);
  
          //Setting Longitude state
          setCurrentLongitude(currentLongitude);
          
          //Setting Longitude state
          setCurrentLatitude(currentLatitude);

         onSendLocation()
        },
        (error) => {
          setLocationStatus(error.message);
        },
        {
          enableHighAccuracy: false,
          timeout: 30000,
          maximumAge: 1000
        },
      );
    };
  
    }
    const onStopLocation = () => {
      console.log('celarrr')
      BackgroundTimer.clearInterval(intervalId);
    }
    React.useEffect(()=>{
      if(mapLoaded){
        console.log("maploaded")
        onSendLocation()
         intervalId()
      }
     
    },[mapLoaded])
    
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
   

    const getOneTimeLocation = () => {
      setLocationStatus('Getting Location ...');
      Geolocation.getCurrentPosition(
        //Will give you the current location
        (position) => {
          setLocationStatus('You are Here');
  
          //getting the Longitude from the location json
          const currentLongitude = 
            JSON.stringify(position.coords.longitude);
  
          //getting the Latitude from the location json
          const currentLatitude = 
            JSON.stringify(position.coords.latitude);
  
          //Setting Longitude state
          setCurrentLongitude(currentLongitude);
          
          //Setting Longitude state
          setCurrentLatitude(currentLatitude);

          setMapLoaded(true)
        },
        (error) => {
          setLocationStatus(error.message);
        },
        {
          enableHighAccuracy: false,
          timeout: 30000,
          maximumAge: 1000
        },
      );
    };
  
    const subscribeLocationLocation = () => {
      watchID = Geolocation.watchPosition(
        (position) => {
          //Will give you the location on location change
          
          setLocationStatus('You are Here');
          console.log(position);
  
          //getting the Longitude from the location json        
          const currentLongitude =
            JSON.stringify(position.coords.longitude);
  
          //getting the Latitude from the location json
          const currentLatitude = 
            JSON.stringify(position.coords.latitude);
  
          //Setting Longitude state
          setCurrentLongitude(currentLongitude);
  
          //Setting Latitude state
          setCurrentLatitude(currentLatitude);

          onSendLocation()
        },
        (error) => {
          setLocationStatus(error.message);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 1000
        },
      )
    };

    const removeElement = async(id) => {
      await firestore().collection('Users').doc(id).delete()

      const response=firestore().collection('Users');
      const data=await response.get();
      console.log("data fetched from firebase",data)
      const list = [];
     data.docs.forEach(item=>{
        
         if(item.data()) {
             const lstDoc = {ids:item.id,...item.data()}
             console.log("fetched data from firebase",item.data())
             list.push(lstDoc)
             setUserList([...list])
         }
      
     })
    }
  
    const onSendLocation = ()=> {
  
      firestore()
      .collection('Users')
      .doc(route.params.username)
      .set({
        name: route.params.username,
        latitude:currentLatitude ,
        longitude:currentLongitude,
        time: new Date().toLocaleString()
      })
      .then(() => {
        console.log('User added!');
      });
    }
    // React.useEffect(async() => {
    //     setList(RESTAURANTS)
    // }, [])

  

    const renderItem =({item}) => (
        <TouchableHighlight underlayColor="lightblue" 
        onPress={()=>navigation.navigate('Desc',{name:item.name,long:item.longitude,lat:item.latitude})}
        style={{height:SCREEN_HEIGHT/6,width:SCREEN_WIDTH-40,borderRadius:10,
          elevation:5,marginTop:5,marginBottom:5,
        backgroundColor:'gray',alignSelf:'center'}}>
            <View style={{flex:1,flexDirection:'column'}}>
              <View style={{flex:0.7,alignItems:'center',justifyContent:"center",marginTop:5}}>
                <Text style={{fontSize:18,color:'#091527',fontWeight:'700',textAlign:'center'}}>name:{item.name}</Text>
                  <Text style={{fontSize:18,color:'#091527',fontWeight:'700',textAlign:'center'}}>longitude:{item.longitude}</Text>
                  <Text style={{fontSize:18,color:'#091527',fontWeight:'700',textAlign:'center'}}>latitude:{item.latitude}</Text>
                  <View style={{flexDirection:'row'}}>
                  <Text  style={{fontSize:18,color:'#233753',fontWeight:'700',alignSelf:'center'}}>{item.location}</Text> 
                  </View>
              </View>
              <View style={{flex:0.3}}>
                <TouchableOpacity onPress={()=>removeElement(item.name)} style={styles.btnView} >
                <Animatable.View
                  animation="fadeInRight"  
                style={[styles.btn,{position:'absolute',bottom:0,marginTop:20}]}>
                  <Text style={styles.getStart}>Remove</Text>
                
                </Animatable.View>
                </TouchableOpacity>
              </View>
          
            </View>
        </TouchableHighlight>
    )
  
 
  const locationDetails = () =>  (
      <View style={{flex: 1,justifyContent:'center'}}>
      <View style={styles.container}>
        <View style={styles.container}>
         
         <View style={{height:250,width:'100%'}}>
         {mapLoaded? <MapView
          style={styles.map}
          initialRegion={{
            latitude: Number(currentLatitude),
            longitude: Number(currentLongitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >

          <Marker
                key={1}
                coordinate={{ latitude : Number(currentLatitude), longitude : Number(currentLongitude) }}
                title={route.params.name}
                description={'check'}
              />

          </MapView> : <></>}     
          </View>
          <Text style={styles.boldText}>
            {locationStatus}
          </Text>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
              color:'black'
            }}>
            Longitude: {currentLongitude}
          </Text>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
              color:'black'
            }}>
            Latitude: {currentLatitude}
          </Text>
          {/* <View style={{marginTop: 20}}>
            <Button
              title="Fetch Location"
              onPress={getOneTimeLocation}
            />
          </View> */}
          <View style={{marginTop: 20}}>
            <Button
              title="Submit Location"
              onPress={onSendLocation}
            />
            
          </View>
          {/* <View style={{marginTop: 10}}>
            <Button

              title="Stop Location"
              onPress={()=>intervalId(true)}
            />
            
          </View> */}
        </View>
      
      </View>
    </View>
    )
  
   

    return (
        <View style={{ flex: 1,
          backgroundColor:'#2196f3'}}>
        
          <Animatable.View 
            animation="fadeInUp"
            style={styles.lowerSection}>
            
            <View style={{flex:1,marginTop:24,width:SCREEN_WIDTH-20,alignSelf:'center',paddingBottom:20}}>
              
           <View style={{flex:1}}>
             {route.params.admin?  <FlatList
                      data={userList}
                      renderItem={renderItem}
                      keyExtractor={item=>item.id}
                  />:locationDetails()}
               </View>
            </View>
          
           
             {route.params.admin && userList.length == 0?  
              <View style={{position:'absolute',display:'flex',justifyContent:'center',alignSelf:'center',marginTop:20}}>
                <Text style={{fontSize:24,fontWeight:'700',color:'black',textAlign:'center'}}>No user present</Text>
                </View>
             :<></>}
          </Animatable.View>
        </View>
      );
}



const styles = StyleSheet.create({
  boldText: {
    fontWeight:'700',
    fontSize:24,
    color:'black'
  },
  upperSection:{
    flex:0.5,
    justifyContent:'center'
  },
  lowerSection :{
    flex:2,
    backgroundColor:'#f6f6f6',
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
    height:'95%',
    width:100,
    justifyContent:'center',
    marginBottom:5,
    alignSelf:'center',
    borderRadius:10,
    
  },
  btnView: {

    height:'100%',
    width:150,
    justifyContent:'center',
    alignSelf:'flex-end',
    borderRadius:10,
    
  },
  getStart :{
    fontSize:18,
    fontWeight:'700',
    color:'white',
    textAlign:'center'
  },map:{
    height:'100%',
    width:'100%'
  }

})



export default HomeScreen;