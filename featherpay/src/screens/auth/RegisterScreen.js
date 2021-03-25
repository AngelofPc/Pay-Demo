import React, {useState, useContext} from 'react';
import {
  View,
  Dimensions,
  ActivityIndicator,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import {Icon, normalize} from 'react-native-elements';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

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

import DemoPayLogo from '../../assets/images/svg/featherpay-logo.svg';

import {Context as AppContext} from '../../context/AppContext';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view-fix';
const {height} = Dimensions.get('screen');

const LoginScreen = (props) => {
  const {state, register, clearResponse} = useContext(AppContext);

  const [username, setUsername] = useState('');
  const [wallet, setWallet] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [isSending, setIsSending] = useState(false);
  const {isSending, response} = state;

  const usernameInputHandler = (input) => {
    setUsername(input);
  };

  const emailInputHandler = (input) => {
    setEmail(input);
  };

  const walletInputHandler = (input) => {
    setWallet(input);
  };

  const passwordInputHandler = (input) => {
    setPassword(input);
  };

  const {navigation} = props;
  return (
    // <AppScreenWithoutScroll style={{backgroundColor: Colors.ACCENT}}>

    <AppKeyboardView style={styles.bottomCardKeyboardContainer}>
      <View style={{}}>
        <View style={{marginBottom: RFPercentage(4), marginTop: RFValue(-40)}}>
          <View style={styles.imageContainer}>
            <DemoPayLogo />
          </View>
          <Text style={styles.welcomeText}>Register </Text>
          {response && (
            <Text style={{color: Colors.RED, textAlign: 'center'}}>
              {response.message}
            </Text>
          )}
        </View>
        {/* <BottomCard> */}
        <View style={{marginVertical: RFValue(4)}}>
          <AppInput
            white
            color={Colors.PRIMARY}
            placeholder="Username"
            placeholderTextColor={Colors.GREY}
            style={styles.input}
            onChangeText={usernameInputHandler}
            value={username}
          />
          <AppInput
            white
            color={Colors.PRIMARY}
            placeholder="Email"
            placeholderTextColor={Colors.GREY}
            style={{width: '100%', marginBottom: -14}}
            rightIconSize={26}
            onChangeText={emailInputHandler}
            value={email}
          />
          <AppInput
            white
            color={Colors.PRIMARY}
            placeholder="@feathertag"
            placeholderTextColor={Colors.GREY}
            style={styles.input}
            onChangeText={walletInputHandler}
            value={wallet}
          />
          <AppInput
            color={Colors.PRIMARY}
            type="password"
            white
            placeholder="Password"
            placeholderTextColor={Colors.GREY}
            style={styles.input}
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
      </View>
    </AppKeyboardView>

    // </AppScreenWithoutScroll>
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
    height: RFValue(80),
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
    color: Colors.BLACK,
    marginVertical: RFValue(10),
  },
  forgotPassword: {
    color: Colors.GREY,
    textAlign: 'right',
    fontFamily: Fonts.Muli.BOLD,
    marginVertical: RFValue(3),
  },
  bottomCardKeyboardContainer: {
    flex: 1,
    paddingHorizontal: RFValue(20),
    // position: 'absolute',
    // bottom: RFValue(30),
    paddingBottom: RFValue(30),
    width: '100%',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  button: {
    marginVertical: 20,
  },
});

export default LoginScreen;
