import React, { useState } from 'react';
import { View, ScrollView, TextInput, Button, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import Toptitlebar from './toptitlebar';
import axios from 'axios';
import { COLORS } from '../universal/color';
import { mainurl } from '../universal/appurls';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ChatApp = ({ navigation }) => {
    const [databot, Setdatabot] = useState("");
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');

    const handleSend = async () => {
        if (inputText.trim() === '') return;
        const userMessage = { text: inputText, fromMe: true };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInputText('');
        try {
            console.log(userMessage.text)
            url = mainurl.appurl + "/api/v1/botmessage/" + userMessage.text
            const response = await axios.get(url);
            const data = Setdatabot((JSON.stringify(response.data)));
            console.log(response.data[0].text)
            const botMessage = { text: 'Bot: ' + response.data[0].text, fromMe: false };
            setMessages(prevMessages => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('There was a problem with the chatbot request:', error);
        }
    };



    return (
        <View style={{ flex: 1, backgroundColor: COLORS.appcol }}>
            <View style={{ height: "100%" }}>
                <Toptitlebar navigation={navigation} />
                
                <View style={{ flex: 0.5, justifyContent: 'flex-end' ,backgroundColor:'white'}}>
                    <View style={styles.robot}>
                        <MaterialCommunityIcons name='robot' size={28} color='black' style={{ paddingBottom: 8, paddingRight: 6 }} />
                        <Text style={{ fontWeight: 'bold' }}>Engage, explore, and evolve with our bot!</Text>
                    </View>
                </View>
                <View style={styles.container}>
                    <ScrollView style={styles.chatContainer} contentContainerStyle={styles.chatContent}>
                        {messages.map((message, index) => (
                            <View key={index} style={message.fromMe ? styles.myMessage : styles.otherMessage}>
                                <Text>{message.text}</Text>
                            </View>
                        ))}
                    </ScrollView>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.inputContainer}
                    >
                        <TextInput
                            style={styles.input}
                            value={inputText}
                            onChangeText={setInputText}
                            placeholder="Type a message..."
                            onSubmitEditing={handleSend}
                            returnKeyType="send"
                        />
                        <View style={{ width: '20%' }}>
                            <TouchableOpacity style={styles.buttonstyle} onPress={() => { handleSend() }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>send</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonstyle: {
        backgroundColor: '#F6AC3F',
        alignItems: 'center',
        paddingVertical: 8,
        borderRadius: 7,
        borderWidth: 1
    },
    robot: {
        display: 'flex',
        flexDirection: 'row',
        flex: 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(12, 53, 60, 0.3)",
        borderWidth: 1,
        borderRadius: 30,
        margin: 5,
        marginHorizontal: 10
    },
    container: {
        flex: 4,
        padding: 16,
        justifyContent: 'flex-end',
        backgroundColor:'white'

    },
    chatContainer: {
        flex: 1,
        marginBottom: 16,
    },
    chatContent: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    myMessage: {
        backgroundColor: COLORS.buttoncolor,
        color: 'white',
        alignSelf: 'flex-end',
        padding: 8,
        borderRadius: 8,
        marginBottom: 8,
    },
    otherMessage: {
        backgroundColor: '#E5E5EA',
        alignSelf: 'flex-start',
        padding: 8,
        borderRadius: 8,
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 16,
    },
    input: {
        flex: 1,
        marginRight: 8,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 15,
        height: 40,
        fontWeight: 'bold',
    },
});

export default ChatApp;
