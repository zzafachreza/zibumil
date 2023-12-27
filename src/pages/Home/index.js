import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';
import 'moment/locale/id';
import MyCarouser from '../../components/MyCarouser';
import { Rating } from 'react-native-ratings';
import LinearGradient from 'react-native-linear-gradient';

export default function Home({ navigation, route }) {



  const [user, setUser] = useState({});
  const isFocus = useIsFocused();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [comp, setComp] = useState({});

  const _getTransaction = async () => {

    await getData('user').then(u => {
      setUser(u);
    })

    await axios.post(apiURL + 'company').then(res => {

      setComp(res.data.data);

    });

    await axios.post(apiURL + 'menu').then(res => {

      console.log(res.data);
      setData(res.data);

    });
  }


  useEffect(() => {
    if (isFocus) {
      _getTransaction();
    }
  }, [isFocus]);

  const __renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => navigation.navigate(item.modul, item)}>
        <View style={{
          flex: 1,
          padding: 10,
          borderWidth: 1,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: colors.secondary,
          // backgroundColor: colors.white,
          margin: 5,
          height: windowHeight / 8,
        }}>

          <Image source={{
            uri: item.image
          }} style={{
            // flex: 1,
            width: 40,
            height: 40,
            resizeMode: 'contain'
          }} />
          <Text style={{
            marginTop: 10,
            fontFamily: fonts.secondary[600],
            fontSize: 8,
            color: colors.secondary,
            textAlign: 'center'
          }}>{item.judul}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }


  return (

    <LinearGradient colors={[colors.white, colors.white]} style={{
      flex: 1,
    }}>






      {/* header */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: colors.secondary,
        padding: 10,
        height: windowHeight / 4,
      }}>

        <View style={{
          flex: 1,
        }}>
          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: 15,
            color: colors.white
          }}>Selamat datang,  </Text>
          <Text style={{
            fontFamily: fonts.secondary[800],
            fontSize: 15,
            color: colors.white
          }}>{user.nama_lengkap}</Text>
        </View>
        <Image source={require('../../assets/logo.png')} style={{
          width: 30,
          height: 60,
        }} />
      </View>
      {/* header */}



      <LinearGradient colors={[colors.secondary, colors.primary]} style={{
        flex: 1,
      }}>
        <View style={{
          marginTop: -100
        }}>
          <MyCarouser />
        </View>

        <View style={{
          flex: 1,
          justifyContent: 'center',
          padding: 20,
        }}>
          <View>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Awal', user)}>
              <LinearGradient colors={['#FF4D7C', '#FFBDBC']} style={{
                flexDirection: 'row',
                borderRadius: 10,
                alignItems: 'center',
                marginBottom: 10,
                padding: 10,
              }}>
                <View>
                  <Image source={require('../../assets/a1.png')} style={{
                    width: windowWidth / 5,
                    height: windowWidth / 5,
                  }} />
                </View>
                <Text style={{
                  flex: 1,
                  textAlign: 'center',
                  fontFamily: fonts.secondary[600],
                  fontSize: MyDimensi / 1.4,
                  color: colors.white,
                }}>Data Awal Ibu Hamil</Text>
              </LinearGradient>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Bulan', user)}>
              <LinearGradient colors={['#D0D0D0', '#A066DA']} style={{
                flexDirection: 'row',
                borderRadius: 10,
                alignItems: 'center',
                marginBottom: 10,
                padding: 10,
              }}>
                <View>
                  <Image source={require('../../assets/a2.png')} style={{
                    width: windowWidth / 5,
                    height: windowWidth / 5,
                  }} />
                </View>
                <Text style={{
                  flex: 1,
                  textAlign: 'center',
                  fontFamily: fonts.secondary[600],
                  fontSize: MyDimensi / 1.4,
                  color: colors.white,
                }}>Kepatuhan Konsumsi Tablet Tambah Darah</Text>
              </LinearGradient>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <LinearGradient colors={['#F9CC5C', '#4890DF']} style={{
                flexDirection: 'row',
                borderRadius: 10,
                alignItems: 'center',
                marginBottom: 10,
                padding: 10,
              }}>
                <View>
                  <Image source={require('../../assets/a3.png')} style={{
                    width: windowWidth / 5,
                    height: windowWidth / 5,
                  }} />
                </View>
                <Text style={{
                  flex: 1,
                  textAlign: 'center',
                  fontFamily: fonts.secondary[600],
                  fontSize: MyDimensi / 1.4,
                  color: colors.white,
                }}>Asupan Gizi Ibu Hamil</Text>
              </LinearGradient>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </LinearGradient>



      {/* navigation bottom */}
      <View style={{
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: colors.secondary,
        justifyContent: 'space-around'
      }}>
        <TouchableOpacity style={{
          padding: 10,
        }}>
          <Icon type='ionicon' name='home' color={colors.white} size={20} />


        </TouchableOpacity>





        <TouchableOpacity onPress={() => navigation.navigate('Account')} style={{
          padding: 10,
        }}>
          <Icon type='ionicon' name='person' color={colors.white} size={20} />
        </TouchableOpacity>
      </View>

    </LinearGradient >
  )
}

const styles = StyleSheet.create({
  tulisan: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: fonts.secondary[600],
    color: colors.black,
    textAlign: 'justify'
  },
  tulisanJudul: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: fonts.secondary[800],
    color: colors.black,
    textAlign: 'justify'
  }
})