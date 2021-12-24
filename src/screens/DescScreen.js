

import * as React from 'react';
import { View, Text,StyleSheet,Dimensions,Image,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/FontAwesome';
import MapView,{Marker} from 'react-native-maps';
import {MapViewDirections} from 'react-native-maps-directions';
import * as Animatable from 'react-native-animatable';
import { NavigationHelpersContext } from '@react-navigation/core';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import markerpic from '../assets/images/Agent.png'
import { useState } from 'react/cjs/react.development';
const GOOGLE_MAPS_APIKEY = 'AIzaSyCHfbhj5QN5V9Ek60tloYNvIAAYpvuXj44';
  const origin = {latitude: 37.3318456, longitude: -122.0296002};
const destination = {latitude: 37.771707, longitude: -122.4053769};
const DescScreen = ({navigation,route}) => {

    return (
        <View style={{ flex: 1,backgroundColor:'white'
         }}>
             <TouchableOpacity onPress={()=> {navigation.goBack()}} style={{position:'absolute',zIndex:20,height:45,width:45,backgroundColor:"#000000",borderRadius:50,alignItems:'center',justifyContent:'center',margin:5}}>
                  <MaterialIcon
                    style={{}}
                    name="angle-left"
                    color="white"
                    size={30}
                  />
                  </TouchableOpacity>
          <View style={styles.upperSection}>
           
          <MapView
          style={styles.map}
          initialRegion={{
            latitude: Number(route.params.lat),
            longitude: Number(route.params.long),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >

          <Marker
                key={1}
                coordinate={{ latitude : Number(route.params.lat) , longitude : Number(route.params.long) }}
                title={route.params.name}
                description={'check'}
              />
          {/* <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
          /> */}
          </MapView>    
          
          </View>
         
          <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.btnView} >
            <Animatable.View
              animation="fadeInRight"  
             style={[styles.btn,{position:'absolute',bottom:0,marginTop:20}]}>
              <Text style={styles.getStart}>Explore More</Text>
            
            </Animatable.View>
            </TouchableOpacity>
        </View>
      );
}



const styles = StyleSheet.create({
  upperSection:{
    flex:1,
    justifyContent:'center',
    backgroundColor:'red'
  },
  lowerSection :{
    flex:1,
    bottom:20,
    backgroundColor:'white',
    borderTopEndRadius:20,
    borderTopStartRadius:20
  },
  map:{
    height:'100%',
    width:'100%'
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
    position:'absolute',
    height:50,
    width:150,
    justifyContent:'center',
    marginRight:10,
    alignSelf:'flex-end',
    borderRadius:10,
    bottom:20,
    right:10
    
  },
  getStart :{
    fontSize:22,
    fontWeight:'700',
    color:'white',
    textAlign:'center'
  }

})



export default DescScreen;