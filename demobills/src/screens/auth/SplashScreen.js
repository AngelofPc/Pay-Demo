import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import trackerApi from '../../api/tracker';

import DemoPayLogo from '../../assets/images/svg/demopay-logo.svg';
import {AppScreenWithoutScroll} from '../../components/global/AppScreen';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    // const getMoviesFromApiAsync = async () => {
    //   try {
    //     let response = await fetch(
    //       'https://fcm.googleapis.com/v1/projects/demobills-dd6651/messages:send',
    //     );
    //     let json = await response.json();
    //     return json.movies;
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // // const fcm = trackerApi.post(
    // //   '',
    // // );
    // getMoviesFromApiAsync();
  }, []);

  setTimeout(() => {
    navigation.navigate('LoginScreen');
  }, 3000);

  return (
    <AppScreenWithoutScroll
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.BLACK,
      }}>
      <DemoPayLogo />
      <Text
        style={{
          fontFamily: Fonts.Mont.BOLD,
          color: Colors.WHITE,
          fontSize: RFValue(50),
          marginTop: RFValue(20),
        }}>
        Demobills
      </Text>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          alignItems: 'center',
          marginBottom: RFValue(20),
        }}>
        <Text
          style={{
            fontFamily: Fonts.Muli.SEMIBOLD,
            color: Colors.LIGHTGREY,
            fontSize: RFValue(14),
          }}>
          All rights reserved - 2021
        </Text>
        <Text
          style={{
            fontFamily: Fonts.Muli.SEMIBOLD,
            color: Colors.LIGHTGREY,
            fontSize: RFValue(14),
          }}>
          Powered by giro cloud technologies
        </Text>
      </View>
    </AppScreenWithoutScroll>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
