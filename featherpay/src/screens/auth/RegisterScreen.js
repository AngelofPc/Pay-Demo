import React, {useContext, useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  ActivityIndicator,
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

import DemoPayLogo from '../../assets/images/svg/featherpay-logo.svg';
import {AppScreenWithoutScroll} from '../../components/global/AppScreen';

const {width, height} = Dimensions.get('screen');

import {Context as AppContext} from '../../context/AppContext';

const AuthActionScreen = (props) => {
  const {state, register, clearResponse} = useContext(AppContext);

  const [username, setUsername] = useState('ace');
  const [wallet, setWallet] = useState('aceoluwapelumi101');
  const [password, setPassword] = useState('12345678');
  // const [isSending, setIsSending] = useState(false);
  const {isSending, response} = state;

  const usernameInputHandler = (input) => {
    setUsername(input);
  };

  const walletInputHandler = (input) => {
    setWallet(input);
  };

  const passwordInputHandler = (input) => {
    setPassword(input);
  };

  const {navigation} = props;
  return (
    <AppScreenWithoutScroll>
      <View>
        <View style={styles.back}>
          {/* <Icon
            size={20}
            name="chevron-left"
            type="font-awesome"
            color={Colors.WHITE}
            onPress={() => navigation.goBack()}
          /> */}
        </View>
        <View style={styles.imageContainer}>
          <DemoPayLogo />
          {/* <Image
            // style={{width: '100%', height: height / 3.1}}
            resizeMode="contain"
            source={require('../../assets/images/png/giro-logo.png')}
          /> */}
        </View>
        <Text style={styles.welcomeText}>Register </Text>
        {response && (
          <Text style={{color: Colors.RED, textAlign: 'center'}}>
            {response.message}
          </Text>
        )}
      </View>

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
            onChangeText={usernameInputHandler}
            value={username}
          />

          <AppInput
            placeholder="Email Address"
            placeholderTextColor={Colors.GREY}
            style={styles.input}
            onChangeText={walletInputHandler}
            value={wallet}
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
              register({username, wallet, password});
              // navigation.navigate('App');
            }}
            style={styles.button}>
            {!isSending ? (
              'Register'
            ) : (
              <ActivityIndicator color={Colors.WHITE} />
            )}
          </AppButton>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text
              style={{
                fontFamily: Fonts.Muli.REGULAR,
                color: Colors.BLACK,
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
    </AppScreenWithoutScroll>
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
    marginLeft: '82%',
    textAlign: 'right',
    textAlignVertical: 'center',
  },
  imageContainer: {
    marginTop: RFValue(140),
    width: '100%',
    height: RFValue(80),
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    textAlign: 'center',
    fontFamily: Fonts.Mont.BOLD,
    fontSize: RFValue(20),
    color: Colors.PRIMARY,
    marginBottom: RFValue(10),
    marginTop: RFValue(10),
  },
  input: {
    width: '100%',
    marginBottom: -14,
  },
  button: {
    marginVertical: RFValue(15),
  },
});
