import { Text, View, StyleSheet, Image, TouchableOpacity, Keyboard, StatusBar, Button, Alert } from 'react-native'
import { useEffect } from 'react';
import logo from '../images/logo.png'
import { TextInput as MyInput, DefaultTheme, Checkbox, Dialog } from 'react-native-paper';
import { COLORS } from '../universal/color';
import { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { mainurl } from '../universal/appurls';

const customTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0C353C', 
        background: 'rgba(12, 53, 60, 0.3)',
    },
};



const Signup = ({ navigation }) => {
    const [agree, setAgree] = useState(false);
    const [password, SetPassword] = useState('');
    const [cpassword, SetCpassword] = useState('');
    const [Email, SetEmail] = useState('');
    const [hidepass,setHidepass]=useState(true);
    const [chidepass,setcHidepass]=useState(true);


    const handleSignIn = async () => {
        await createUserWithEmailAndPassword(auth, Email, password)
            .then((userCredential) => {
                console.log("Succesfull", userCredential);
                Alert.alert("Alert","You have sign up successfully")
                navigation.navigate('login')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert("Alert",error.message)
                console.log('Error Code == ', errorCode)
                console.log('Error Message == ', errorMessage)
            });
    }
    const create = () => {
        const flag=1
        if(Email==""){
            Alert.alert("Alert","Please enter email")
            flag=0
        }
        else if (!Email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            Alert.alert("Alert","Please enter valid email \n(eg : test@gmail.com)")
            flag=0
        }
        else if(password!=cpassword){
            Alert.alert("Alert","Password and confirm password does not match")
            flag=0
        }
        else if(agree==false){
            Alert.alert("Alert","Password agree terms and conditions")
            flag=0
        }
        if (flag==1){
            handleSignIn();
        }
    }


    return (
        <View style={{ flex: 1, backgroundColor: COLORS.appcol }}>
            <StatusBar
                backgroundColor="transparent"
                translucent={true}
            />
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: '#0C353C', alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={logo} style={{ height: 70, width: 70 }} />
                    <Text style={{ fontSize: 30, color: 'white' ,fontFamily:'Sahitya-Regular'}}>{mainurl.appname}</Text>
                    <Text style={{ color: 'white',fontFamily:'Inter-Black' }} >{mainurl.appslogan}</Text>
                </View>
            </View>
            <View style={{ flex: 3, backgroundColor: 'white', borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                <View style={{ flex: 1, backgroundColor: 'white', marginHorizontal: 20, alignItems: 'center' }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', flex: 0.6, paddingTop: 10 ,fontFamily:'Inter-Bold'}}>Sign up</Text>
                    <View style={{ width: '100%', flex: 4, justifyContent: 'space-evenly' }}>
                        <View>
                            <Text style={{ fontSize: 15 }}>Email</Text>
                            <MyInput
                                placeholder='Enter Your Email'
                                mode="outlined"
                                theme={customTheme}
                                onChangeText={(value) => SetEmail(value)}
                            />
                        </View>
                        <View>
                            <Text style={{ fontSize: 15 }}>Password</Text>
                            <MyInput
                                placeholder='Enter Your password'
                                secureTextEntry={hidepass}
                                right={<MyInput.Icon icon="eye" onPress={()=>setHidepass(!hidepass)}/>}
                                mode="outlined"
                                theme={customTheme}
                                onChangeText={(value) => SetPassword(value)}
                            />
                        </View>
                        <View>
                            <Text style={{ fontSize: 15 }}>Confirm Password</Text>
                            <MyInput
                                placeholder='Enter Your password'
                                secureTextEntry={chidepass}
                                right={<MyInput.Icon icon="eye" onPress={()=>setcHidepass(!chidepass)}/>}
                                mode="outlined"
                                theme={customTheme}
                                onChangeText={(value) => SetCpassword(value)}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Checkbox
                                status={agree ? 'checked' : 'unchecked'}
                                color={COLORS.appcol}
                                onPress={() => setAgree(!agree)}
                            />
                            <TouchableOpacity onPress={() => setAgree(!agree)}>
                                <Text>I agree terms & conditions</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ width: '80%', backgroundColor: '', flex: 1, backgroundColor: '' }}>
                        <TouchableOpacity style={style.buttonstyle} onPress={()=>create()}>
                            <Text style={{ color: 'white' }}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ color: COLORS.disablecolor }}>Already have an account ?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("login")}><Text style={{ fontSize: 15 }}>Login Here</Text></TouchableOpacity>
                    </View>
                </View>
            </View>

        </View>
    );
}

const style = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 7,
        fontSize: 18,
        paddingHorizontal: 8,
        marginTop: 10,
        paddingVertical: 10
    },
    buttonstyle: {
        backgroundColor: '#F6AC3F',
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 20,
        borderWidth: 1
    }
})

export default Signup;