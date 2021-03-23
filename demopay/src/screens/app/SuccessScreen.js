import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import AppButton from '../../components/global/AppButton';
import {AppScreenWithoutScroll} from '../../components/global/AppScreen';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const {width, height} = Dimensions.get('screen');

const CabaEnterAmountScreen = (props) => {
  const {navigation, route} = props;
  const {action, amount} = route.params;

  return (
    <AppScreenWithoutScroll
      style={{justifyContent: 'space-between', paddingHorizontal: RFValue(20)}}>
      {/* <StatusImageAlert */}
      {/* style={{elevation: 0}} */}
      <View
        style={{
          alignItems: 'center',
          marginTop: RFPercentage(20),
        }}>
        <View
          style={{
            elevation: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.WHITE,
            borderRadius: RFValue(50),
            height: RFValue(100),
            width: RFValue(100),
          }}>
          <View
            style={{
              height: RFValue(90),
              borderRadius: RFValue(50),
              justifyContent: 'center',
              width: RFValue(90),
              backgroundColor: Colors.PRIMARY,
            }}>
            <Icon
              name="check"
              type="font-awesome-5"
              size={50}
              color={Colors.WHITE}
            />
          </View>
        </View>
        <View style={{alignItems: 'center', marginTop: RFValue(30)}}>
          <Text
            style={{
              marginVertical: RFPercentage(2),
              fontSize: RFPercentage(3.1),
              color: Colors.BLACK,
              fontFamily: Fonts.Mont.BOLD,
            }}>
            Success!
          </Text>
          {action === 'fund' && (
            <Text style={styles.text}>
              Your wallet has been funded with
              <Text style={styles.bold}> ₦{amount && amount} </Text>{' '}
              successfully.
            </Text>
          )}
          {action === 'transfer' && (
            <Text style={styles.text}>
              Your transfer of ₦{amount} to {'\n'}
              <Text style={styles.bold}>{route.params.username}</Text> was
              successful.
            </Text>
          )}
        </View>
      </View>
      <View style={{marginBottom: RFValue(20)}}>
        <AppButton
          onPress={() => {
            navigation.navigate('HomeScreen');
          }}
          style={{marginTop: RFPercentage(4)}}>
          Continue
        </AppButton>
      </View>
      {/* </StatusImageAlert> */}
    </AppScreenWithoutScroll>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: RFPercentage(2),
    textAlign: 'center',
    color: Colors.BLACK,
    fontFamily: Fonts.Muli.REGULAR,
  },
  bold: {fontFamily: Fonts.Muli.BOLD},
});

export default CabaEnterAmountScreen;
