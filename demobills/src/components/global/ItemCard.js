import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Icon, normalize} from 'react-native-elements';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import Card from './Card';

const ItemCard = (props) => {
  const {onPress, text, icon, style} = props;
  return (
    <Card style={{marginTop: 10}} style={style} height={65}>
      <TouchableOpacity
        onPress={onPress}
        style={{padding: 6, flexDirection: 'row'}}>
        {/* <View style> */}

        <View
          style={{flex: 5, alignSelf: 'center', marginBottom: normalize(3)}}>
          <Text style={styles.text}>{text}</Text>
        </View>
        {icon && (
          <View style={{flex: 0.8}}>
            <Icon
              style={{marginTop: normalize(4)}}
              name={icon || 'chevron-down'}
              type="font-awesome"
              size={14}
            />
          </View>
        )}
        {/* </View> */}
      </TouchableOpacity>
    </Card>
  );
};

export const ItemImageCard = (props) => {
  const {onPress, image, icon, iconSize, text, disabled} = props;
  return (
    <Card style={{marginTop: 10}} height={RFValue(52)}>
      <TouchableOpacity
        onPress={onPress}
        style={{padding: 5, flexDirection: 'row'}}>
        {/* <View style> */}
        <View style={styles.iconContainer}>
          <Image
            style={{width: RFValue(30), height: RFValue(30)}}
            source={image}
          />
        </View>
        <View
          style={{flex: 5, alignSelf: 'center', marginBottom: normalize(3)}}>
          <Text style={{...styles.text}}>{text}</Text>
        </View>
        <View style={{flex: 1}}>
          {icon && (
            <Icon
              style={{marginTop: normalize(6)}}
              name={icon || 'chevron-down'}
              type="font-awesome"
              size={iconSize || 18}
            />
          )}
        </View>
        {/* </View> */}
      </TouchableOpacity>
      {disabled && (
        <View
          style={{
            backgroundColor: 'rgba(250,250,250,0.5)',
            position: 'absolute',
            height: RFValue(52),
            top: 0,
            overflow: 'hidden',
            bottom: 10,
            zIndex: 1000,
            width: '106%',
          }}></View>
      )}
    </Card>
  );
};

export const HorizontalCard = (props) => {
  const {onPress, children, style, height} = props;
  return (
    <Card style={{marginTop: 10, ...style}} height={height || RFValue(60)}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          padding: 5,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {children}
        {/* <View style> */}
        {/* <View style={styles.iconContainer}>
          <Image source={image} />
        </View>
        <View
          style={{flex: 5, alignSelf: 'center', marginBottom: normalize(3)}}>
          <Text style={{...styles.text}}>{text}</Text>
        </View>
        <View style={{flex: 1}}>
          {icon && (
            <Icon
              style={{marginTop: normalize(6)}}
              name={icon || 'chevron-down'}
              type="font-awesome"
              size={iconSize || 18}
            />
          )}
        </View> */}
        {/* </View> */}
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    // width: RFValue(50),
    // height: RFValue(50),
    // marginLeft: 10,
    alignSelf: 'center',
  },
  text: {
    // fontSize: normalize(20),
    fontFamily: Fonts.Muli.SEMIBOLD,
    position: 'relative',
    textAlignVertical: 'center',
    marginTop: 4,
    fontSize: RFPercentage(2.1),
  },
});

export default ItemCard;
