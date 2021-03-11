import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {Icon, normalize, Overlay} from 'react-native-elements';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import AppButton from '../../components/global/AppButton';
import AppScreen from '../../components/global/AppScreen';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

import VirtualKeyboard from 'react-native-virtual-keyboard';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const {width, height} = Dimensions.get('window');

const TransactionPinScreen = (props) => {
  const {navigation} = props;

  const [pin, setPin] = useState('10');
  const [visible, setVisible] = useState(true);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const changeText = (pin) => {
    setPin(pin);
  };

  return (
    <AppScreen>
      <View style={{justifyContent: 'center'}}>
        <View style={{justifyContent: 'space-between'}}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: RFValue(20),
              marginLeft: RFValue(20),
            }}>
            <Icon name="arrow-left" type="font-awesome-5" />
            <Text
              style={{
                marginLeft: RFValue(20),
                textAlignVertical: 'center',
                fontFamily: Fonts.Mont.BOLD,
              }}>
              Transaction Pin
            </Text>
          </View>
          <View style={styles.imageContainer}>
            <Image
              style={{width: '100%', height: '100%', marginHorizontal: 10}}
              source={require('../../assets/images/png/transaction-pin-image.png')}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              marginTop: RFPercentage(3),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.heading}>
              Kindly set up your 4-digit secure pin
            </Text>
            <Text
              style={{
                width: '80%',
                marginVertical: 20,
                textAlign: 'center',
                fontFamily: Fonts.Mont.SEMIBOLD,
              }}>
              your secure pin authorises all your{'\n'} transactions and
              personal changes made{'\n'}on the giro system
            </Text>
          </View>
          <View>
            <AppButton
              onPress={() => {
                toggleOverlay();
              }}
              style={styles.button}>
              <Text style={styles.buttonText}>Set up pin</Text>
            </AppButton>
            <Overlay
              overlayStyle={{
                width: '100%',
                height: height / 1.5,
                position: 'absolute',
                flex: 1,
                backgroundColor: Colors.GOLD,
                bottom: 0,
                borderTopLeftRadius: 35,
                borderTopRightRadius: 35,
              }}
              isVisible={visible}
              onBackdropPress={toggleOverlay}>
              <View>
                <View style={styles.OTPContainer}>
                  <OTPInputView
                    style={{
                      height: RFValue(70),
                      width: '70%',
                    }}
                    keyboardType="number-pad"
                    pinCount={4}
                    code={pin} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                    onCodeChanged={(code) => {
                      // setDisabled(false);
                    }}
                    autoFocusOnLoad={false}
                    codeInputFieldStyle={styles.underlineStyleBase}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    onCodeFilled={(code) => {
                      // setLoading(true);
                      // console.log(`PIN is ${code}`);
                      // setDisabled(false);
                      // setTimeout(() => {
                      //   setLoading(false);
                      // }, 7000);
                    }}
                  />
                  <View style={styles.line}></View>
                </View>
                <VirtualKeyboard
                  color="white"
                  pressMode="string"
                  onPress={changeText}
                />

                <AppButton
                  onPress={() => {
                    toggleOverlay();
                  }}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Submit</Text>
                </AppButton>
              </View>
            </Overlay>
          </View>
        </View>
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
    // top: -55,
    height: '55%',
  },

  heading: {
    width: '80%',
    fontSize: RFPercentage(4),
    textAlign: 'center',
    fontFamily: Fonts.Mont.SEMIBOLD,
  },

  text: {
    marginTop: normalize(12),
    padding: normalize(10),
    textAlign: 'center',
    fontSize: RFPercentage(1.8),
    fontFamily: Fonts.Muli.REGULAR,
    color: Colors.BLACK,
  },
  textGroup: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10,
    marginTop: -60,
  },
  heading: {
    fontSize: RFPercentage(3),
    fontFamily: Fonts.Mont.BOLD,
    textAlign: 'center',
  },
  button: {
    marginVertical: RFValue(20),
    width: '80%',
  },
  line: {
    height: 1,
    alignSelf: 'center',
    width: '60%',
    marginVertical: RFValue(20),
    backgroundColor: Colors.WHITE,
  },
  OTPContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: RFValue(10),
  },

  underlineStyleBase: {
    borderRadius: 10,
    color: Colors.WHITE,
    width: RFPercentage(6.8),
    height: RFPercentage(8),
    fontFamily: Fonts.BOLD,
    fontSize: RFValue(20),
    padding: 10,
    marginHorizontal: 2,
  },
});

export default TransactionPinScreen;
