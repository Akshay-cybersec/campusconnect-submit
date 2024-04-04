import React, {useEffect, useState } from "react";
import {Text,View,StyleSheet,Image} from 'react-native'
import logo from '../images/logo.png'


const StartSplash=()=>{
  
  return(
    <View style={{flex:1,backgroundColor:'#0C353C',alignItems:'center',justifyContent:'center'}}>
    <Image source={logo} style={{width:100,height:100}}/>
    </View>
  );
}

export default StartSplash;