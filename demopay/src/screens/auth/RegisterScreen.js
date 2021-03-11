import React, {useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import AppButton from '../../components/global/AppButton';

import AppInput from '../../components/global/AppInput';

import AppLink from '../../components/global/AppLink';
import BottomCard from '../../components/section/BottomCard';
import Fonts from '../../styles/Fonts';
import Colors from '../../styles/Colors';

import {Icon} from 'react-native-elements';
import AppKeyboardView from '../../components/global/AppKeyboardView';

import DemoPayLogo from '../../assets/images/svg/demopay-logo.svg';

const {width, height} = Dimensions.get('screen');

const AuthActionScreen = (props) => {
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [password, setPassword] = useState(null);

  const phoneInputHandler = (input) => {
    setPhoneNumber(input);
  };

  const passwordInputHandler = (input) => {
    setPassword(input);
  };

  const {navigation} = props;
  return (
    // <AppScreen>

    <AppKeyboardView
      enableOnAndroid={true}
      style={{
        backgroundColor: Colors.ACCENT,
        flexDirection: 'column-reverse',
        paddingHorizontal: RFValue(20),
      }}>
      {/* <BottomCard style={styles.bottomCard}> */}

      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginBottom: RFPercentage(8),
          height: RFValue(150),
        }}>
        {/* <Image source={require('../../assets/images/')} /> */}
        <DemoPayLogo />
        <Text
          style={{
            marginTop: RFPercentage(2),
            fontSize: RFPercentage(3),
            color: Colors.WHITE,
            fontFamily: Fonts.Mont.BOLD,
          }}>
          Register
        </Text>
      </View>

      <View
        style={{
          marginVertical: RFValue(20),
          marginBottom: RFPercentage(10),
        }}>
        {/* <View style={styles.back}>
          <Icon
            // raised
            name="chevron-left"
            type="font-awesome"
            color={Colors.BLACK}
            size={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.backText}>Register</Text>
        </View> */}
        <AppInput
          placeholder="Username"
          placeholderTextColor={Colors.GREY}
          style={styles.input}
          onChangeText={phoneInputHandler}
          value={phoneNumber}
        />

        <AppInput
          placeholder="Email Address"
          placeholderTextColor={Colors.GREY}
          style={styles.input}
          onChangeText={phoneInputHandler}
          value={phoneNumber}
        />
        <AppInput
          type="password"
          placeholder="Password"
          placeholderTextColor={Colors.GREY}
          style={styles.input}
          rightIcon="lock"
          onChangeText={passwordInputHandler}
          value={password}
        />

        <AppButton
          onPress={() => {
            navigation.navigate('App');
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </AppButton>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text
            style={{
              fontFamily: Fonts.Muli.REGULAR,
              color: Colors.LIGHTGREY,
              fontSize: RFPercentage(1.6),
            }}>
            Don't have an account?{''}
          </Text>
          <AppLink
            onPress={() => {
              navigation.navigate('LoginScreen');
            }}
            color={Colors.PRIMARY}>
            {' '}
            Login
          </AppLink>
        </View>
      </View>
      {/* </BottomCard> */}
    </AppKeyboardView>
    // </ImageBackground>
    // {/* </KeyboardAvoidingView> */}
    // </AppScreen>
  );
};

export default AuthActionScreen;

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    // position: 'absolute',
    height: height,
    flexDirection: 'column-reverse',
  },
  back: {
    flexDirection: 'row',
    marginBottom: RFValue(10),
  },
  backText: {
    fontFamily: Fonts.Muli.BOLD,
    color: Colors.BLACK,
    fontSize: RFPercentage(2),
    marginLeft: RFValue(15),
    marginTop: RFValue(-3),
  },
  input: {
    width: '100%',
    marginBottom: -14,
  },
  button: {
    marginVertical: RFValue(15),
  },
});
