import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {Icon, normalize, Overlay, Input} from 'react-native-elements';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

import BottomCard from './BottomCard';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const {width, height} = Dimensions.get('window');
const transactions = [
  {
    id: '1',
    type: 'credit',
    details: 'Wallet Funding',
    to: 'Shopping Spree Wallet',
    amount: 13400,
  },
  {id: '2', type: 'debit', details: 'Wallet Funding', amount: 13400},
  {id: '3', type: 'debit', details: 'Caba (Fund Transfer)', amount: 513400},
  {
    id: '4',
    type: 'credit',
    details: 'Wallet Funding',
    to: 'Shopping Spree Wallet',
    amount: 13400,
  },
  {id: '5', type: 'debit', details: 'Wallet Funding', amount: 13400},
  {id: '50', type: 'debit', details: 'Wallet Funding', amount: 13400},
  {id: '6', type: 'debit', details: 'Wallet Funding', amount: 513400},
  {id: '70', type: 'credit', details: 'Wallet Funding', amount: 13400},
];

const news = [
  {
    id: '1',
    type: 'credit',
    heading: 'Credit Alert',
    details:
      'Halo... padi, you just received N21,000 from ADEBANJO OLUWANIMBE via giro payment portal',
  },
  {
    id: '2',
    type: 'info',
    heading: 'Credit Alert',
    details:
      'Halo... padi, you just received N21,000 from ADEBANJO OLUWANIMBE via giro payment portal',
  },
  {
    id: '3',
    type: 'credit',
    heading: 'Credit Alert',
    details:
      'Halo... padi, you just received N21,000 from ADEBANJO OLUWANIMBE via giro payment portal',
  },
];

const TransactionCard = (props) => {
  const [visible, setVisible] = useState(false);
  const [overlayView, setOverlayView] = useState('transactions');
  const [newUser, setNewUser] = useState(false);
  console.log(visible);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const toggleUser = (user) => {
    setNewUser(!user);
  };

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
            <Text style={styles.transactionCardText}>{item.details}</Text>
            <Text style={styles.transactionCardTo}>{item.to}</Text>
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

  const newsCard = ({item}) => {
    return (
      <View style={styles.newsCardStyle}>
        <View style={styles.newsCardTextGroup}>
          <View
            style={{
              ...styles.transactionIconBackground,
              backgroundColor:
                item.type === 'credit' ? Colors.GREEN : Colors.GREY,
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
            <Text style={styles.newsCardHeading}>{item.heading}</Text>
            <Text style={styles.newsCardText}>{item.details}</Text>
          </View>
          <View style={{justifyContent: 'flex-end'}}>
            <Icon name="arrow-right" type="font-awesome-5" size={20} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <BottomCard style={{paddingHorizontal: RFValue(10)}}>
      <View
        style={{
          marginTop: 20,
          width: '90%',
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{fontFamily: Fonts.Muli.REGULAR, fontSize: RFPercentage(2)}}>
          Transaction History
        </Text>
        <TouchableOpacity
          // To change rendered content pending dynamic implementation
          // onPress={toggleUser.bind(this, newUser)}
          onPress={toggleOverlay}
          style={{
            borderRadius: 25,
            height: 28,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: Fonts.Muli.BOLD,
              color: Colors.BROWN,
              fontSize: RFPercentage(2),
            }}>
            See all
          </Text>
        </TouchableOpacity>
      </View>
      {newUser && (
        <View style={{height: '100%', justifyContent: 'space-between'}}>
          <View>
            <View
              style={{
                justifyContent: 'center',
                width: '50%',
                height: '50%',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Image
                resizeMode="contain"
                // style={{width: '50%', height: '50%'}}
                source={require('../../assets/images/png/no-transaction-yet.png')}
              />
            </View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: RFValue(15),
                fontFamily: Fonts.Muli.BOLD,
                // marginTop: normalize(-90),
              }}>
              Padi, you have not performed any{'\n'}transactions for this wallet
              yet
            </Text>
          </View>
        </View>
      )}
      {!newUser && (
        <FlatList
          style={{marginVertical: 10}}
          data={transactions}
          renderItem={transactionCard}
          keyExtractor={(item) => item.id}
        />
      )}

      <Overlay
        overlayStyle={styles.overlay}
        isVisible={visible}
        onBackdropPress={toggleOverlay}>
        <View>
          <View style={styles.overlayCancelButton}>
            <Icon onPress={toggleOverlay} name="times" type="font-awesome-5" />
          </View>

          {overlayView === 'transactions' && (
            <View>
              <View style={{paddingTop: 30}}>
                <View style={styles.overlayHeadingContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      setOverlayView('transactions');
                    }}>
                    <Text style={styles.overlayHeading}>Transactions</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setOverlayView('news');
                    }}>
                    <Text
                      style={{...styles.overlayHeading, color: Colors.GREY}}>
                      News & Info
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.overlayLineContainer}>
                  <View style={styles.line} />
                  <View
                    style={{...styles.line, backgroundColor: Colors.LIGHTGREY}}
                  />
                </View>
              </View>
              <FlatList
                style={{marginVertical: 10}}
                data={transactions}
                renderItem={transactionCard}
                keyExtractor={(item) => item.id}
              />
            </View>
          )}
          {overlayView === 'news' && (
            <View>
              <View style={{paddingTop: 30}}>
                <View style={styles.overlayHeadingContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      setOverlayView('transactions');
                    }}>
                    <Text
                      style={{...styles.overlayHeading, color: Colors.GREY}}>
                      Transactions
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setOverlayView('news');
                    }}>
                    <Text style={styles.overlayHeading}>News & Info</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.overlayLineContainer}>
                  <View
                    style={{...styles.line, backgroundColor: Colors.LIGHTGREY}}
                  />
                  <View style={styles.line} />
                </View>
              </View>
              <FlatList
                style={{marginVertical: 10}}
                data={news}
                renderItem={newsCard}
                keyExtractor={(item) => item.id}
              />
            </View>
          )}
        </View>
      </Overlay>
    </BottomCard>
  );
};

export default TransactionCard;

const styles = StyleSheet.create({
  overlay: {
    width: '100%',
    height: height / 1.5,
    position: 'absolute',
    flex: 1,
    backgroundColor: Colors.WHITE,
    bottom: 0,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  overlayCancelButton: {
    height: 50,
    borderRadius: 25,
    width: 50,
    backgroundColor: Colors.WHITE,
    position: 'absolute',
    top: -90,
    justifyContent: 'center',
  },
  overlayHeadingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
  },
  overlayHeading: {
    fontSize: RFPercentage(2),
    fontFamily: Fonts.Mont.BOLD,
    marginBottom: RFPercentage(2),
  },
  overlayLineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  line: {
    marginTop: RFPercentage(2),
    width: '50%',
    height: 3,
    backgroundColor: Colors.PRIMARY,
  },
  newsCardStyle: {
    justifyContent: 'space-between',

    flexDirection: 'row',
    elevation: 5,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 12,
    paddingLeft: 10,
    marginVertical: 4,
    // flex: 8,
    backgroundColor: Colors.WHITE,
  },
  newsCardTextGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  newsCardHeading: {
    fontFamily: Fonts.Muli.BOLD,
    fontSize: RFPercentage(2),
    marginHorizontal: normalize(10),
    // width: '100%',
  },
  newsCardText: {
    fontFamily: Fonts.Muli.REGULAR,
    fontSize: RFPercentage(1.7),
    marginHorizontal: normalize(10),
    color: Colors.GREY,
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
    marginLeft: normalize(10),
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
    marginLeft: normalize(10),
  },
  transactionCardAmount: {
    fontFamily: Fonts.BOLD,
    fontSize: RFValue(14),
  },
  credit: {
    transform: [{rotateZ: '-40deg'}],
  },
});
