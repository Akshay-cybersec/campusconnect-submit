import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Aboutus({navigation}) {
  return (

            <View style={{ flex: 1, backgroundColor: COLORS.appcol }}>
                <StatusBar
                    backgroundColor="transparent"
                    translucent={true}
                />
                <Toptitlebar />
                <View style={{ flex: 5, backgroundColor: 'white', borderTopRightRadius: 17, borderTopLeftRadius: 17, paddingHorizontal: 15, alignItems: 'center' }}>
                    <View style={{ width: '85%', flex: 1 }}>
                        <View style={{ flex: 1, flexDirection: 'row', borderWidth: 2, borderRadius: 7, borderColor: 'black', marginVertical: 20, justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <View>
                                <Ionicons name='person' size={24} color='black' />
                            </View>
                            <Text style={{ fontWeight: 'bold' }}>{data.roll_no}</Text>
                            <View>
                                <Text style={{ fontWeight: 'bold' }}>{data.branch_name}</Text>
                            </View>
                            <View>
                                <Text style={{ fontWeight: 'bold' }}>{data.name}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 5, width: '85%' }}>
                        <View style={{ flex: 1, alignContent: 'flex-start' }}>
                            <View style={style.infoalign}>
                                <Text style={style.info}>Enrollment no. : </Text>
                                <Text>{data.enr_no}</Text>
                            </View>
                            <View style={style.infoalign}>
                                <Text style={style.info}>Student ph.no. :  </Text>
                                <Text>{data.phno}</Text>
                            </View>
                            <View style={style.infoalign}>
                                <Text style={style.info}>Parent’s ph.no. :   </Text>
                                <Text>{data.parents_phno}</Text>
                            </View>
                            <View style={style.infoalign}>
                                <Text style={style.info}>Address :  </Text>
                                <View>
                                    <Text>{data.address}</Text>
                                    <Text>{data.address}</Text>
                                </View>
                            </View>
                            <View style={style.infoalign}>
                                <Text style={style.info}>Previous Semester:   </Text>
                                <Text style={{ color: 'green', fontSize: 20 }}>{data.percentage}</Text>
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
  )
}

const styles = StyleSheet.create({})