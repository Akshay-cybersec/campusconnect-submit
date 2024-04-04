import { View, Text, StatusBar, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../universal/color'
import { TextInput as MyInput, DefaultTheme, RadioButton } from 'react-native-paper';
import { ScrollView } from 'react-native';
import Toptitlebar from './toptitlebar';
import { mainurl } from '../universal/appurls';


const customTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0C353C',
        background: 'rgba(12, 53, 60, 0.3)',
    },
};

const Addrecord = ({ navigation }) => {
    const Record = () => {
        const [name, setName] = useState("")
        const [rollno, setRollno] = useState("")
        const [branch, setBranch] = useState("")
        const [percentage, setPercentage] = useState("")
        const [address, setAddress] = useState("")
        const [enroll, setEnroll] = useState("")
        const [email, setEmail] = useState("")
        const [phone, setPhone] = useState("")
        const [parentsphone, setparentsphone] = useState("")
        const [checked, setChecked] = useState(false)
        const validate = () => {
            if (name == "") {
                Alert.alert("Alert", "Please enter Name");
                return;
            }
            if (rollno == "") {
                Alert.alert("Alert", "Please enter (Valid) Rollno");
                return;
            }
            if (branch == "") {
                Alert.alert("Alert", "Please enter Branch")
                return;
            }
            if (percentage == "") {
                Alert.alert("Alert", "Please enter Percentage")
                return;
            }
            if (address == "") {
                Alert.alert("Alert", "Please enter Address")
                return;
            }
            if (enroll == "") {
                Alert.alert("Alert", "Please enter Enrollment no")
                return;
            }
            if (email == "") {
                Alert.alert("Alert", "Please enter Email")
                return;
            }
            if (phone == "" || phone.length > 10 || phone.length < 10) {
                Alert.alert("Alert", "Please enter 10 digit phone number")
                return;
            }
            if (parentsphone == "" || parentsphone.length > 10 || parentsphone.length < 10) {
                Alert.alert("Alert", "Please enter 10 digit Parents Phone No")
                return;
            }
            adddata()
            return true;
        }

        const adddata = async () => {
            try {
                const url = mainurl.appurl+"/campusconnectpost/"
                let request = await fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "name": name,
                        "roll_no": rollno,
                        "enr_no": enroll,
                        "phno": phone,
                        "parents_phno": parentsphone,
                        "addr": address,
                        "branch": branch.toUpperCase(),
                        "percentage": percentage,
                        "email": email,
                        "kt": checked,
                        "chatid": ""
                    })
                })
                if (request.status == 200) {
                    msg = rollno + " Added to Records";
                    Alert.alert("Congratulations", msg);
                }
                else if (request.status == 409) {
                    // Duplicate roll number error
                    const errorData = await request.json();
                    Alert.alert("Error", errorData.error);
                } else {
                    // Other server error
                    Alert.alert("Error", errorData.error);
                }
            } catch (error) {
                // Network error
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
                        <Text style={{ fontSize: 20, fontWeight: '700', textAlign: 'center' ,fontFamily:'Inter-Bold'}}>Add student record</Text>
                    </View>
                    <View style={{ flex: 6, width: "90%", marginBottom: 1 }}>
                        <ScrollView style={{}}>
                            <View style={style.innerbox}>
                                <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Name</Text>
                                <MyInput
                                    placeholder='Enter your name'
                                    mode="outlined"
                                    theme={customTheme}
                                    style={style.input}
                                    onChangeText={(value) => setName(value)}
                                />
                            </View>
                            <View style={style.innerbox}>
                                <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Roll Number</Text>
                                <MyInput
                                    placeholder='Enter your roll no'
                                    mode="outlined"
                                    theme={customTheme}
                                    style={style.input}
                                    onChangeText={(value) => setRollno(value)}
                                />
                            </View>
                            <View style={style.innerbox}>
                                <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Email</Text>
                                <MyInput
                                    placeholder='Enter your Email'
                                    mode="outlined"
                                    theme={customTheme}
                                    style={style.input}
                                    onChangeText={(value) => setEmail(value)}
                                />
                            </View>
                            <View style={style.innerbox}>
                                <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Enrollment No.</Text>
                                <MyInput
                                    placeholder='Enter your enrollment no'
                                    mode="outlined"
                                    theme={customTheme}
                                    style={style.input}
                                    onChangeText={(value) => setEnroll(value)}
                                />
                            </View>
                            <View style={style.innerbox}>
                                <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Branch</Text>
                                <MyInput
                                    placeholder='Enter your branch'
                                    mode="outlined"
                                    theme={customTheme}
                                    style={style.input}
                                    onChangeText={(value) => setBranch(value)}
                                />
                            </View>
                            <View style={style.innerbox}>
                                <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Percentage</Text>
                                <MyInput
                                    placeholder='Enter your Percentage'
                                    mode="outlined"
                                    theme={customTheme}
                                    style={style.input}
                                    onChangeText={(value) => setPercentage(value)}
                                />
                            </View>
                            <View style={style.innerbox}>
                                <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Phone No.</Text>
                                <MyInput
                                    placeholder='Enter your phone no'
                                    mode="outlined"
                                    theme={customTheme}
                                    style={style.input}
                                    onChangeText={(value) => setPhone(value)}
                                />
                            </View>
                            <View style={style.innerbox}>
                                <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Parents Ph.No.</Text>
                                <MyInput
                                    placeholder='Enter your parents phone no'
                                    mode="outlined"
                                    theme={customTheme}
                                    style={style.input}
                                    onChangeText={(value) => setparentsphone(value)}
                                />
                            </View>
                            <View style={style.innerbox}>
                                <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Address</Text>
                                <MyInput
                                    placeholder='Enter your address'
                                    mode="outlined"
                                    theme={customTheme}
                                    style={[{ borderWidth: 0.1, fontSize: 14, paddingHorizontal: 8, marginTop: 10, paddingVertical: 20 }]}
                                    multiline
                                    numberOfLines={12}
                                    onChangeText={(value) => setAddress(value)}
                                />
                            </View>
                            <View style={{ paddingBottom: 25 }}>
                                <View style={style.radiostyle}>
                                    <RadioButton
                                        value="first"
                                        status={checked === true ? 'checked' : 'unchecked'}
                                        onPress={() => setChecked(true)}
                                        theme={customTheme}

                                    />
                                    <Text>Have ATKT</Text>
                                </View>
                                <View style={style.radiostyle}>
                                    <RadioButton
                                        value="second"
                                        status={checked === false ? 'checked' : 'unchecked'}
                                        onPress={() => setChecked(false)}
                                        theme={customTheme}
                                    />
                                    <Text >Dont have ATKT</Text>
                                </View>
                            </View>

                            <View style={{ width: '100%' }}>
                                <TouchableOpacity style={style.buttonstyle} onPress={() => { validate() }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Add Student Details</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ paddingTop: '6%' }}>
                                <Text></Text>
                            </View>

                        </ScrollView>
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
        justifyContent: 'flex-start',
        paddingBottom: 16
    },
    radiostyle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
})





export default Addrecord