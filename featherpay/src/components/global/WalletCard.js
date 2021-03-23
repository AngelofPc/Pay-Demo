import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Icon, normalize} from 'react-native-elements';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import Card from './Card';

import DemoPayLogo from '../../assets/images/svg/featherpay-sm-logo.svg';

const WalletCard = (props) => {
  const {onPress, walletID, amount, color, textColor, earnings} = props;

  return (
    // <Card height={height}>
    <Card
      height={RFValue(100)}
      style={{
        backgroundColor: color || Colors.PRIMARY,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: RFValue(20),
        paddingVertical: RFValue(10),
      }}>
      <View>
        <Text
          style={{
            color: Colors.WALLETBLUE,
            fontSize: RFPercentage(1.8),
            fontFamily: Fonts.Muli.REGULAR,
          }}>
          Wallet Balance
        </Text>
        <Text
          style={{
            color: Colors.WHITE,
            fontFamily: Fonts.Muli.BOLD,
            fontSize: RFPercentage(5),
          }}>
          ₦{amount}
        </Text>
      </View>
      <View style={{width: 100, height: 70}}>
        <View
          style={{
            width: '100%',
            height: RFValue(50),
            marginBottom: RFValue(5),
            marginTop: RFValue(5),
          }}>
          <DemoPayLogo opacity={0.5} />
        </View>
        {/* <Image
          resizeMode="contain"
          style={{width: '100%', height: '90%'}}
          source={require('../../assets/images/png/giro-logo.png')}
        /> */}
      </View>
    </Card>
  );
};

export const SubWalletCard = (props) => {
  const {onPress, walletID, textColor, amount, color} = props;
  return (
    <Card
      height={RFValue(120)}
      style={{backgroundColor: color || Colors.WHITE}}>
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={{...styles.textGroup}}>
            <TouchableOpacity>
              <Text
                style={{
                  color: textColor || Colors.BLACK,
                  fontFamily: Fonts.Mont.BOLD,
                  fontSize: RFPercentage(2),
                }}>
                Primary (Default)
              </Text>
            </TouchableOpacity>
            {walletID && (
              <Text
                style={{
                  color: textColor || Colors.BLACK,
                  fontSize: RFPercentage(1.6),
                }}>
                Wallet ID <Text style={styles.bold}>{walletID}</Text>
              </Text>
            )}
            {/* {!walletID && <GiroImg />} */}
          </View>
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: '#707070',
              marginBottom: 2,
            }}></View>
          <View>
            <View style={{...styles.textGroup, marginVertical: normalize(0)}}>
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      ...styles.iconText,
                      color: textColor || Colors.BLACK,
                    }}>
                    Wallet Balance
                  </Text>
                </View>
                <Text
                  style={{...styles.amount, color: textColor || Colors.BLACK}}>
                  ₦{amount}
                </Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={onPress}
                  style={{
                    backgroundColor: textColor ? Colors.BLACK : Colors.PRIMARY,
                    justifyContent: 'center',
                    padding: 10,
                    alignSelf: 'center',
                    paddingHorizontal: 20,
                    borderRadius: 30,
                  }}>
                  <Text
                    style={{
                      color: Colors.WHITE,
                      fontSize: RFPercentage(2),
                    }}>
                    Fund Wallet{' '}
                    <Icon
                      // style={{textAlign: 'right'}}
                      size={14}
                      name="arrow-right"
                      type="font-awesome"
                      color={Colors.WHITE}
                      onPress={onPress}
                    />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{...styles.textGroup}}></View>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // height: '90%',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  textGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingBottom: 5,
    textAlignVertical: 'center',
  },
  iconContainer: {
    width: '15%',
    marginLeft: 10,
    alignSelf: 'center',
  },
  iconText: {
    color: Colors.BLACK,
    marginRight: normalize(4),
    fontFamily: Fonts.Muli.REGULAR,
    fontSize: RFPercentage(1.6),
  },
  text: {
    // fontSize: normalize(20),
    fontFamily: Fonts.Muli.SEMIBOLD,
    position: 'relative',
    textAlignVertical: 'center',
    marginTop: RFValue(4),
    fontSize: RFPercentage(2.5),
  },
  bold: {
    fontFamily: Fonts.Mont.BOLD,
    fontSize: RFPercentage(2),
  },
  amount: {
    fontSize: RFPercentage(4),
    color: Colors.BLACK,
    fontFamily: Fonts.Muli.BOLD,
  },
  cashback: {
    fontSize: RFPercentage(1.8),
    fontFamily: Fonts.Muli.BOLD,
    position: 'relative',
  },
  subtracted: {
    fontSize: RFPercentage(1.2),
    fontFamily: Fonts.Muli.BOLD,
  },
});

export default WalletCard;
