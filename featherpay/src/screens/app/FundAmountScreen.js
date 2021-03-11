import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {Input} from 'react-native-elements';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import AppButton from '../../components/global/AppButton';
import {AppScreenWithoutScroll} from '../../components/global/AppScreen';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

import VirtualKeyboard from 'react-native-virtual-keyboard';
import BottomCard from '../../components/section/BottomCard';
import WalletCard from '../../components/global/WalletCard';
import {BackBtn} from '../../components/global/BackButton';

const {width, height} = Dimensions.get('screen');

const CabaEnterAmountScreen = (props) => {
  const {navigation, route} = props;

  const {action} = route.params;
  console.log(action);

  const [amount, setAmount] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const changeAmountHandler = (amount) => {
    setAmount(amount);
  };

  const nextHandler = () => {
    setLoading(true);
    if (action === 'transfer') {
      navigation.navigate('AccountScreen');
    } else {
      setTimeout(() => {
        navigation.navigate('SuccessScreen', {action: 'fund'});
        setLoading(false);
      }, 3000);
    }
  };

  return (
    <AppScreenWithoutScroll style={{backgroundColor: Colors.PRIMARY}}>
      <View>
        <View style={styles.topContainer}>
          <BackBtn
            onPress={() => {
              navigation.goBack();
            }}
          />

          <View style={styles.addWallet}>
            <Text
              style={{
                color: Colors.WHITE,
                fontFamily: Fonts.Muli.BOLD,
                fontSize: RFPercentage(2.5),
              }}>
              Enter {action !== 'pin' ? 'Amount' : 'Transaction Pin'}
            </Text>
          </View>
        </View>
        {action !== 'pin' && (
          <View style={{}}>
            <WalletCard
              onPress={() => {
                navigation.navigate('FundAmountScreen');
              }}
              amount="225,000"
            />
          </View>
        )}
      </View>
      <BottomCard style={{backgroundColor: Colors.PRIMARY}}>
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <View style={styles.nairaContainer}>
            <Text style={styles.naira}>₦</Text>
          </View>
          <Input
            keyBoardType="number-pad"
            editable={false}
            value={amount}
            containerStyle={{
              width: '40%',
            }}
            inputContainerStyle={{
              borderBottomWidth: 0,
            }}
            style={styles.input}
          />
        </View>
        <View style={styles.line}></View>
        <VirtualKeyboard
          color="white"
          decimal
          cellStyle={{padding: RFValue(6)}}
          pressMode="string"
          onPress={changeAmountHandler}
        />

        <AppButton style={styles.button} onPress={nextHandler}>
          {loading && <ActivityIndicator color={Colors.PRIMARY} />}

          {!loading && <Text style={styles.buttonText}>Continue</Text>}
        </AppButton>
      </BottomCard>
    </AppScreenWithoutScroll>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 20,
  },
  addWallet: {
    marginTop: RFPercentage(0.5),
    // marginBottom: 30,
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    paddingVertical: RFValue(18),
    flexDirection: 'row',
    width: '68%',
    justifyContent: 'space-between',
  },
  switchIcon: {
    backgroundColor: Colors.WHITE,
    padding: 10,
    borderRadius: 20,
  },
  walletText: {
    fontFamily: Fonts.Muli.BOLD,
    fontSize: RFPercentage(1.8),
  },
  button: {
    marginVertical: RFValue(10),
    width: '80%',
    borderWidth: 1,
    borderColor: Colors.WHITE,
    backgroundColor: Colors.WHITE,
  },
  buttonText: {
    color: Colors.PRIMARY,
  },
  nairaContainer: {
    backgroundColor: 'rgba(5,5,5,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFPercentage(1),
    width: RFPercentage(6),
    height: RFPercentage(6),
  },
  naira: {
    fontSize: RFPercentage(5),
    color: Colors.WHITE,
  },
  input: {
    fontSize: RFPercentage(3),
    marginTop: -2,
    color: Colors.WHITE,
    fontFamily: Fonts.Muli.BOLD,
    alignSelf: 'center',
  },
  line: {
    height: 1,
    alignSelf: 'center',
    width: '60%',
    marginVertical: RFValue(-10),
    backgroundColor: Colors.WHITE,
  },
});

export default CabaEnterAmountScreen;
