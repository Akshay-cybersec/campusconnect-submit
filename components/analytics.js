import { View, Text, Image, StatusBar, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS } from '../universal/color'
import { TextInput as MyInput, DefaultTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toptitlebar from './toptitlebar';
import axios from "axios"
import { mainurl } from '../universal/appurls';

const customTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0C353C',
        background: 'rgba(12, 53, 60, 0.3)',
    },
};

const Analytics = ({ navigation }) => {
    const [pass, Setpass] = useState(0);
    const handlechildval = (val) => {
        Setpass(val);
    }
    const [appscreen, Setappscreen] = useState(false);
    const Branch = ({ onsendval }) => {
        const [roll, SetRoll] = useState(0);
        const validate=()=>{
            if(roll==""){
                Alert.alert("Opps!","Please Enter branch!!");
                return false;
            }
            else{
                return true;
            }
            
        }
        const handlevalue = () => {
            if(validate()==true){
                if(roll.length<5){
                    Alert.alert("Alert","Enter valid branch");
                    return;
                }
                Setappscreen(true);
                onsendval(roll);
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
                        <Text style={{ fontSize: 20, fontWeight: '700', textAlign: 'center',fontFamily:'Inter-Bold'}}>Analytics</Text>
                    </View>
                    <View style={{ width: '85%', flex: 3, }}>
                        <View style={{ flex: 0 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Enter Branch :</Text>
                            <Text>(for ex: tyco1, tyco2, etc)</Text>
                        </View>
                        <MyInput
                            placeholder='Enter the branch for attendance'
                            mode="outlined"
                            theme={customTheme}
                            style={style.input}
                            onChangeText={(val) => SetRoll(val)}
                        />
                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ width: '90%', fontSize: 15 }}>Get a comprehensive list of <Text style={{ fontWeight: 'bold' }}>top - performing students.</Text></Text>
                        </View>
                    </View>
                    <View style={{ width: '80%', flex: 1 }}>
                        <TouchableOpacity style={style.buttonstyle} onPress={() => { handlevalue() }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Get Details</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    const BranchResult = (props) => {
        const [data, Setdata] = useState("");
        const [ktstud, SetKtstud] = useState(null);
        const [count, SetCount] = useState(null);
        const fetchapi = async () => {
            let str = (props.val).toUpperCase()
            url = mainurl.appurl+"/api/v1/branch_top/" + str
            const response = await axios.get(url);
            console.log(response.length)
            Setdata(JSON.parse(JSON.stringify(response.data)));
            url = mainurl.appurl+"/api/v1/kt_record/" + str
            const response2 = await axios.get(url);
            SetKtstud(JSON.parse(JSON.stringify(response2.data)));
            url = mainurl.appurl+"/api/v1/total_count/" + str
            const response3 = await axios.get(url);
            SetCount(JSON.parse(JSON.stringify(response3.data)));
        }
        useEffect(() => {
            fetchapi();
        }, [])
        const pri = () => {
            console.log(data)
        }
        return (

            <View style={{ flex: 1, backgroundColor: COLORS.appcol }}>
                {data ? pri() : ""}
                <StatusBar
                    backgroundColor="transparent"
                    translucent={true}
                />
                <Toptitlebar navigation={navigation}/>
                <View style={{ flex: 5, backgroundColor: 'white', borderTopRightRadius: 17, borderTopLeftRadius: 17, paddingHorizontal: 15, alignItems: 'center' }}>
                    <View style={{ width: '85%', flex: 0.5 }}>
                        <View style={{ flex: 1, flexDirection: 'row', marginVertical: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={style.info}>Branch : </Text>
                            <Text style={style.info}>{data ? data[0].branch : "null"} </Text>
                        </View>
                    </View>
                    <View style={{ flex: 5, width: '90%' }}>
                        <View style={{ flex: 1.7, alignContent: 'flex-start' }}>
                            <Text style={style.info}>Toppers:</Text>
                            <View style={style.infoalign}>
                                <MaterialCommunityIcons name='crown' size={28} color='black' style={{ paddingRight: 12 }} />
                                <Text style={style.info}>{data ? data[0].percentage + "%" : "null"} </Text>
                                <Text style={style.info}>{data ? data[0].name : "null"}</Text>
                            </View>
                            <View style={style.infoalign}>
                                <MaterialCommunityIcons name='crown' size={28} color='black' style={{ paddingRight: 12 }} />
                                <Text style={style.info}>{data ? data[1].percentage + "%" : "null"} </Text>
                                <Text style={style.info}>{data ? data[1].name : "null"}</Text>
                            </View>
                            <View style={style.infoalign}>
                                <MaterialCommunityIcons name='crown' size={28} color='black' style={{ paddingRight: 12 }} />
                                <Text style={style.info}>{data ? data[2].percentage + "%" : "null"} </Text>
                                <Text style={style.info}>{data ? data[2].name : "null"}</Text>
                            </View>
                            <View style={style.infoalign}>
                                <Text style={style.info}>Total students appeared :   </Text>
                                <Text style={style.info}>{count?count.count:"null"}</Text>
                            </View>
                            <View style={style.infoalign}>
                                <Text style={style.info}>Number of students who passed :   </Text>
                                <Text style={style.info}>{count?(count.count-(ktstud.length)):"null"}</Text>
                            </View>
                            <View style={style.infoalign}>
                                <Text style={style.info}>Number of students who received KT:   </Text>
                                <Text style={style.info}>{ktstud?ktstud.length:"null"}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', paddingTop: 25 }}>
                            <View style={{ width: '80%', flex: 1 }}>
                                <Text style={{ fontWeight: 'bold' }}>Name of students who received KT:</Text>
                                <ScrollView style={{ borderWidth: 1, paddingVertical: 5, paddingHorizontal: 5 }} persistentScrollbar={true}>
                                    {ktstud?ktstud.map((item, index) => (
                                        <Text key={index}><Icon name="user" size={15} color="black" />{"     "+item.roll_no} - {item.name}</Text>
                                    )):""}
                                </ScrollView>
                            </View>
                        </View>

                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', width: '80%' }}>
                        <View style={{}}>
                            <TouchableOpacity style={style.buttonstyle} onPress={() => Setappscreen(false)}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Search For Another Branch</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    return (
        appscreen ? <BranchResult val={pass} /> : <Branch onsendval={handlechildval} />
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
    }
})





export default Analytics