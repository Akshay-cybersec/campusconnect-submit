import { Text, View, StyleSheet, Image, TouchableOpacity,StatusBar, Alert } from 'react-native'
import logo from '../images/logo.png'
import { TextInput as MyInput, DefaultTheme } from 'react-native-paper';
import { COLORS } from '../universal/color';
import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from '@firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { mainurl } from '../universal/appurls';

const customTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0C353C',
        background: 'rgba(12, 53, 60, 0.3)',
    },
};



const Login = ({navigation}) => {

    const [hidepass,setHidepass]=useState(true);
    const [Email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    const [saveloggedin,Setsaveloggedin]=useState(false)
    const handellogin = async () => {
        if(Email=="" || password==""){
            Alert.alert("Alert","Please Enter username/password");
            return
        }
        await signInWithEmailAndPassword(auth, Email, password)
      .then((userCredential) => {
        console.log("user data,", userCredential.user);
        const user = userCredential.user;
        const name =user.email
        let sendname=name.slice(0,2).toUpperCase()
        const data ={
            'loggedin':true,
            'username':sendname,
            'email':name
        }
        const storeData = async () => {
            try {
              await AsyncStorage.setItem("logindata",JSON.stringify(data));
            } catch (error) {
            }
          };
          storeData();
          navigation.navigate('find')
        
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert("My Error,", errorMessage);
      });
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
                    <Text style={{ fontSize: 30, color: 'white',fontFamily:'Sahitya-Regular'}}>{mainurl.appname}</Text>
                    <Text style={{ color: 'white',fontFamily:'Inter-Black' }} >{mainurl.appslogan}</Text>
                </View>
            </View>
            <View style={{ flex: 3, backgroundColor: 'white', borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                <View style={{ flex: 1, backgroundColor: 'white', marginHorizontal: 20, alignItems: 'center' }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' ,flex:0.5,paddingTop:10,fontFamily:'Inter-Bold'}}>Login</Text>
                    <View style={{ width: '100%', flex: 3, justifyContent: 'space-evenly' }}>
                        <View>
                            <Text style={{ fontSize: 15 }}>Email</Text>
                            <MyInput
                            placeholder='Enter Your Email'
                                mode="outlined"
                                theme={customTheme}
                                onChangeText={(value)=>SetEmail(value)}
                            />
                        </View>
                        <View>
                            <Text style={{ fontSize: 15 }}>Password</Text>
                            <MyInput 
                            placeholder='Enter Your Password'
                                secureTextEntry={hidepass}
                                right={<MyInput.Icon icon="eye" onPress={()=>setHidepass(!hidepass)}/>}
                                mode="outlined"
                                theme={customTheme}   
                                onChangeText={(value)=>SetPassword(value)}                        
                            />
                        </View>
                        <View style={{ width: '100%', alignItems: 'flex-end' }}>
                            <TouchableOpacity>
                                <Text>Forget Password ?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ width: '80%', backgroundColor: '', flex: 1, backgroundColor: '' }}>
                        <TouchableOpacity style={style.buttonstyle} onPress={()=>handellogin()}>
                            <Text style={{color:'white'}}>Log in</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1,alignItems:'center'}}>
                        <Text style={{color:COLORS.disablecolor}}>Doesn’t have an account yet?</Text>
                        <TouchableOpacity onPress={()=>navigation.navigate("signup")}><Text style={{fontSize:15}}>Sign Up</Text></TouchableOpacity>
                        
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

export default Login;