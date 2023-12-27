import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    Button,
    View,
    Image,
    ScrollView,
    ImageBackground,
    Dimensions,
    Switch,
    Animated,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { colors } from '../../utils/colors';
import { MyDimensi, fonts } from '../../utils/fonts';
import { MyInput, MyGap, MyButton, MyPicker, MyCalendar } from '../../components';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { apiURL, api_token, MYAPP } from '../../utils/localStorage';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

export default function Register({ navigation }) {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [loading, setLoading] = useState(false);
    const [valid, setValid] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const [cek, setCek] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const validate = text => {
        // console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            // console.log('nama_lengkap is Not Correct');
            setData({ ...data, nama_lengkap: text });
            setValid(false);
            return false;
        } else {
            setData({ ...data, nama_lengkap: text });
            setValid(true);
            // console.log('nama_lengkap is Correct');
        }
    };

    const [sama, setSama] = useState(true)

    const [data, setData] = useState({
        api_token: api_token,
        nama_lengkap: '',
        telepon: '',
        password: '',
        repassword: '',


    });

    const simpan = () => {
        if (
            data.nama_lengkap.length === 0 &&
            data.telepon.length === 0 &&
            data.password.length === 0

        ) {
            showMessage({
                message: 'Formulir pendaftaran tidak boleh kosong !',
            });
        } else if (data.nama_lengkap.length === 0) {
            showMessage({
                message: 'Masukan nama kamu',
            });
        }

        else if (data.telepon.length === 0) {
            showMessage({
                message: 'Masukan nomor telepon',
            });
        } else if (data.password.length === 0) {
            showMessage({
                message: 'Masukan kata sandi kamu',
            });
        } else {

            console.log(data);

            setLoading(true);
            axios
                .post(apiURL + 'register', data)
                .then(res => {
                    console.warn(res.data);
                    setLoading(false);
                    if (res.data.status == 404) {
                        showMessage({
                            type: 'danger',
                            message: res.data.message
                        })
                    } else {
                        showMessage({
                            type: 'success',
                            message: res.data.message
                        })

                        navigation.navigate('Login');
                    }


                });
        }
    };

    const [desa, setDesa] = useState([]);

    const img = new Animated.Value(60);

    useEffect(() => {
        Animated.timing(img, {
            toValue: 30,
            duration: 850,
            useNativeDriver: false,
        }).start();

    }, [])
    return (
        <>
            <LinearGradient colors={[colors.primary, colors.secondary]} style={{
                flex: 1,
            }}>
                {/* <Switch onValueChange={toggleSwitch} value={isEnabled} /> */}
                <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Animated.Image source={require('../../assets/logo.png')} style={{
                            marginTop: img,
                            width: windowWidth / 3,
                            height: windowWidth / 3,
                            resizeMode: 'contain'
                        }} />

                    </View>



                    <View style={{
                        paddingHorizontal: 10,
                    }}>
                        <Text style={{
                            fontSize: MyDimensi,
                            fontFamily: fonts.primary[800],
                            color: colors.white,
                        }}>Daftar</Text>
                        <Text style={{
                            fontSize: MyDimensi / 2,
                            fontFamily: fonts.primary[400],
                            color: colors.white,
                            marginBottom: 10,
                        }}>Silahkan daftar agar bisa login</Text>
                        <MyInput
                            placeholder="Masukan nama lengkap"
                            label="Nama Lengkap"
                            iconname="person-outline"
                            value={data.nama_lengkap}
                            onChangeText={value =>
                                setData({
                                    ...data,
                                    nama_lengkap: value,
                                })
                            }
                        />
                        <MyGap jarak={10} />



                        <MyInput
                            placeholder="Masukan nomor telepon"
                            label="Telepon"
                            iconname="call-outline"
                            keyboardType="phone-pad"
                            value={data.telepon}
                            onChangeText={value =>
                                setData({
                                    ...data,
                                    telepon: value,
                                })
                            }
                        />









                        <MyGap jarak={10} />
                        <MyInput
                            placeholder="Masukan kata sandi"
                            label="Kata Sandi"
                            iconname="lock-closed-outline"
                            secureTextEntry
                            value={data.password}
                            onChangeText={value =>
                                setData({
                                    ...data,
                                    password: value,
                                })
                            }
                        />
                        <MyGap jarak={10} />
                        <MyInput
                            borderColor={sama ? colors.primary : colors.danger}
                            borderWidth={sama ? 0 : 1}
                            placeholder="Masukan ulang kata sandi"
                            label="Masukan ulang kata sandi"
                            iconname="lock-closed-outline"
                            secureTextEntry
                            value={data.repassword}
                            onChangeText={value => {

                                if (value !== data.password) {
                                    setSama(false)
                                } else {
                                    setSama(true)
                                }

                                setData({
                                    ...data,
                                    repassword: value,
                                })
                            }

                            }
                        />
                    </View>
                    <MyGap jarak={20} />




                    {!loading &&
                        <>
                            <MyButton


                                title="Daftar"
                                Icons="log-in"
                                onPress={simpan}
                            />

                        </>
                    }

                    <MyGap jarak={10} />
                    {loading && <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <ActivityIndicator color={colors.primary} size="large" />
                    </View>}
                </ScrollView>

            </LinearGradient>

        </>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        padding: 10,
    },
    image: {
        width: 620 / 4,
        height: 160 / 4,
    },
});
