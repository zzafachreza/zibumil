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

export default function Bulan({ navigation, route }) {


    const [kirim, setKirim] = useState({
        fid_user: route.params.id,
        tanggal_hamil: moment().format('YYYY-MM-DD'),
        nama_ibu: '',
        usia_ibu: '',
        paritas: '',
        berat: '',
        tinggi: '',
        pekerjaan: '',
        pendidikan: '',
        alamat: '',
        telepon_ibu: '',
        tanggal_ambil: moment().format('YYYY-MM-DD'),
    });
    const [loading, setLoading] = useState(false);
    const sendServer = () => {

        console.log(kirim);
        setLoading(true);
        axios.post(apiURL + 'hamil_update', kirim).then(res => {
            console.log(res.data)

            setLoading(false);

            if (res.data.status == 200) {
                Alert.alert(MYAPP, res.data.message);
                console.log(res.data.data);
                navigation.replace('Home');
            }
        }).finally(() => {
            setLoading(false);
        })
    }

    useEffect(() => {
        setLoading(true);
        axios.post(apiURL + 'hamil', {
            id: route.params.id,
        }).then(res => {
            console.log(res.data);
            setKirim(res.data.data);
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    return (
        <LinearGradient colors={[colors.primary, colors.secondary]} style={{
            flex: 1,
        }}>
            <MyHeader judul="Kepatuhan Konsumsi Tablet Tambah Darah" onPress={() => navigation.goBack()} />

            {!loading &&
                <ScrollView showsVerticalScrollIndicator={false} style={{
                    paddingHorizontal: 20,
                }}>

                    <Text style={{
                        marginTop: 20,
                        fontSize: MyDimensi / 1.4,
                        fontFamily: fonts.secondary[400],
                        color: colors.white,
                    }}>Tanggal Awal Kehamilan</Text>
                    <Text style={{
                        marginBottom: 20,
                        fontSize: MyDimensi,
                        fontFamily: fonts.secondary[600],
                        color: colors.white,
                    }}>{moment(kirim.tanggal_hamil).format('DD MMMM YYYY')}</Text>


                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => {
                        return (
                            <TouchableWithoutFeedback onPress={() => navigation.navigate('BulanDetail', {
                                fid_user: route.params.id,
                                tanggal_hamil: kirim.tanggal_hamil,
                                bulan: item,
                                tanggal_awal: moment(kirim.tanggal_hamil).add(item, 'M').format('YYYY-MM-DD')
                            })}>
                                <View style={{
                                    padding: 10,
                                    borderWidth: 1,
                                    borderColor: colors.border,
                                    backgroundColor: colors.secondary,
                                    marginVertical: 5,
                                    borderRadius: 10,
                                }}>
                                    <Text style={{
                                        fontFamily: fonts.secondary[800],
                                        color: colors.white,
                                        fontSize: MyDimensi / 1.5,
                                        textAlign: 'center'
                                    }}>Bulan {item}</Text>
                                    <Text style={{
                                        textAlign: 'center',
                                        color: colors.white,
                                        fontSize: MyDimensi / 3,
                                        fontFamily: fonts.secondary[400],
                                    }}>{moment(kirim.tanggal_hamil).add(item, 'M').format('DD MMMM YYYY')}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })}


                </ScrollView>
            }

            {loading &&
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator size="large" color={colors.white} />
                </View>
            }
        </LinearGradient >
    )
}

const styles = StyleSheet.create({})