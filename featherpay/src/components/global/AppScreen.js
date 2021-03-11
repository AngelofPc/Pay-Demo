import React from 'react';
import {ScrollView, StyleSheet, Dimensions, View} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Colors from '../../styles/Colors';
// import Colors from '../../styles/Colors';g

const {height} = Dimensions.get('screen');

const AppScreen = (props) => {
  const {children, style} = props;

  return (
    <View style={{...styles.screen, ...style}}>
      <ScrollView
        style={{height: '40%'}}
        contentContainerStyle={styles.scrollView}>
        {children}
      </ScrollView>
    </View>
  );
};

export const AppScreenWithoutScroll = ({children, style}) => {
  return <View style={{...styles.screenNoScroll, ...style}}>{children}</View>;
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  scrollView: {
    // flex: 1,
    // height: height * 0.9,
    justifyContent: 'space-between',
    position: 'relative',
  },
  screenNoScroll: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    justifyContent: 'space-between',
    position: 'relative',
  },
});

export default AppScreen;
