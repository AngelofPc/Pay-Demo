import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {Icon, normalize} from 'react-native-elements';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import AppButton from '../../components/global/AppButton';
import BottomCard from '../../components/section/BottomCard';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import AppScreen from '../../components/global/AppScreen';

import Timer from '../../components/section/Timer';

const {height} = Dimensions.get('screen');

const PhoneVerificationScreen = (props) => {
  const {navigation} = props;

  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  // const []

  const enableVerify = () => {};
  return (
    <AppScreen backgroundColor={Colors.WHITE}>
      <View style={styles.back}>
        <TouchableOpacity style={{flexDirection: 'row'}}>
          <Icon
            // raised
            name="arrow-left"
            type="font-awesome"
            color={Colors.BLACK}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.backText}>Phone Number Verification</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={require('../../assets/images/png/otp-verification.png')}
        />
      </View>

      <BottomCard>
        <View>
          <Text style={styles.text}>
            An OTP has been sent to you via SMS to{'\n'}your phone number -{' '}
            <Text style={{fontFamily: Fonts.Muli.BOLD}}>0803211658</Text>,
            kindly put in the number to continue
          </Text>
          <View style={styles.OTPContainer}>
            <OTPInputView
              style={{
                height: RFValue(70),
                // width: '70%',
              }}
              keyboardType="number-pad"
              pinCount={6}
              // code={'2000'} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged={(code) => {
                setDisabled(false);
              }}
              autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={(code) => {
                // setLoading(true);
                console.log(`PIN is ${code}`);
                setDisabled(false);
                setTimeout(() => {
                  setLoading(false);
                }, 7000);
              }}
            />
          </View>
          <View style={styles.resendCol}>
            <View style={styles.resendGroup}>
              <View>
                <TouchableOpacity onPress={{}}>
                  <Text
                    style={[styles.link, disabled ? styles.disabledLink : '']}>
                    Resend sms in
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={{fontFamily: Fonts.REGULAR}}>
                  0:30
                  {/* <Timer /> */}
                </Text>
              </View>
            </View>
            <View style={styles.line}></View>
            <View style={styles.resendGroup}>
              <TouchableOpacity>
                <Text
                  style={[styles.link, disabled ? styles.disabledLink : '']}>
                  Change Phone number
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <AppButton
            disabled={disabled}
            onPress={() => {
              navigation.navigate('EleventhOnboarding');
            }}
            style={styles.button}>
            {loading && <ActivityIndicator color={Colors.WHITE} size="large" />}
            {!loading && <Text style={styles.buttonText}>Verify</Text>}
          </AppButton>
        </View>
      </BottomCard>
      {/* </Pressable>
    </KeyboardAvoidingView> */}
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  OTPContainer: {
    width: '70%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  underlineStyleBase: {
    backgroundColor: Colors.GREY,
    borderRadius: 10,
    color: Colors.PRIMARY,
    width: RFPercentage(6.8),
    height: RFPercentage(8),
    fontFamily: Fonts.BOLD,
    fontSize: RFValue(20),
    backgroundColor: '#eee',
    padding: 10,
    marginHorizontal: 2,
  },

  underlineStyleHighLighted: {
    borderColor: Colors.PRIMARY,
  },
  screen: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    justifyContent: 'space-between',
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
    fontSize: RFPercentage(1.8),
    marginLeft: 10,
    textAlign: 'right',
    // textAlignVertical: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: RFPercentage(3),
  },
  image: {
    width: '100%',
    height: height / 2.5,
  },
  heading: {
    marginBottom: normalize(10),
    fontFamily: Fonts.BOLD,
    textAlign: 'center',
    color: Colors.BLACK,
    fontSize: RFPercentage(2),
  },
  text: {
    color: Colors.BLACK,
    marginBottom: RFValue(10),
    fontFamily: Fonts.Muli.REGULAR,
    textAlign: 'center',
    fontSize: RFPercentage(1.8),
    textAlignVertical: 'top',
  },
  resendCol: {
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  resendGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  line: {
    width: '100%',
    height: 2,
    alignSelf: 'center',
    marginVertical: normalize(10),
    backgroundColor: '#eee',
  },
  link: {
    fontFamily: Fonts.REGULAR,
    color: Colors.PRIMARY,
  },
  disabledLink: {
    color: Colors.GREY,
  },
  button: {
    marginVertical: normalize(21),
  },
  buttonText: {
    color: Colors.WHITE,
  },
});

export default PhoneVerificationScreen;
