import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {Overlay} from 'react-native-elements';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

import AppButton from '../../components/global/AppButton';
import Colors from '../../styles/Colors';
import {BackBtn} from '../../components/global/BackButton';
import Fonts from '../../styles/Fonts';
import {AppScreenWithoutScroll} from '../../components/global/AppScreen';
import ImageAlert from '../../components/global/Alert';
import {DetailCard} from '../../components/section/ActionCard';
import {StatusImageAlert} from '../../components/global/Alert';

const {height} = Dimensions.get('screen');
import {Context as AppContext} from '../../context/AppContext';

const CabaTransactionSummaryScreen = (props) => {
  const {navigation, route} = props;

  const {state, transfer} = useContext(AppContext);

  const {isSending, response} = state;

  const {action, amount, data, walletName, sort} = route.params;

  const wallet = data.wallet_id;
  const username = data.username;
  const total = data.total;

  return (
    <AppScreenWithoutScroll style={{backgroundColor: Colors.BLACK}}>
      <View
        source={require('../../assets/images/png/transaction-background.png')}
        style={{
          width: '100%',
          height: height / 3,
          backgroundColor: Colors.BLACK,
        }}>
        <View style={styles.headingContainer}>
          <BackBtn
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text style={styles.pageHeading}>Enter Information</Text>
        </View>
      </View>
      <ImageAlert
        style={{position: 'absolute', bottom: 0, width: '100%'}}
        initial={data.username.charAt(0).toUpperCase()}
        // image={require('../../assets/images/png/image-avatar.png')}
      >
        <View style={styles.textGroup}>
          <Text style={styles.bankname}>{walletName}</Text>
          <Text style={styles.username}>{data.username}</Text>
        </View>

        <DetailCard
          rightTextStyle={{width: '80%'}}
          leftText="Wallet Id"
          rightText={data.wallet_id}
        />
        <DetailCard leftText="Amount" rightText={'₦' + amount} />
        <DetailCard
          leftText="Convenience Charge"
          rightText={'₦' + data.charge}
        />
        <DetailCard leftText="Total" rightText={'₦' + total} />
        <View style={{marginVertical: RFValue(10), marginTop: RFPercentage(8)}}>
          <AppButton
            onPress={() => {
              transfer({wallet, sort, amount, username, data});
            }}>
            {!isSending && 'Proceed'}
            {isSending && <ActivityIndicator color={Colors.WHITE} />}
          </AppButton>
        </View>
      </ImageAlert>
    </AppScreenWithoutScroll>
  );
};

const styles = StyleSheet.create({
  itemGroup: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    paddingVertical: RFValue(15),
  },
  itemText: {
    fontFamily: Fonts.Muli.BOLD,
    fontSize: RFPercentage(2),
    color: Colors.BLACK,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
  pageHeading: {
    color: Colors.WHITE,
    fontSize: RFPercentage(2),
    fontFamily: Fonts.Muli.BOLD,
    marginVertical: RFPercentage(1.6),
    textAlignVertical: 'center',
  },
  textGroup: {
    marginTop: RFPercentage(6),
    marginBottom: RFPercentage(3),
  },
  bankname: {
    fontFamily: Fonts.Mont.SEMIBOLD,
    textAlign: 'center',
    fontSize: RFPercentage(2),
    marginTop: RFPercentage(1),
    textTransform: 'capitalize',
  },
  username: {
    fontFamily: Fonts.Mont.SEMIBOLD,
    textAlign: 'center',
    fontSize: RFPercentage(2),
    marginTop: RFPercentage(1),
    textTransform: 'uppercase',
  },
  amount: {
    fontFamily: Fonts.Mont.BOLD,
    textAlign: 'left',
    fontSize: RFPercentage(5),
    // marginTop: RFPercentage(6),

    marginBottom: RFPercentage(3),
  },
  time: {
    fontFamily: Fonts.Muli.SEMIBOLD,
    marginTop: RFValue(15),
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.GREY,
  },
});

export default CabaTransactionSummaryScreen;
