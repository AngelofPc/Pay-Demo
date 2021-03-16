import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import {Icon, Overlay} from 'react-native-elements';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import AppScreen from '../../components/global/AppScreen';
import WalletCard from '../../components/global/WalletCard';

import messaging from '@react-native-firebase/messaging';
import {Context as AppContext} from '../../context/AppContext';

import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const {width, height} = Dimensions.get('window');

const CabaTransactionModelScreen = (props) => {
  const {navigation} = props;

  const [visible, setVisible] = useState(false);
  const [fcmToken, setfcmToken] = useState(null);

  const {sendFcmToken, state, login, clearResponse} = useContext(AppContext);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    getFcmToken();

    sendFcmToken({fcmToken});
  }, [fcmToken]);

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
      console.log('Your Firebase Token is:', fcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
  };

  const {balance, transactions} = state;

  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert('Hold on!', 'Are you sure you want to go back?', [
  //       {
  //         text: 'Cancel',
  //         onPress: () => null,
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'YES',
  //         onPress: async () => {
  //           await AsyncStorage.removeItem('token');
  //           await AsyncStorage.removeItem('balance');
  //           await AsyncStorage.removeItem('transactions');
  //           BackHandler.exitApp();
  //         },
  //       },
  //     ]);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // }, []);

  const transactionCard = ({item}) => {
    return (
      <View style={styles.transactionCardStyle}>
        <View style={styles.transactionCardTextGroup}>
          <View
            style={{
              ...styles.transactionIconBackground,
              backgroundColor:
                item.type === 'credit' ? Colors.GREEN : Colors.RED,
            }}>
            <Icon
              color={Colors.WHITE}
              name={item.type === 'credit' ? 'arrow-left' : 'arrow-right'}
              style={styles.credit}
              size={20}
              type="font-awesome-5"
            />
          </View>
          <View>
            <Text style={styles.transactionCardText}>{item.title}</Text>
            <Text style={styles.transactionCardTo}>{item.summary}</Text>
          </View>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text
            style={[
              styles.transactionCardAmount,
              item.type === 'credit' ? styles.green : styles.red,
            ]}>
            {item.type === 'credit' ? '' : '- '}₦{item.amount}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <AppScreen>
      <View style={{paddingTop: RFPercentage(4)}}>
        <View
          style={{
            paddingHorizontal: RFValue(20),
            flexDirection: 'row',
            marginBottom: RFValue(20),
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/images/png/image.jpg')}
            style={{width: 60, height: 60, borderRadius: 15}}
          />
          <View style={{marginLeft: RFValue(20)}}>
            <Text
              style={{fontFamily: Fonts.Mont.SEMIBOLD, fontSize: RFValue(16)}}>
              Helena Ojo-Daniels
            </Text>
            <Text style={{fontFamily: Fonts.Mont.BLACK, fontSize: RFValue(15)}}>
              @henoj34
            </Text>
          </View>
        </View>
        <WalletCard
          // color={Colors.PRIMARY}
          walletID="0124545454"
          textColor={Colors.WHITE}
          amount={balance}
          cashback="65"
          subtractedAmount="6,500"
          onPress={() => {
            navigation.navigate('FundAmountScreen');
          }}
        />
      </View>
      <Text
        style={{
          paddingHorizontal: RFValue(20),
          marginVertical: RFValue(20),
          fontFamily: Fonts.Muli.BOLD,
          fontSize: RFPercentage(2),
        }}>
        Wallet Actions
      </Text>
      <View style={{paddingHorizontal: RFValue(20), marginBottom: RFValue(20)}}>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <View
              style={{...styles.arrowContainer, backgroundColor: '#00DDB3'}}>
              <Icon
                name="arrow-down-left"
                color={Colors.WHITE}
                type="feather"
              />
            </View>
            <TouchableOpacity
              style={styles.linkGroup}
              onPress={() => {
                navigation.navigate('FundAmountScreen', {action: 'fund'});
              }}>
              <Text style={styles.linkText}>Add Cash</Text>
              <Icon name="arrow-right" color={Colors.BLACK} type="feather" />
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            <View
              style={{
                ...styles.arrowContainer,
                backgroundColor: '#DD0077',
              }}>
              <Icon name="arrow-up-right" color={Colors.WHITE} type="feather" />
            </View>
            <TouchableOpacity
              style={styles.linkGroup}
              onPress={() => {
                navigation.navigate('FundAmountScreen', {action: 'transfer'});
              }}>
              <Text style={styles.linkText}>Transfer</Text>
              <Icon name="arrow-right" color={Colors.BLACK} type="feather" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{...styles.cardContainer, marginTop: RFValue(20)}}>
          <View style={styles.card}>
            <View
              style={{...styles.arrowContainer, backgroundColor: Colors.BLACK}}>
              <Icon
                name="briefcase"
                // style={{transform: [{rotateZ: '135deg'}]}}
                color={Colors.WHITE}
                type="font-awesome-5"
              />
            </View>
            <TouchableOpacity style={styles.linkGroup}>
              <Text style={styles.linkText}>Withdraw</Text>
              <Icon name="arrow-right" color={Colors.BLACK} type="feather" />
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            <View
              style={{
                ...styles.arrowContainer,
                backgroundColor: Colors.ACCENT,
              }}>
              <Icon name="activity" color={Colors.WHITE} type="feather" />
            </View>
            <TouchableOpacity style={styles.linkGroup} onPress={toggleOverlay}>
              <Text style={styles.linkText}>History</Text>
              <Icon name="arrow-right" color={Colors.BLACK} type="feather" />
            </TouchableOpacity>
          </View>
        </View>
        <Overlay
          onBackdropPress={toggleOverlay}
          overlayStyle={styles.overlayStyle}
          isVisible={visible}>
          <>
            <View
              style={{
                marginTop: 20,
                width: '90%',
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontFamily: Fonts.Mont.BOLD,
                  fontSize: RFPercentage(2),
                }}>
                Transaction History
              </Text>
            </View>

            <FlatList
              style={{marginVertical: 10}}
              data={transactions}
              renderItem={transactionCard}
              keyExtractor={(item) => item.id}
            />
          </>
        </Overlay>
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  cardContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  card: {
    elevation: 8,
    width: '48%',
    borderRadius: 10,
    padding: RFValue(15),
    backgroundColor: Colors.WHITE,
  },
  arrowContainer: {
    backgroundColor: Colors.GREEN,
    borderRadius: RFValue(23),
    height: RFValue(45),
    width: RFValue(45),
    justifyContent: 'center',
  },
  linkGroup: {
    marginTop: RFValue(6),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  linkText: {
    fontSize: RFPercentage(2),
    fontFamily: Fonts.Muli.SEMIBOLD,
  },
  overlayStyle: {
    width: '100%',
    height: height / 1.5,
    position: 'absolute',
    flex: 1,
    backgroundColor: Colors.WHITE,
    bottom: 0,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  transactionCardStyle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    elevation: 5,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 15,
    marginVertical: 4,
    backgroundColor: Colors.WHITE,
  },
  transactionCardTextGroup: {flexDirection: 'row', alignItems: 'center'},
  transactionCardText: {
    fontFamily: Fonts.Muli.BOLD,
    fontSize: RFPercentage(2),
    marginLeft: RFValue(10),
  },
  transactionIconBackground: {
    height: RFValue(40),
    width: RFValue(40),
    borderRadius: RFValue(20),
    justifyContent: 'center',
  },
  transactionCardTo: {
    fontFamily: Fonts.MEDIUM,
    color: Colors.GREY,
    fontSize: RFPercentage(1.5),
    marginLeft: RFValue(10),
  },
  transactionCardAmount: {
    fontFamily: Fonts.BOLD,
    fontSize: RFValue(14),
  },
  credit: {
    transform: [{rotateZ: '-40deg'}],
  },
  green: {color: Colors.GREEN, fontFamily: Fonts.Mont.BOLD},
  red: {color: Colors.RED, fontFamily: Fonts.Mont.BOLD},
});

export default CabaTransactionModelScreen;
