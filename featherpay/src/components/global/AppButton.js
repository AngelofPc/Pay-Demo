import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
// import Colors from '../../styles/Colors';
// import Fonts from '../../styles/Fonts';

const MainButton = (props) => {
  const {onPress, style, textStyle, children, disabled} = props;

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={!disabled ? onPress : null}>
      <View style={{...styles.button, ...style}} opacity={!disabled ? 1 : 0.6}>
        <Text style={{...styles.buttonText, ...textStyle}}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: RFValue(16),
    paddingHorizontal: RFPercentage(3),
    borderRadius: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
  },
  buttonText: {
    color: Colors.WHITE,
    textTransform: 'uppercase',
    fontFamily: Fonts.Muli.BOLD,
    textAlign: 'center',
    fontSize: RFValue(14),
  },
});

export default MainButton;
