import React, {useState} from 'react';
import {View, Dimensions, Text, StyleSheet, Image} from 'react-native';
import {Icon, normalize} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';

import AppButton from '../../components/global/AppButton';
import BottomCard from '../../components/section/BottomCard';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import AppInput from '../../components/global/AppInput';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import AppScreen, {
  AppScreenWithoutScroll,
} from '../../components/global/AppScreen';
import AppLink from '../../components/global/AppLink';
import AppKeyboardView from '../../components/global/AppKeyboardView';

import DemoPayLogo from '../../assets/images/svg/demopay-logo.svg';

const {height} = Dimensions.get('screen');

const LoginScreen = (props) => {
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
    <AppScreenWithoutScroll style={{backgroundColor: Colors.ACCENT}}>
      <View>
        <View style={styles.back}>
          <Icon
            size={20}
            name="chevron-left"
            type="font-awesome"
            color={Colors.WHITE}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.imageContainer}>
          <DemoPayLogo />
          {/* <Image
            // style={{width: '100%', height: height / 3.1}}
            resizeMode="contain"
            source={require('../../assets/images/png/giro-logo.png')}
          /> */}
        </View>
        <Text style={styles.welcomeText}>Login</Text>
      </View>
      <AppKeyboardView style={styles.bottomCardKeyboardContainer}>
        {/* <BottomCard> */}
        <View style={{marginVertical: RFValue(10)}}>
          <AppInput
            placeholder="Email"
            keyboardType="number-pad"
            placeholderTextColor={Colors.GREY}
            style={{width: '100%', marginBottom: -14}}
            rightIconSize={26}
            onChangeText={phoneInputHandler}
            value={phoneNumber}
          />
          <AppInput
            type="password"
            placeholder="Password"
            placeholderTextColor={Colors.GREY}
            style={{width: '100%', marginBottom: -14}}
            rightIcon="lock"
            onChangeText={passwordInputHandler}
            value={password}
          />

          <AppButton
            onPress={() => {
              navigation.navigate('App');
            }}
            style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </AppButton>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text
              style={{
                color: Colors.LIGHTGREY,
                fontFamily: Fonts.Muli.REGULAR,
                fontSize: RFPercentage(1.6),
              }}>
              Don't have an account?{' '}
            </Text>
            <AppLink
              onPress={() => {
                navigation.navigate('RegisterScreen');
              }}
              color={Colors.PRIMARY}>
              Register
            </AppLink>
          </View>
        </View>
        {/* </BottomCard> */}
      </AppKeyboardView>
    </AppScreenWithoutScroll>
  );
};

LoginScreen.setOptions = {
  headerShown: true,
  title: 'My home',
  headerStyle: {
    backgroundColor: Colors.WHITE,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  back: {
    position: 'absolute',
    top: 10,
    left: 0,
    marginVertical: 10,
    marginLeft: 20,
    flexDirection: 'row',
    zIndex: 1000,
    justifyContent: 'space-between',
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
    height: RFValue(150),
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    marginVertical: normalize(10),
    textAlign: 'center',
    fontSize: normalize(20),
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  welcomeText: {
    textAlign: 'center',
    fontFamily: Fonts.Mont.BOLD,
    fontSize: RFValue(20),
    color: Colors.WHITE,
    marginBottom: RFValue(10),
  },
  forgotPassword: {
    color: Colors.GREY,
    textAlign: 'right',
    fontFamily: Fonts.Muli.BOLD,
    marginVertical: RFValue(3),
  },
  bottomCardKeyboardContainer: {
    paddingHorizontal: RFValue(20),
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  button: {
    marginVertical: 20,
  },
});

export default LoginScreen;
