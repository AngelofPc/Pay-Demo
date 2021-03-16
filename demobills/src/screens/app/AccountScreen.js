import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import AppInput from '../../components/global/AppInput';
import {AppScreenWithoutScroll} from '../../components/global/AppScreen';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import AppButton from '../../components/global/AppButton';
import {Icon, Overlay} from 'react-native-elements';
import Card from '../../components/global/Card';
import trackerApi from '../../api/tracker';

import {Context as AppContext} from '../../context/AppContext';

const {width, height} = Dimensions.get('window');

const banksData = [
  {id: '0', name: 'DemoPay', sort: '10001'},
  {id: '1', name: 'FeatherPay', sort: '10002'},
  {id: '2', name: 'Eyowo', sort: '100009'},
  {id: '4', name: 'Opay', sort: '100009'},
  {id: '5', name: 'Paga', sort: '100009'},
  // {id: '6', name: 'Kuda Bank'},
  // {id: '7', name: 'Polaris Bank'},
  // {id: '8', name: 'United Bank for Africa'},
];

const AccountScreen = (props) => {
  const {fetchUser, isSending} = useContext(AppContext);

  const {navigation, route} = props;

  const {amount} = route.params;

  const [wallet, setWallet] = useState('ade@giroct.com');
  const [walletName, setWalletName] = useState('DemoPay');
  const [sort, setSort] = useState(10001);
  const [visible, setVisible] = useState(false);

  const [loading, setLoading] = useState(false);

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
          {/* <BackBtn
            color={Colors.BLACK}
            onPress={() => {
              navigation.goBack();
            }}
          /> */}
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
          placeholder="WalletID"
        />
        {/* <AppLabelledInput
          editable={fals`e}
          onFocus={() => {
            console.log('Sss');
            toggleOverlay();
          }}
          value={walletName}
          inputLabel="Select Bank"
        /> */}
        <View style={{position: 'relative'}}>
          {/* <View style={styles.inputLabelContainer}>
            <Text style={{...styles.inputLabel, color: Colors.BROWN}}>
              Select Wallet
            </Text>
          </View> */}

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
