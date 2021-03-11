import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const ActionCard = ({icon, text, onPress}) => {
  return (
    <View style={styles.actionCardStyle}>
      <View style={styles.actionCardTextGroup}>
        <View
          style={[
            styles.actionCardIconContainer,
            {backgroundColor: icon === 'times' ? Colors.GOLD : Colors.BLACK},
          ]}>
          <Icon
            name={icon}
            type="font-awesome-5"
            color={icon === 'times' ? Colors.WHITE : Colors.GREY}
            size={10}
            onPress={onPress}
          />
        </View>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.actionCardText}>{text}</Text>
        </TouchableOpacity>
      </View>
      <View style={{justifyContent: 'center'}}>
        <Icon
          size={13}
          solid={false}
          name="chevron-right"
          color={Colors.BLACK}
          type="font-awesome-5"
          onPress={onPress}
        />
      </View>
    </View>
  );
};

export const DetailCard = ({icon, leftText, rightText, onPress}) => {
  return (
    <View style={{...styles.actionCardStyle, elevation: 1}}>
      <View style={styles.actionCardTextGroup}>
        <Text
          style={{
            ...styles.actionCardText,
            fontFamily: Fonts.Mont.SEMIBOLD,
            color: Colors.GREY,
          }}>
          {leftText}
        </Text>
      </View>
      <View style={{justifyContent: 'center'}}>
        <Text style={{...styles.actionCardText, fontFamily: Fonts.Muli.BOLD}}>
          {rightText}
        </Text>
      </View>
    </View>
  );
};

export default ActionCard;

const styles = StyleSheet.create({
  actionCardStyle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    elevation: 6,
    marginHorizontal: 1,
    borderRadius: 10,
    padding: 15,
    height: RFValue(50),
    marginVertical: 4,
    // flex: 8,
    backgroundColor: Colors.WHITE,
  },
  actionCardTextGroup: {flexDirection: 'row', alignItems: 'center'},
  actionCardText: {
    color: Colors.BLACK,
    fontFamily: Fonts.Muli.REGULAR,
    fontSize: RFValue(14),
    marginLeft: RFValue(15),
  },
  actionCardAmount: {
    fontFamily: Fonts.BOLD,
    fontSize: RFValue(14),
  },
  actionCardIconContainer: {
    height: RFValue(30),
    width: RFValue(30),
    borderRadius: RFValue(30),
    backgroundColor: Colors.BLACK,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
