import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const AppLink = ({onPress, color, textStyle, children}) => {
  return (
    // <View style={{...style}}>
    <TouchableOpacity onPress={onPress}>
      <Text style={{...styles.link, ...textStyle, color: color}}>
        {children}
      </Text>
    </TouchableOpacity>
    // </View>
  );
};

export default AppLink;

const styles = StyleSheet.create({
  link: {
    fontSize: RFPercentage(1.6),
    fontFamily: Fonts.Muli.BOLD,
    textAlignVertical: 'center',
  },
});
