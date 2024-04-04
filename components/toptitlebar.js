import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { useEffect,useState } from 'react'
import React from 'react'
import { COLORS } from '../universal/color'
import logo from '../images/logo.png'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { mainurl } from '../universal/appurls'

const Toptitlebar = ({navigation}) => {
    const handleYesPress = async() => {
        await AsyncStorage.clear();
        navigation.navigate('login')
      };
    useEffect(()=>{
        getlogindata();
    },[])
    const [printdata,Setprintdata]=useState("");
    const getlogindata = async() => {
        await AsyncStorage.getItem('logindata')
            .then(data => {
                if (data !== null) {
                    const dataval = JSON.parse(data);
                    Setprintdata(dataval)
                    console.log('Retrieved data:', dataval);
                } else {
                    console.log('No data found');
                }
            })
            .catch(error => console.error('Error retrieving data:', error));
    }
    const logout=()=>{
        Alert.alert(
            'Confirmation',
            'Do you want to Logout?',
            [
              {
                text: 'No',
                style: 'cancel',
              },
              {
                text: 'Yes',
                onPress: handleYesPress,
              },
            ],
            { cancelable: false }
          );
    }
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.appcol, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 }}>
            <View style={{ flex: 2, flexDirection: 'row' }}>
                <Image source={logo} style={{ height: 46, width: 46 }} />
                <View style={{ top: 10, alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 24 ,fontFamily:'Sahitya-Regular'}}>{mainurl.appname}</Text>
                    <Text style={{ color: 'white', fontSize: 12 ,fontFamily:'Inter-Black'}}>{mainurl.appslogan}</Text>
                </View>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <TouchableOpacity onPress={()=>logout()}>
                    <MaterialCommunityIcons name="logout" size={28} color="white" style={{ padding: 10, borderColor: 'black', fontWeight: '900', top: 10 }}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    input: {
        borderWidth: 0.1,
        fontSize: 14,
        paddingHorizontal: 8,
        marginTop: 10,
        paddingVertical: 2
    },
    buttonstyle: {
        backgroundColor: '#F6AC3F',
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 7,
        borderWidth: 1
    }
})

export default Toptitlebar;