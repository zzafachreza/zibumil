import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Animated, View, Image, ScrollView, ActivityIndicator, TouchableOpacity, BackHandler, Alert, Linking } from 'react-native';
import { fonts, windowWidth, colors, windowHeight, MyDimensi } from '../../utils';
import { MyInput, MyGap, MyButton } from '../../components';
import axios from 'axios';
import { apiURL, api_token, MYAPP, storeData } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';
import { TouchableNativeFeedback } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
export default function Login({ navigation }) {

  const [kirim, setKirim] = useState({
    api_token: api_token,
    telepon: null,
    password: null
  });
  const [loading, setLoading] = useState(false);

  const [comp, setComp] = useState({});

  const card = new Animated.Value(-30);
  const img = new Animated.Value(-20);




  const masuk = () => {


    if (kirim.telepon == null && kirim.password == null) {
      Alert.alert(MYAPP, 'telepon dan Password tidak boleh kosong !');
    } else if (kirim.telepon == null) {
      Alert.alert(MYAPP, 'telepon tidak boleh kosong !');
    } else if (kirim.password == null) {
      Alert.alert(MYAPP, 'Password tidak boleh kosong !');
    } else {


      setLoading(true);
      console.log(kirim);

      axios
        .post(apiURL + 'login', kirim)
        .then(res => {
          setLoading(false);
          console.log(res.data);
          if (res.data.status == 404) {
            showMessage({
              type: 'danger',
              message: res.data.message
            })
          } else {
            storeData('user', res.data.data);
            navigation.replace('Home')
          }
        });



    }




  }

  useEffect(() => {
    Animated.timing(card, {
      toValue: 1,
      duration: 850,
      useNativeDriver: false,
    }).start();
    Animated.timing(img, {
      toValue: 30,
      duration: 850,
      useNativeDriver: false,
    }).start();
    axios.post(apiURL + 'company').then(res => {
      setComp(res.data.data);
    })

  }, []);

  return (
    <LinearGradient colors={[colors.primary, colors.secondary]} style={{
      flex: 1,
    }}>
      <ScrollView style={{ flex: 1, position: 'relative' }}>




        <View style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Animated.Image source={require('../../assets/logo.png')} style={{
            marginTop: img,
            width: windowWidth / 1.8,
            height: windowWidth / 1.8,
            resizeMode: 'contain'
          }} />

        </View>


        <Animated.View style={{
          padding: 20,
          flex: 1, margin: 10,
          bottom: card,
          borderRadius: 10,
        }}>
          <Text style={{
            fontSize: MyDimensi,
            fontFamily: fonts.primary[800],
            color: colors.white,
          }}>Selamat Datang</Text>
          <Text style={{
            fontSize: MyDimensi / 2,
            fontFamily: fonts.primary[400],
            color: colors.white,
            marginBottom: 10,
          }}>Silahkan login terlebih dahulu</Text>
          <MyInput keyboardType='phone-pad' label="Nomor Telepon" onChangeText={val => setKirim({
            ...kirim,
            telepon: val
          })}
            iconname="call" placeholder="Masukan nomor telepon" />
          <MyGap jarak={10} />
          <MyInput
            onChangeText={val => setKirim({
              ...kirim,
              password: val
            })}
            secureTextEntry={true}
            label="Kata Sandi"
            iconname="lock-closed"
            placeholder="Masukan kata sandi"
          />
          <TouchableOpacity onPress={() => {
            let urlWA = 'https://wa.me/' + comp.tlp + `?text=Hallo admin saya lupa password . . .`;
            Linking.openURL(urlWA)
          }} style={{
            marginTop: 10,
          }}>
            <Text style={{
              textAlign: 'right',
              fontFamily: fonts.secondary[600],
              color: colors.white,
              fontSize: MyDimensi / 2
            }}>Lupa password ?</Text>
          </TouchableOpacity>
          <MyGap jarak={40} />
          {!loading &&




            <>
              <MyButton
                onPress={masuk}
                title="Masuk"
                Icons="log-in-outline"
              />
              <TouchableWithoutFeedback onPress={() => navigation.navigate('Register')}>
                <View style={{
                  marginTop: 10,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Text style={{
                    fontSize: MyDimensi / 2,
                    fontFamily: fonts.secondary[400],
                    textAlign: 'center',
                    color: colors.white
                  }}>Belum memiliki Akun ? <Text style={{
                    fontSize: MyDimensi / 2,
                    fontFamily: fonts.secondary[600],
                    textAlign: 'center',
                    color: colors.primary
                  }}>Daftar disini</Text></Text>
                </View>
              </TouchableWithoutFeedback>
            </>


          }



        </Animated.View>


        {loading && <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>}
      </ScrollView>
    </LinearGradient>



  );
}

const styles = StyleSheet.create({});
