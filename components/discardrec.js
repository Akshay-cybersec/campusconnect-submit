import { View, Text, StatusBar, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../universal/color'
import { TextInput as MyInput, DefaultTheme } from 'react-native-paper';
import Toptitlebar from './toptitlebar';
import axios from 'axios';
import { mainurl } from '../universal/appurls';

const customTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0C353C',
        background: 'rgba(12, 53, 60, 0.3)',
    },
};

const Discardrec = ({ navigation }) => {
    const Record = () => {
        const [rollno, SetRollno] = useState("")
        const deleteres = async () => {
            if (rollno == "") {
                Alert.alert("", "Please enter roll no")
                return;
            }
            else{
                Alert.alert(  
                'Alert',  
                'Are You Sure ?',  
                [  
                    {  
                        text: 'Cancel',  
                        style: 'cancel',  
                    },  
                    {text: 'OK', onPress: async() => {
                        try {
                            const url = mainurl.appurl+"/campusconnectdelete/" + rollno
                            const request = await axios.delete(url);
                            console.log(request.status)
                            if (request.status == 200) {
                                msg = rollno + " Deleted from Records";
                                Alert.alert("Congratulations", msg);
                            }
                            else if (request.status == 404) {
                                const errorData = await request.json();
                                Alert.alert("Error", errorData.error);
                            } else {
                                // Other server error
                                Alert.alert("Error", errorData.error);
                            }
                        } catch (error) {
                            Alert.alert(error.status,"Cannot Find Record")
                        }
                    }},  
                ]  
            );  
                
            }
            
            
        }
        return (
            <View style={{ flex: 1, backgroundColor: COLORS.appcol }}>
                <StatusBar
                    backgroundColor="transparent"
                    translucent={true}
                />
                <Toptitlebar navigation={navigation}/>
                <View style={{ flex: 5, backgroundColor: 'white', borderTopRightRadius: 17, borderTopLeftRadius: 17, paddingHorizontal: 15, alignItems: 'center' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: '700', textAlign: 'center' ,fontFamily:'Inter-Bold'}}>Discard student record</Text>
                    </View>
                    <View style={{ flex: 4, width: "90%", marginBottom: 1 }}>
                        <View style={style.innerbox}>
                            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Roll Number</Text>
                            <MyInput
                                placeholder='Enter your roll no'
                                mode="outlined"
                                theme={customTheme}
                                style={style.input}
                                onChangeText={(val) => SetRollno(val)}
                            />
                        </View>


                    </View>
                    <View style={{ width: '80%', flex: 3, justifyContent: 'center' }}>
                        <TouchableOpacity style={style.buttonstyle} onPress={() => deleteres()}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Discard</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }


    return (
        <Record />
    )
}

const style = StyleSheet.create({
    input: {
        borderWidth: 0.1,
        fontSize: 14,
        paddingHorizontal: 8,
        marginTop: 10,
        paddingVertical: 2,
    },
    buttonstyle: {
        backgroundColor: '#F6AC3F',
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 7,
        borderWidth: 1
    },
    info: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    infoalign: {
        flexDirection: 'row',
        paddingTop: 13,
        alignItems: 'center'
    },
    innerbox: {
        width: '100%',
        flex: 2,
        justifyContent: 'center',
        paddingBottom: 16
    }
})





export default Discardrec