import { Text, View, Image, BackHandler, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useEffect } from 'react';
import Studentinfo from './studentinfo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../universal/color';
import Analytics from './analytics';
import Message from './message';
import Addrecord from './addrecord';
import Discardrec from './discardrec';
import Test from './test';



const Tab = createBottomTabNavigator();

const Findstud = ({ navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => backHandler.remove()
  }, [])
  return (
    <Tab.Navigator initialRouteName='studentinfo' screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveBackgroundColor:COLORS.buttoncolor,
      tabBarStyle: { backgroundColor: '#0C353C', height: '7%' },
    }} >
      <Tab.Screen
        name="addstudent"
        component={Addrecord}
        options={{
          tabBarIcon: () => (
            <View>
              <Ionicons name='person-add-sharp' size={28} color='white' />
            </View>
          ),

        }}
      />
      <Tab.Screen
        name="discardrec"
        component={Discardrec}
        options={{
          tabBarIcon: () => (
            <View>
              <Ionicons name='trash-outline' size={28} color='white' />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="studentinfo"
        component={Studentinfo}
        options={{
          tabBarIcon: () => (
            <View>
              <Ionicons name='search' size={34} color='white' />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="next2"
        component={Message}
        options={{
          tabBarIcon: () => (
            <View>
              <MaterialCommunityIcons name="message-text" size={28} color="white" />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="next"
        component={Analytics}
        options={{
          tabBarIcon: () => (
            <View>
              <Ionicons name='bar-chart' size={28} color='white' />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="messsage"
        component={Test}
        options={{
          tabBarIcon: () => (
            <View>
              <MaterialCommunityIcons name='robot' size={28} color='white' />
            </View>
          ),
        }}
      />

    </Tab.Navigator>
  );
}

const Main = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Under Development</Text>
    </View>
  )
}

const style = StyleSheet.create({
  
})

export default Findstud