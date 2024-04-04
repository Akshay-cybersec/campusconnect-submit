import { Text, View, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native'
import { Button } from 'react-native-paper';
import logo from '../images/logo.png'
import person from '../images/person.png'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { mainurl } from '../universal/appurls';
import { useFonts } from 'expo-font';
import customfont from '../universal/customfont';

const Welcome = ({ navigation }) => {
    const [fontsLoaded] = useFonts({
        'Sahitya-Regular': customfont.sahityaRegular,
        'Sahitya-Bold': customfont.sahityaBold,
        'Inter-Black': customfont.interFont,
        'Inter-Bold': customfont.interBold,
        'Inter-Light': customfont.interLight,
    });
    const [data, SetData] = useState(null)
    useEffect(() => {
        retrieveData();
    }, [])
    useEffect(() => {
        if (data != null) {
            if (data.loggedin == true) {
                navigation.navigate('find')
            }
        }
    }, [data])
    const retrieveData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('logindata');
            if (jsonValue !== null) {
                SetData(JSON.parse(jsonValue));
                return data;
            } else {
                console.log('No data found');
                return null;
            }
        } catch (error) {
            console.error('Error retrieving data:', error);
            return null;
        }
    };
    return (
        <View style={{ flex: 1, backgroundColor: '#0C353C' }}>
            <StatusBar
                backgroundColor="transparent"
                translucent={true}
            />
            <View style={{ flex: 1, backgroundColor: '#0C353C' }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', height: '100%' }}>
                    <Image source={logo} style={{ height: 50, width: 50 }} />

                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 24, color: 'white',fontFamily:'Sahitya-Regular'}}>{mainurl.appname}</Text>
                        <Text style={{ color: 'white',fontFamily:'Inter-Black' }} >{mainurl.appslogan}</Text>
                    </View>
                </View>
            </View>
            <View style={{ flex: 5, borderTopLeftRadius: 17, borderTopRightRadius: 17, backgroundColor: 'white', alignItems: 'center' }}>
                <View style={{ flex: 1, marginVertical: 20 }}>
                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 26, fontWeight: 700 ,fontFamily:'Inter-Bold'}}>Welcome To</Text>
                            <Text style={{ fontSize: 26, fontWeight: 700 ,fontFamily:'Inter-Bold'}}>CampusConnect!</Text>
                        </View>
                        <Image source={person} style={{ height: 160, width: 125 }} />
                    </View>
                    <View style={{ flex: 2, alignItems: 'flex-start', marginHorizontal: 25 }}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 16 }}>
                                Let’s help teachers to manage student records
                                more effectively, and let them take attendance
                                digitally, view student’s information at a glance,
                                and send personalized messages, reminders,
                                and alerts to students on a single click.
                            </Text>
                        </View>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate("login")}>
                            <Button
                                icon={() => <Icon name="arrow-right" size={20} color="white" />}
                                mode="contained"
                                buttonColor="#F6AC3F"
                                textColor="white"
                                contentStyle={styles.buttonContent}
                                labelStyle={styles.buttonLabel}

                                style={{ borderWidth: 1, borderColor: 'black', fontSize: 15, borderRadius: 6 }}>
                                Let’s Get Started
                            </Button>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContent: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonLabel: {
        paddingLeft: 0,
        paddingRight: 20
    },
});

export default Welcome;