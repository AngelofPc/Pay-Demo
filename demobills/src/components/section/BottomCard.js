import React from 'react';
import {StyleSheet, View} from 'react-native';

import Colors from '../../styles/Colors';

const BottomCard = (props) => {
  const {style, children} = props;
  return <View style={{...styles.bottomCard, ...style}}>{children}</View>;
};

export default BottomCard;

const styles = StyleSheet.create({
  bottomCard: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    elevation: 20,
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 35,
    justifyContent: 'space-around',
    borderTopRightRadius: 35,
  },
});
