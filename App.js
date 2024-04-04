import React, { Component, useEffect, useState } from "react";
import Login from './components/login.js'
import Signup from './components/signup.js'
import welcome from './components/welcome.js'
import Findstud from './components/findstud.js'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudentinfoOutput from "./components/toptitlebar.js";
import AsyncStorage from '@react-native-async-storage/async-storage'
import aboutus from "./components/aboutus.js";
import Toptitlebar from "./components/toptitlebar.js";
import { useFonts } from 'expo-font';
import customfont from "./universal/customfont.js";

const Stack = createNativeStackNavigator();

const App = () => {
        const [fontsLoaded] = useFonts({
                'Sahitya-Regular': customfont.sahityaRegular,
                'Sahitya-Bold': customfont.sahityaBold,
                'Inter-Black': customfont.interFont,
                'Inter-Bold': customfont.interBold,
                'Inter-Light': customfont.interLight,
            });
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
                        } else {
                            console.log('No data found');
                        }
                    })
                    .catch(error => console.error('Error retrieving data:', error));
            }
        return (
                <NavigationContainer >
                        <Stack.Navigator initialRouteName={"welcome"} >
                                <Stack.Screen options={{
                                        headerShown: false, presentation: 'modal',
                                        animationTypeForReplace: 'push',
                                        animation: 'slide_from_right'
                                }} name="welcome" component={welcome} />
                                <Stack.Screen options={{
                                        headerShown: false, presentation: 'modal',
                                        animationTypeForReplace: 'push',
                                        animation: 'slide_from_right'
                                }} name="login" component={Login} />
                                <Stack.Screen options={{
                                        headerShown: false, presentation: 'modal',
                                        animationTypeForReplace: 'push',
                                        animation: 'slide_from_right'
                                }} name="signup" component={Signup} />
                                <Stack.Screen options={{
                                        headerShown: false, presentation: 'modal',
                                        animationTypeForReplace: 'push',
                                        animation: 'slide_from_right'
                                }} name="find" component={Findstud} />
                                <Stack.Screen options={{
                                        headerShown: false, presentation: 'modal',
                                        animationTypeForReplace: 'push',
                                        animation: 'slide_from_right'
                                }} name="studentinfooutput" component={StudentinfoOutput} />
                                <Stack.Screen options={{
                                        headerShown: false, presentation: 'modal',
                                        animationTypeForReplace: 'push',
                                        animation: 'slide_from_right'
                                }} name="aboutus" component={aboutus} />
                                <Stack.Screen options={{
                                        headerShown: false, presentation: 'modal',
                                        animationTypeForReplace: 'push',
                                        animation: 'slide_from_right'
                                }} name="toptitlebar" component={Toptitlebar} />
                        </Stack.Navigator>
                </NavigationContainer>
        );
}

export default App;