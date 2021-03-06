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
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

const CabaTransactionModelScreen = (props) => {
  const {navigation} = props;

  const [visible, setVisible] = useState(false);
  const [fcmToken, setfcmToken] = useState(null);

  const {sendFcmToken, state} = useContext(AppContext);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    getFcmToken();

    sendFcmToken({fcmToken});
  }, [fcmToken]);

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      // Prevent default behavior of leaving the screen
      e.preventDefault();
    }),
      [navigation];
  });

  const getFcmToken = async () => {
    const appFcmToken = await messaging().getToken();

    if (appFcmToken) {
      setfcmToken(appFcmToken);
    }
  };
  const {balance, transactions, username, wallet_id} = state;
  const [user, setUser] = useState(username);

  console.log(transactions);
  // const uniqueTransactions = new Set(transactions);

  // const newTransactions = [...uniqueTransactions];

  // const newTransactions = transactions.filter(
  //   (item, index) => transactions.indexOf(item) === index,
  // );

  // console.log(newTransactions);

  const transactionCard = ({item}) => {
    const {summary} = item;
    const splitSum = summary.split('-');
    const wallet = splitSum[0];
    const sender = splitSum[1];

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
            <Text style={styles.transactionCardTo}>{wallet}</Text>
            <Text style={styles.transactionCardTo}>{sender}</Text>
          </View>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text
            style={[
              styles.transactionCardAmount,
              item.type === 'credit' ? styles.green : styles.red,
            ]}>
            {item.type === 'credit' ? '' : '- '}???{item.amount}
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
          <View
            style={{
              height: 60,
              width: 60,
              borderRadius: 15,
              backgroundColor: Colors.PRIMARY,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: RFValue(20),
                color: Colors.WHITE,
                fontFamily: Fonts.Mont.BOLD,
                // alignSelf: 'center',
              }}>
              {user && user.charAt(0).toUpperCase()}
            </Text>
          </View>

          <View style={{marginLeft: RFValue(10)}}>
            <Text
              style={{
                fontFamily: Fonts.Mont.REGULAR,
                fontSize: RFValue(12),
              }}>
              Wallet ID:
              <Text
                style={{
                  fontFamily: Fonts.Mont.SEMIBOLD,
                  // fontSize: RFValue(13),
                }}>
                {' '}
                {wallet_id}
              </Text>
            </Text>
            <Text
              style={{fontFamily: Fonts.Mont.REGULAR, fontSize: RFValue(12)}}>
              Username:
              <Text style={{fontFamily: Fonts.Mont.BOLD}}> {user}</Text>
            </Text>
          </View>
        </View>
        <WalletCard
          textColor={Colors.WHITE}
          amount={balance}
          onPress={() => {
            navigation.navigate('FundAmountScreen', {action: 'fund'});
          }}
        />
      </View>
      <Text
        style={{
          paddingHorizontal: RFValue(20),
          marginVertical: RFValue(20),
          fontFamily: Fonts.Mont.REGULAR,
          fontSize: RFPercentage(2),
        }}>
        Wallet Actions
      </Text>
      <View style={{paddingHorizontal: RFValue(20), marginBottom: RFValue(20)}}>
        <View style={styles.cardContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('FundAmountScreen', {action: 'fund'});
            }}
            style={styles.card}>
            <View
              style={{...styles.arrowContainer, backgroundColor: '#00DDB3'}}>
              <Icon
                name="arrow-down-left"
                color={Colors.WHITE}
                type="feather"
                size={35}
              />
            </View>
            <View style={styles.linkGroup}>
              <Text style={styles.linkText}>Fund Wallet</Text>
              <Icon name="arrow-right" color={Colors.BLACK} type="feather" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('FundAmountScreen', {action: 'transfer'});
            }}
            style={styles.card}>
            <View
              style={{
                ...styles.arrowContainer,
                backgroundColor: '#DD0077',
              }}>
              <Icon
                name="arrow-up-right"
                size={35}
                color={Colors.WHITE}
                type="feather"
              />
            </View>
            <View style={styles.linkGroup}>
              <Text style={styles.linkText}>Transfer</Text>
              <Icon name="arrow-right" color={Colors.BLACK} type="feather" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{...styles.cardContainer, marginTop: RFValue(20)}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('FundAmountScreen', {action: 'withdraw'});
            }}
            style={styles.card}>
            <View
              style={{...styles.arrowContainer, backgroundColor: Colors.BLACK}}>
              <Icon
                name="briefcase"
                size={30}
                // style={{transform: [{rotateZ: '135deg'}]}}
                color={Colors.WHITE}
                type="font-awesome-5"
              />
            </View>
            <View style={styles.linkGroup}>
              <Text style={styles.linkText}>Withdraw</Text>
              <Icon name="arrow-right" color={Colors.BLACK} type="feather" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleOverlay} style={styles.card}>
            <View
              style={{
                ...styles.arrowContainer,
                borderRadius: RFValue(23),
                backgroundColor: Colors.ACCENT,
              }}>
              <Icon
                name="activity"
                size={35}
                color={Colors.WHITE}
                type="feather"
              />
            </View>
            <View style={styles.linkGroup}>
              <Text style={styles.linkText}>History</Text>
              <Icon name="arrow-right" color={Colors.BLACK} type="feather" />
            </View>
          </TouchableOpacity>
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
    elevation: 1,
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
    fontFamily: Fonts.Mont.REGULAR,
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
