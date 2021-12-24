

import * as React from 'react';
import { View, Text,StyleSheet,Dimensions,Image,TouchableOpacity,TouchableHighlight,FlatList, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import MaterialIcon from 'react-native-vector-icons/FontAwesome';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import {ListContext} from '../contextApi/Listing'

const RESTAURANTS = [
    {
      id: 'r1',
      name: 'Restaurant one',
      location:"location one, India",
      photo:require('../assets/images/restuarants/r1.jpg'),
      type:'restaurant',
      desc:"What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has?"
    },
    {
      id: 'r2',
      name: 'Restaurant two',
      location:"location two, India",
      type:'restaurant',
      photo:require('../assets/images/restuarants/r2.jpg'),
      desc:"What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has?"
    },
    {
      id: 'r3',
      name: 'Restaurant three',
      location:"location three, India",
      photo:require('../assets/images/restuarants/r3.jpg'),
      type:'restaurant',
      desc:"What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has?"
    },
    {
      id: 'r4',
      name: 'Restaurant four',
      location:"location four, India",
      type:'restaurant',
      photo:require('../assets/images/restuarants/r4.jpg'),
      desc:"What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has?"
    },
    {
      id: 'r5',
      name: 'Restaurant five',
      location:"location five, India",
      photo:require('../assets/images/restuarants/r5.jpg'),
      type:'restaurant',
      desc:"What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has?"
    },
    
  ];

const LisitingScreen = ({navigation}) => {
     const {listing,deleteList} = React.useContext(ListContext)
    
    

    const [list,setList] = React.useState([])
    const [selectedTab,setSelectedTab] = React.useState('tabOne')
    
    React.useEffect(async() => {
        // setList(listing)
    
    },[])

    const removeFromListing=  async(item) => {
      try {
        await deleteList(item)
        ToastAndroid.show("Location Removed from Listing", ToastAndroid.LONG);
      }
      catch {
        console.log("listing")
      }
    }

    const renderItem =({item}) => (
        <TouchableHighlight underlayColor="lightblue" 
        onPress={()=>navigation.navigate('Desc',{data:item})}
        style={{height:SCREEN_HEIGHT/6,width:SCREEN_WIDTH-40,borderRadius:10,
          elevation:5,marginTop:5,marginBottom:5,
        backgroundColor:'white',alignSelf:'center'}}>
            <View style={{flex:1,flexDirection:'row'}}>
              <View style={{flex:0.4,justifyContent:'center',padding:10}}>
               <Image 
                style={{height:'100%',width:'100%'}}
                source={item.photo}
               />
              </View>
              <View style={{flex:0.5,justifyContent:'center'}}>
                  <Text style={{fontSize:22,color:'#091527',fontWeight:'700'}}>{item.name}</Text>
                  <View style={{flexDirection:'row'}}>
                  <Text  style={{fontSize:18,color:'#233753',fontWeight:'700',alignSelf:'center'}}>{item.location}</Text> 
                  </View>
                  <Text style={{fontSize:16,color:'#091527',fontWeight:'700'}}>{item.type}</Text>
              </View>
              <View style={{flex:0.3,justifyContent:'center',flexDirection:'row'}}>
              <TouchableOpacity onPress={()=> removeFromListing(item)}style={[styles.btn,{backgroundColor:'red'}]}>
                  <MaterialIcon
                    style={{alignSelf: 'center'}}
                    name="minus"
                    color="white"
                    size={20}
                  />
                  </TouchableOpacity>
              </View>
            </View>
        </TouchableHighlight>
    )
  
  
    return (
        <View style={{ flex: 1,
          backgroundColor:'#2196f3'}}>
          <View style={styles.upperSection}>
          <View
          style={{
            width: '90%',
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <Animatable.Text
            useNativeDriver={true}
            duration={2000}
            animation="fadeInLeft"
            style={{
              fontSize: 28,
              fontWeight: '700',
              color: 'white',
              letterSpacing: 2,
              textAlign:'center',
              alignSelf: 'center',
            }}>
            Selected! {"\n"}
            Listing
          </Animatable.Text>
        
          <Animatable.Image
            useNativeDriver={true}
            duration={2000}
            animation="fadeInRight"
            style={{height:150,width:150}}
            source={require('../assets/images/Agent.png')}
          />
        </View>
          </View>
          <Animatable.View 
            animation="fadeInUp"
            style={styles.lowerSection}>
            
            <View style={{flex:1,marginTop:24,width:SCREEN_WIDTH-20,alignSelf:'center',paddingBottom:20}}>
              
           
             <FlatList
                      data={listing}
                      renderItem={renderItem}
                      keyExtractor={item=>item.id}
                  />
           </View>
          
          </Animatable.View>
        </View>
      );
}



const styles = StyleSheet.create({
  upperSection:{
    flex:0.5,
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
  btn: {
    backgroundColor:'#2196f3',
    height:50,
    width:50,
    justifyContent:'center',
    marginRight:10,
    alignSelf:'center',
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



export default LisitingScreen;