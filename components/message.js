import { View, Text, Image, StatusBar, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS } from '../universal/color'
import { TextInput as MyInput, DefaultTheme, Modal } from 'react-native-paper';
import Toptitlebar from './toptitlebar';
import axios from 'axios'
import { mainurl } from '../universal/appurls';


const customTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0C353C',
        background: 'rgba(12, 53, 60, 0.3)',
    },
};

const Message = ({ navigation }) => {
    const [visible, setVisible] = useState(false);
    const [rollcall, Setrollcall] = useState(null);
    const [message, Setmessage] = useState(null);
    const toggleVisibility = () => setVisible(!visible);
    const fillroll = () => {
        toggleVisibility();
        fetchapi();
    }
    const fetchapi = async () => {
        const datavalues={
            id:rollcall,
            message:message
        }
        url = mainurl.appurl+"/api/v1/message"
        const response = await axios.post(url,datavalues);
        Alert.alert("Alert",response.data.status)
    }
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.appcol }}>
            <StatusBar
                backgroundColor="transparent"
                translucent={true}
            />
            <Toptitlebar navigation={navigation} />
            <View style={{ flex: 5, backgroundColor: 'white', borderTopRightRadius: 17, borderTopLeftRadius: 17, paddingHorizontal: 15, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: '90%', flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <View style={{ flex: 0.5, justifyContent: 'center', alignContent: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: '700', textAlign: 'center' ,fontFamily:'Inter-Bold'}}>Message</Text>
                    </View>
                    <View style={{ flex: 1, width: '100%', justifyContent: 'center' }}>
                        <Text style={style.boldtext}>Enter Roll No.: </Text>
                        <Text>(seperated by comma "," Eg- 1800,1801)</Text>
                        <MyInput
                            placeholder='Enter Roll Numbers'
                            mode="outlined"
                            theme={customTheme}
                            style={style.input}
                            onChangeText={(val) => Setrollcall(val)}

                        />
                    </View>
                    <View style={{ flex: 1, width: '100%' }}>
                        <Text style={style.boldtext}>Enter Message: </Text>
                        <MyInput
                            placeholder='Enter Message'
                            mode="outlined"
                            theme={customTheme}
                            style={[style.input, style.textarea]}
                            multiline={true}
                            numberOfLines={7}
                            onChangeText={(val) => Setmessage(val)}
                        />
                    </View>
                    <View style={{ width: '80%', flex: 1, justifyContent: 'center' }}>
                        <TouchableOpacity style={style.buttonstyle} onPress={() => fillroll()}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Send Message</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    input: {
        borderWidth: 0.1,
        fontSize: 14,
        paddingHorizontal: 8,
        marginTop: 10,
        paddingVertical: 2,
    },
    textarea: {
        paddingTop: 12,
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
        paddingTop: 25
    },
    boldtext: {
        fontSize: 14,
        fontWeight: '600',
    }
})





export default Message