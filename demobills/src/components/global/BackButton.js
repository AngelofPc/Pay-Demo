import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Colors from '../../styles/Colors';

const BackButton = (props) => {
  const {onPress} = props;

  return (
    <View style={styles.back}>
      <Icon
        raised
        name="arrow-left"
        type="font-awesome"
        color={Colors.BLACK}
        onPress={onPress}
        size={18}
      />
    </View>
  );
};

export const BackBtn = (props) => {
  const {onPress, icon, color} = props;
  return (
    <View style={styles.cancel}>
      <Icon
        // raised
        name={icon || 'chevron-left'}
        type="font-awesome"
        color={color || Colors.WHITE}
        onPress={onPress}
        size={24}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  back: {
    position: 'absolute',
    top: RFPercentage(1),
    left: 0,
    marginVertical: 10,
    marginLeft: 20,
  },

  cancel: {
    marginVertical: RFPercentage(2),
    marginTop: RFPercentage(4),
    marginLeft: 20,
    elevation: 2,
  },
});

export default BackButton;
