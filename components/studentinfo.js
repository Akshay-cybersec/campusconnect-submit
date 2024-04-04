import { View, Text, StatusBar, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../universal/color'
import { TextInput as MyInput, DefaultTheme } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
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


const Studentinfo = ({ navigation }) => {
    const [pass, Setpass] = useState(0);
    const handlechildval = (val) => {
        Setpass(val);
    }
    const [appscreen, Setappscreen] = useState(false);
    const Student = ({ onsendval }) => {
        const [roll, SetRoll] = useState(0);
        const handlevalue = () => {
            onsendval(roll)
        }
        return (
            <View style={{ flex: 1, backgroundColor: COLORS.appcol }}>
                <StatusBar
                    backgroundColor="transparent"
                    translucent={true}
                />
                <Toptitlebar navigation={navigation} />
                <View style={{ flex: 5, backgroundColor: 'white', borderTopRightRadius: 17, borderTopLeftRadius: 17, paddingHorizontal: 15, alignItems: 'center' }}>
                    <View style={{ flex: 0.5, justifyContent: 'center', width: '85%', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' ,fontFamily:'Inter-Bold'}}>Access Student data </Text>
                    </View>
                    <View style={{ width: '85%', flex: 2, justifyContent: 'flex-start' }}>
                        <Text></Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Enter Roll No.:</Text>
                        <MyInput
                            placeholder='Enter Roll Number'
                            mode="outlined"
                            theme={customTheme}
                            style={style.input}
                            onChangeText={(text) => SetRoll(text)}
                        />
                    </View>
                    <View style={{ width: '85%', flex: 1 }}>
                        <TouchableOpacity style={style.buttonstyle} onPress={() => { Setappscreen(true); handlevalue() }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Fetch</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    const StudentResult = (props) => {
        const [data, Setdata] = useState(null);
        const [flag, setFlag] = useState(true)
        const fetchapi = async () => {
            url = mainurl.appurl + "/api/v1/campusconnectapi/" + props.val
            const response = await axios.get(url);
            Setdata(JSON.parse(JSON.stringify(response.data)));
        }
        useEffect(() => {
            fetchapi();
        }, [])


        return (
            <View style={{ flex: 1, backgroundColor: COLORS.appcol }}>
                <StatusBar
                    backgroundColor="transparent"
                    translucent={true}
                />

                <Toptitlebar navigation={navigation} />
                <View style={{ flex: 5, backgroundColor: 'white', borderTopRightRadius: 17, borderTopLeftRadius: 17, paddingHorizontal: 15, alignItems: 'center' }}>                
                    <View style={{ width: '85%', flex: 1 }}>

                        <View style={{ flex: 1, flexDirection: 'row', borderWidth: 2, borderRadius: 7, borderColor: 'black', marginVertical: 20, justifyContent: 'space-evenly', alignItems: 'center' }}>

                            <View>
                                <Ionicons name='person' size={24} color='black' />
                            </View>
                            <Text style={{ fontWeight: 'bold' }}>{data ? data.roll_no : ""}</Text>
                            <View>
                                <Text style={{ fontWeight: 'bold' }}>{data ? data.branch : "No Data Found"}</Text>
                            </View>
                            <View>
                                <Text style={{ fontWeight: 'bold' }}>{data ? data.name : ""}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 5, width: '85%' }}>
                        <View style={{ flex: 1, alignContent: 'flex-start' }}>
                            <View style={style.infoalign}>
                                <Text style={style.info}>Enrollment no. : </Text>
                                <Text>{data ? data.enr_no : "null"}</Text>
                            </View>
                            <View style={style.infoalign}>
                                <Text style={style.info}>Student ph.no. :  </Text>
                                <Text>{data ? data.phno : "null"}</Text>
                            </View>
                            <View style={style.infoalign}>
                                <Text style={style.info}>Parent's ph.no. :   </Text>
                                <Text>{data ? data.parents_phno : "null"}</Text>
                            </View>
                            <View style={style.infoalign}>
                                <Text style={style.info}>Address :  </Text>
                                <View>
                                    <Text>{data ? data.addr : "null"}</Text>
                                </View>
                            </View>
                            <View style={style.infoalign}>
                                <Text style={style.info}>Email :   </Text>
                                <Text>{data ? data.email : "null"}</Text>
                            </View>
                            <View style={style.infoalign}>
                                <Text style={style.info}>Previous Semester:   </Text>
                                <Text style={{ color: 'green', fontSize: 20 }}>{data ? data.percentage : "null"}</Text>
                            </View>
                            <View style={style.infoalign}>
                                <Text style={style.info}>KT:   </Text>
                                <Text style={{ color: 'red', fontSize: 15 }}>{data ? (String(data.kt)).toUpperCase() : "null"}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <View style={{ width: '80%', width: '100%' }}>
                                <TouchableOpacity style={style.buttonstyle} onPress={() => Setappscreen(false)}>
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Search For Another Student</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </View>
            </View>
        );
    }

    return (
        appscreen ? <StudentResult val={pass} /> : <Student onsendval={handlechildval} />
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
    },
    info: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    infoalign: {
        flexDirection: 'row',
        paddingTop: 25
    },
    hidden:{
        visible:false
    },
    visibleme:{
        visible:true
    }
})





export default Studentinfo