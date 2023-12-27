import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Linking,
    Alert,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { windowWidth, fonts, MyDimensi } from '../../utils/fonts';
import { apiURL, getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar } from '../../utils/localStorage';
import { colors } from '../../utils/colors';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { TouchableWithoutFeedback } from 'react-native';
import { FlatList } from 'react-native';
import { PermissionsAndroid } from 'react-native';

export default function BulanDetail({ navigation, route }) {
    const item = route.params;
    const awal = item.tanggal_awal;
    const end = moment(item.tanggal_awal).add(1, 'M').format('YYYY-MM-DD');
    const hari = moment(end).diff(awal, 'days');
    console.log(hari);
    const [data, setData] = useState([]);



    useEffect(() => {
        var arrData = [];
        for (let index = 0; index <= hari; index++) {
            arrData.push({
                no: index,
                tanggal: moment(awal).add(index, 'd').format('YYYY-MM-DD'),
                image: 'https://zavalabs.com/nogambar.jpg',
                keterangan: 'Belum'
            })
        }
        setData(arrData);
        requestCameraPermission();
    }, []);

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Cool Photo App Camera Permission',
                    message:
                        'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };




    return (
        <LinearGradient colors={[colors.primary, colors.secondary]} style={{
            flex: 1,
        }}>
            <MyHeader judul={"Bulan Ke - " + item.bulan} onPress={() => navigation.goBack()} />
            <ScrollView>
                <View style={{
                    padding: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: MyDimensi / 1.5,
                        color: colors.white,
                        textAlign: 'center'
                    }}>{moment(awal).format('DD MMMM YYYY')} - {moment(end).format('DD MMMM YYYY')}</Text>
                </View>
                <FlatList data={data} renderItem={({ item, index }) => {
                    return (
                        <View style={{
                            padding: 10,
                            backgroundColor: colors.secondary,
                            borderWidth: 1,
                            borderColor: colors.white,
                            margin: 10,
                            borderRadius: 10,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <View style={{
                                flex: 1
                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    fontSize: MyDimensi / 2,
                                    color: colors.white,
                                }}>Tanggal {moment(item.tanggal).format('DD MMMM YYYY')}</Text>
                                <Text style={{
                                    fontFamily: fonts.secondary[800],
                                    fontSize: MyDimensi / 2,
                                    color: item.keterangan == 'Sudah' ? colors.success : colors.white,
                                }}>{item.keterangan}</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableWithoutFeedback onPress={() => {
                                    launchCamera({
                                        includeBase64: true,
                                        quality: 1,
                                        mediaType: "photo",
                                        maxWidth: 200,
                                        maxHeight: 200
                                    }, response => {
                                        // console.log('All Response = ', response);
                                        if (!response.didCancel) {
                                            let tmp = [...data];
                                            tmp[index].keterangan = 'Sudah';
                                            tmp[index].image = `data:${response.type};base64, ${response.base64}`
                                            console.log(tmp[index]);
                                            setData(tmp);
                                        }

                                    });
                                }}>
                                    <Image source={{
                                        uri: item.image
                                    }} style={{
                                        width: MyDimensi / 0.5,
                                        height: MyDimensi / 0.5,
                                        borderRadius: 10,
                                    }} />
                                </TouchableWithoutFeedback>

                            </View>
                        </View>
                    )
                }} />
            </ScrollView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({})