import React, {useState} from 'react';
import {StyleSheet, Dimensions, Text, View} from 'react-native';
import {Overlay} from 'react-native-elements';
import AppButton from '../global/AppButton';
import ImageAlert from '../global/Alert';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Fonts from '../../styles/Fonts';
import Colors from '../../styles/Colors';

const {height} = Dimensions.get('screen');

const CashXOverlay = (props) => {
  const {image, visible, toggleOverlay} = props;

  return (
    <Overlay
      overlayStyle={{
        width: '100%',
        height: height / 1.5,
        flex: 1,
        bottom: 0,
        backgroundColor: 'transparent',
      }}
      onBackdropPress={toggleOverlay}
      visible={visible}>
      <ImageAlert
        image={image}
        style={{
          position: 'absolute',
          left: 0,
          height: height / 2,
          right: 0,
          bottom: 0,
        }}>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              fontSize: RFPercentage(2),
              fontFamily: Fonts.Muli.SEMIBOLD,
            }}>
            Josephine Omoseyindemi
          </Text>
          <Text
            style={{
              fontFamily: Fonts.Muli.SEMIBOLD,
              fontSize: RFPercentage(7),
            }}>
            N5,500
          </Text>
          <Text
            style={{
              fontSize: RFPercentage(2),
              textAlign: 'center',
              width: '90%',
              fontFamily: Fonts.Muli.REGULAR,
            }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore
          </Text>
        </View>
        <View
          style={{
            borderBottomColor: Colors.BLUE,
            borderWidth: 0.2,
            borderStyle: 'dotted',
          }}></View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '48%'}}>
            <AppButton style={{width: '100%'}}>Accept</AppButton>
          </View>
          <View style={{width: '48%'}}>
            <AppButton
              onPress={toggleOverlay}
              style={{width: '100%', backgroundColor: Colors.BLACK}}>
              Decline
            </AppButton>
          </View>
        </View>
      </ImageAlert>
      <View
        style={{
          position: 'absolute',
          alignSelf: 'center',
          top: RFValue(30),
        }}>
        <View style={styles.awayTimeContainer}>
          <Text style={styles.awayTimeText}>- 7 Mins away</Text>
        </View>
      </View>
    </Overlay>
  );
};

export default CashXOverlay;

const styles = StyleSheet.create({
  awayTimeContainer: {
    // alignSelf: 'center',
    backgroundColor: '#F2D1A5',
    paddingHorizontal: RFPercentage(2.5),
    paddingVertical: RFPercentage(1.8),
    borderRadius: RFValue(30),
  },
  awayTimeText: {
    fontFamily: Fonts.Muli.BOLD,
    color: Colors.BLACK,
    fontSize: RFPercentage(1.6),
  },
});
