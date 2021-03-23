import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import AppInput from '../../components/global/AppInput';
import {AppScreenWithoutScroll} from '../../components/global/AppScreen';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import AppButton from '../../components/global/AppButton';
import {Icon, Overlay} from 'react-native-elements';
import Card from '../../components/global/Card';

import {Context as AppContext} from '../../context/AppContext';
const {width, height} = Dimensions.get('window');

const AccountScreen = (props) => {
  const {fetchUser, state} = useContext(AppContext);

  const {response, isSending} = state;
  const {navigation, route} = props;

  const {amount, action} = route.params;

  let banksData;
  if (action) {
    banksData = [{id: '0', name: 'FeatherPay', sort: '10003'}];
  } else {
    banksData = [
      {id: '0', name: 'DemoPay', sort: '10001'},
      {id: '1', name: 'DemoBills', sort: '10002'},
    ];
  }

  const [wallet, setWallet] = useState('');
  const [walletName, setWalletName] = useState('Select Wallet');
  const [sort, setSort] = useState('');
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const BankList = ({item}) => {
    return (
      <Card style={{marginTop: 10}} style={styles.bankCard} height={50}>
        <TouchableOpacity
          onPress={() => {
            setWalletName(item.name);
            setSort(item.sort);
            setVisible(false);
          }}
          style={{padding: 6, flexDirection: 'row'}}>
          <View
            style={{flex: 5, alignSelf: 'center', marginBottom: RFValue(3)}}>
            <Text style={styles.bankCardText}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </Card>
    );
  };

  return (
    <AppScreenWithoutScroll style={{paddingHorizontal: RFValue(20)}}>
      <View>
        <View style={{marginBottom: RFValue(30)}}>
          <View
            style={{
              paddingTop: RFValue(20),
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon name="chevron-left" type="font-awesome-5" />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: RFPercentage(2),
                marginLeft: RFPercentage(12),
                fontFamily: Fonts.Mont.BOLD,
              }}>
              Enter Information
            </Text>
          </View>
        </View>

        <AppInput
          white
          placeholderTextColor={Colors.GREY}
          inputStyle={{color: Colors.GREY}}
          onChangeText={(wallet) => {
            setWallet(wallet);
          }}
          value={wallet}
          placeholder="Wallet Id"
        />
        <View style={{position: 'relative'}}>
          <TouchableOpacity
            onPress={() => {
              toggleOverlay();
            }}>
            <View style={styles.selectBank}>
              <Text style={{color: Colors.GREY, fontFamily: Fonts.BOLD}}>
                {walletName}
              </Text>
              <Icon
                name="chevron-down"
                color={Colors.GREY}
                size={14}
                type="font-awesome"
              />
            </View>
          </TouchableOpacity>
          {/* <AppInput {...props} /> */}
        </View>
        {response && (
          <Text
            style={{
              color: Colors.PRIMARY,
              fontFamily: Fonts.Mont.MEDIUM,
              fontSize: RFValue(15),
              textAlign: 'center',
            }}>
            {response.message}
          </Text>
        )}
      </View>
      <AppButton
        style={{marginBottom: RFValue(20)}}
        onPress={() => {
          fetchUser({amount, walletName, sort, wallet});
          // navigation.navigate('SummaryScreen', {action: 'transfer'});
        }}>
        {isSending && <ActivityIndicator color={Colors.WHITE} />}

        {!isSending && <Text style={styles.buttonText}>Continue</Text>}
      </AppButton>
      <Overlay
        overlayStyle={{
          width: '100%',
          height: height / 2.5,
          position: 'absolute',
          flex: 1,
          bottom: 0,
        }}
        isVisible={visible}
        onBackdropPress={toggleOverlay}>
        <View>
          <Text
            style={{
              fontSize: RFPercentage(2.2),
              fontFamily: Fonts.REGULAR,
              marginVertical: 5,
              marginLeft: 20,
            }}>
            Select destination wallet
          </Text>
          <View style={styles.line}></View>
          <FlatList
            data={banksData}
            renderItem={BankList}
            keyExtractor={(item) => item.id}
          />
        </View>
      </Overlay>
    </AppScreenWithoutScroll>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  contactContainer: {
    marginHorizontal: RFValue(5),
  },
  contactBg: {
    backgroundColor: Colors.BLACK,
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: RFValue(25),
    alignSelf: 'center',
    marginBottom: RFValue(2),
    justifyContent: 'center',
  },
  contactInitial: {
    fontFamily: Fonts.Muli.SEMIBOLD,
    color: Colors.PRIMARY,
    alignSelf: 'center',
  },
  contactName: {
    textAlign: 'center',
    marginVertical: RFValue(3),
    fontSize: RFPercentage(1.6),
    fontFamily: Fonts.Muli.BOLD,
    justifyContent: 'center',
  },
  contactHandle: {
    fontSize: RFPercentage(1.4),
    textAlign: 'center',
  },
  selectBank: {
    backgroundColor: Colors.LIGHTGREY,
    paddingVertical: RFValue(18),
    paddingHorizontal: RFValue(22),
    borderRadius: 50,
    width: '100%',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },

  inputLabelContainer: {
    position: 'absolute',
    zIndex: 10,
    padding: RFValue(6),
    borderRadius: 30,
    left: RFValue(20),
    top: RFValue(-12),
    backgroundColor: Colors.WHITE,
  },
  inputLabel: {color: Colors.BROWN, fontFamily: Fonts.Muli.SEMIBOLD},
  bankCard: {
    marginVertical: 2,
  },
  bankCardText: {
    fontFamily: Fonts.Muli.REGULAR,
    position: 'relative',
    textAlignVertical: 'center',
    marginTop: 4,
    fontSize: RFPercentage(2.3),
  },
});
