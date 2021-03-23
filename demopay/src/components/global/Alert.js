import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

import AppButton from './AppButton';
import Fonts from './../../styles/Fonts';
import BottomCard from '../section/BottomCard';
import Colors from './../../styles/Colors';

export const ImageAlert = ({children, initial, image, style}) => {
  return (
    <BottomCard style={{...styles.bottomCard, ...style}}>
      <View style={styles.imageContainer}>
        {initial && (
          <View
            style={{
              backgroundColor: Colors.PRIMARY,
              height: '100%',
              width: '100%',
              justifyContent: 'center',
              borderRadius: RFPercentage(50),
            }}>
            <Text
              style={{
                color: Colors.WHITE,
                fontFamily: Fonts.Muli.BOLD,
                fontSize: RFPercentage(5),
                alignSelf: 'center',
              }}>
              {initial}
            </Text>
          </View>
        )}
        {image && (
          <Image
            style={{
              width: '100%',
              height: '100%',
              borderRadius: RFPercentage(50),
            }}
            source={image}
          />
        )}
      </View>
      {children}
    </BottomCard>
  );
};

export const StatusImageAlert = ({children, image, style}) => {
  return (
    <BottomCard style={{...styles.bottomCard, ...style}}>
      <View
        style={{
          ...styles.imageContainer,
          height: 120,
          width: 120,
          // backgroundColor: 'transparent',
        }}>
        <Image
          style={{
            width: '180%',
            height: '100%',
            borderRadius: RFPercentage(50),
          }}
          source={image}
        />
      </View>
      {children}
    </BottomCard>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: 'absolute',
    alignItems: 'center',
    overflow: 'hidden',
    alignSelf: 'center',
    padding: RFValue(5),
    height: 100,
    width: 100,
    borderRadius: RFValue(50),
    top: -55,
    backgroundColor: Colors.WHITE,
  },
});

export default ImageAlert;
