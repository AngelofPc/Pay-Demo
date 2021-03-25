import React, {useState, useContext} from 'react';
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {normalize} from 'react-native-elements';

import AppButton from '../../components/global/AppButton';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import AppInput from '../../components/global/AppInput';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {AppScreenWithoutScroll} from '../../components/global/AppScreen';
import AppLink from '../../components/global/AppLink';
import AppKeyboardView from '../../components/global/AppKeyboardView';

import DemoPayLogo from '../../assets/images/svg/demopay-logo.svg';

import {Context as AppContext} from '../../context/AppContext';

const {height} = Dimensions.get('screen');

const LoginScreen = (props) => {
  const {state, register, clearResponse} = useContext(AppContext);

  const [username, setUsername] = useState('');
  const [wallet, setWallet] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [isSending, setIsSending] = useState(false);
  const {isSending, response} = state;

  const walletInputHandler = (input) => {
    setWallet(input);
  };

  const emailInputHandler = (input) => {
    setEmail(input);
  };

  const usernameInputHandler = (input) => {
    setUsername(input);
  };

  const passwordInputHandler = (input) => {
    setPassword(input);
  };
  const {navigation} = props;
  return (
    <AppScreenWithoutScroll style={{backgroundColor: Colors.ACCENT}}>
      <AppKeyboardView
        contentContainerStyle={{backgroundColor: Colors.ACCENT}}
        style={styles.bottomCardKeyboardContainer}>
        <View>
          <View
            style={{marginBottom: RFPercentage(3), marginTop: RFValue(-70)}}>
            <View style={styles.imageContainer}>
              <DemoPayLogo />
            </View>
            <Text style={styles.welcomeText}>Register </Text>
          </View>
          {/* <BottomCard> */}

          {response && (
            <Text
              style={{
                color: Colors.WHITE,
                fontFamily: Fonts.Muli.SEMIBOLD,
                textAlign: 'center',
              }}>
              {response.message}
            </Text>
          )}
          <View style={{marginVertical: RFValue(4)}}>
            <AppInput
              color={Colors.WHITE}
              placeholder="username"
              placeholderTextColor={Colors.GREY}
              style={{width: '100%', marginBottom: -14}}
              rightIconSize={26}
              onChangeText={usernameInputHandler}
              value={username}
            />

            <AppInput
              color={Colors.WHITE}
              placeholder="Email"
              placeholderTextColor={Colors.GREY}
              style={{width: '100%', marginBottom: -14}}
              rightIconSize={26}
              onChangeText={emailInputHandler}
              value={email}
            />

            <AppInput
              color={Colors.WHITE}
              placeholder="Phone"
              keyboardType="phone-pad"
              placeholderTextColor={Colors.GREY}
              style={{width: '100%', marginBottom: -14}}
              rightIconSize={26}
              onChangeText={walletInputHandler}
              value={wallet}
            />
            <AppInput
              color={Colors.WHITE}
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
                register({username, email, wallet, password});
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
                  color: Colors.LIGHTGREY,
                  fontFamily: Fonts.Muli.REGULAR,
                  fontSize: RFPercentage(1.6),
                }}>
                Already have an account?{' '}
              </Text>
              <AppLink
                onPress={() => {
                  clearResponse();
                  navigation.navigate('LoginScreen');
                }}
                color={Colors.PRIMARY}>
                Login
              </AppLink>
            </View>
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
    // position: 'absolute',
    paddingBottom: RFValue(30),
    width: '100%',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  button: {
    marginVertical: 20,
  },
  buttonText: {
    color: Colors.WHITE,
  },
});

export default LoginScreen;
