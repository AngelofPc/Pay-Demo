import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Icon, normalize} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';

import Colors from '../../styles/Colors';

const Card = (props) => {
  const {
    height,
    icon,
    heading,
    headingColor,
    buttonText,
    children,
    style,
  } = props;
  return (
    <View style={{...styles.card, ...style, height: height || '40%'}}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '90%',
    borderRadius: RFValue(8),
    padding: 10,
    // borderTopRightRadius: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    backgroundColor: Colors.WHITE,
    // backgroundColor: Colors.BLUE,
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 15,
    // position: 'absolute',
    // bottom: 0,
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
});

export default Card;
