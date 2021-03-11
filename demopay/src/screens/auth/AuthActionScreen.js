import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import AppButton from '../../components/global/AppButton';
// import AppScreen from '../../components/global/AppScreen';
import BottomCard from '../../components/section/BottomCard';
import Fonts from '../../styles/Fonts';
import Colors from '../../styles/Colors';
import {AppScreenWithoutScroll} from '../../components/global/AppScreen';

const {width, height} = Dimensions.get('screen');

const AuthActionScreen = (props) => {
  const {navigation} = props;
  return (
    <AppScreenWithoutScroll>
      <ImageBackground
        style={styles.imageBackground}
        source={require('../../assets/images/png/authAction-background.png')}>
        <BottomCard style={styles.bottomCard}>
          <View style={{marginVertical: RFValue(20)}}>
            <Text style={styles.heading}>
              enjoy the best{'\n'}digital wallet life
            </Text>
            <Text style={styles.text}>
              sign in or create an account today with ease{'\n'}and enjoy
              unlimited services using your{'\n'}phone number. yeah that
              simple...
            </Text>
          </View>

          <View style={{marginBottom: RFValue(60)}}>
            <AppButton
              onPress={() => {
                navigation.navigate('LoginScreen');
              }}>
              Login
            </AppButton>

            <AppButton style={styles.blackButton}>
              No account yet?{' '}
              <Text style={{color: Colors.PRIMARY}}>Register</Text>
            </AppButton>
          </View>
        </BottomCard>
      </ImageBackground>
    </AppScreenWithoutScroll>
  );
};

export default AuthActionScreen;

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: height,
    flexDirection: 'column-reverse',
  },
  bottomCard: {position: 'absolute', height: height / 1.7, width: width},
  heading: {
    textAlign: 'center',
    fontSize: RFPercentage(3),
    fontFamily: Fonts.Mont.BOLD,
  },
  text: {
    textAlign: 'center',
    fontFamily: Fonts.Muli.REGULAR,
    fontSize: RFPercentage(1.8),
    marginTop: RFValue(40),
  },
  blackButton: {
    marginTop: RFValue(15),
    backgroundColor: Colors.BLACK,
  },
});
