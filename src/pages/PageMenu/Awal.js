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

export default function Awal({ navigation, route }) {


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
            setLoading(false);
        })
    }, [])

    return (
        <LinearGradient colors={[colors.primary, colors.secondary]} style={{
            flex: 1,
        }}>
            <MyHeader judul="Data Awal Ibu Hamil" onPress={() => navigation.goBack()} />
            {!loading &&

                <ScrollView showsVerticalScrollIndicator={false} style={{
                    paddingHorizontal: 20,
                }}>

                    <Text style={{
                        marginTop: 20,
                        fontSize: MyDimensi / 1.4,
                        fontFamily: fonts.primary[800],
                        color: colors.white,
                    }}>Formulir Data Awal Ibu Hamil</Text>
                    <Text style={{
                        marginBottom: 20,
                        fontSize: MyDimensi / 2,
                        fontFamily: fonts.primary[400],
                        color: colors.white,
                    }}>Silahkan isi form di bawah dengan benar</Text>

                    <MyCalendar iconname="calendar-outline" label="Tanggal Awal Kehamilan" value={kirim.tanggal_hamil} onDateChange={x => {
                        setKirim({
                            ...kirim,
                            tanggal_hamil: x
                        })
                    }} />
                    <MyGap jarak={10} />
                    <MyInput label="Nama Ibu Hamil" placeholder="Nama ibu hamil" iconname="person-outline" value={kirim.nama_ibu} onChangeText={x => setKirim({ ...kirim, nama_ibu: x })} />
                    <MyGap jarak={10} />
                    <MyInput label="Usia Ibu Hamil" keyboardType='number-pad' iconname="ribbon-outline" value={kirim.usia_ibu}
                        onChangeText={x => setKirim({ ...kirim, usia_ibu: x })} />
                    <MyGap jarak={10} />
                    <MyInput label="Paritas (Jumlah Kehamilan)" keyboardType='number-pad' iconname="options-outline" value={kirim.paritas}
                        onChangeText={x => setKirim({ ...kirim, paritas: x })} />
                    <MyGap jarak={10} />
                    <MyInput label="Berat Badan Ibu Hamil (Kg)" keyboardType='number-pad' iconname="options-outline" value={kirim.berat}
                        onChangeText={x => setKirim({ ...kirim, berat: x })} />
                    <MyGap jarak={10} />
                    <MyInput label="Tinggi Badan Ibu Hamil (cm)" keyboardType='number-pad' iconname="options-outline" value={kirim.tinggi}
                        onChangeText={x => setKirim({ ...kirim, tinggi: x })} />
                    <MyGap jarak={10} />
                    <MyInput label="Pekerjaan Ibu Hamil" placeholder="Pekerjaan ibu hamil" iconname="options-outline" value={kirim.pekerjaan}
                        onChangeText={x => setKirim({ ...kirim, pekerjaan: x })} />
                    <MyGap jarak={10} />
                    <MyInput label="Pendidikan Ibu Hamil" placeholder="Pendidikan ibu hamil" iconname="options-outline" value={kirim.pendidikan}
                        onChangeText={x => setKirim({ ...kirim, pendidikan: x })} />
                    <MyGap jarak={10} />
                    <MyInput label="Alamat Ibu Hamil" placeholder="Alamat ibu hamil" iconname="options-outline" value={kirim.alamat}
                        onChangeText={x => setKirim({ ...kirim, alamat: x })} />
                    <MyGap jarak={10} />
                    <MyInput keyboardType='phone-pad' label="Nomor Telepon Ibu Hamil" placeholder="Alamat ibu hamil" iconname="options-outline" value={kirim.telepon_ibu}
                        onChangeText={x => setKirim({ ...kirim, telepon_ibu: x })} />
                    <MyGap jarak={10} />
                    <MyCalendar iconname="calendar-outline" label="Tanggal Pengambilam Data" value={kirim.tanggal_ambil} onDateChange={x => {
                        setKirim({
                            ...kirim,
                            tanggal_ambil: x
                        })
                    }} />
                    <MyGap jarak={20} />
                    {loading && <ActivityIndicator color={colors.primary} size="large" />}

                    {!loading && <MyButton warna={colors.primary} colorText={colors.white} iconColor={colors.white} onPress={sendServer} title="Simpan Perubahan" Icons="download-outline" />}
                    <MyGap jarak={20} />
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