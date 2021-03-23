import React, {useState, useReducer, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet, Keyboard} from 'react-native';
import {Input, Icon, normalize} from 'react-native-elements';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const AppInput = (props) => {
  const {
    type,
    passwordIconColor,
    leftIcon,
    rightIcon,
    iconColor,
    inputStyle,
    rightIconSize,
  } = props;
  const [text, setText] = useState('');
  const [focus, setFocus] = useState(false);

  const [secure, setSecure] = useState(true);
  const rightIcn = {
    type: 'font-awesome',
    name: rightIcon,
    color: iconColor || Colors.GREY,
    size: rightIconSize || 20,
  };

  const showPassword = () => {
    setSecure(!secure);
  };

  const visibility = (
    <Icon
      name={secure === true ? 'ios-eye-off' : 'ios-eye'}
      type="ionicon"
      color={Colors.WHITE}
      onPress={showPassword}
    />
  );

  return (
    <View style={styles.formControl}>
      <Input
        blurOnSubmit
        {...props}
        placeholderTextColor={props.white ? Colors.GREY : Colors.BLACK}
        secureTextEntry={type === 'password' || type === 'pin' ? secure : false}
        leftIcon={{type: 'Ionicons', name: leftIcon, color: iconColor}}
        rightIcon={type === 'password' ? visibility : rightIcn}
        style={[
          styles.input,
          inputStyle,
          focus ? styles.focused : styles.notFocused,
        ]}
        inputContainerStyle={[
          styles.inputContainer,
          props.style,
          props.white ? styles.white : styles.primary,
          focus ? styles.focusedOutline : '',
        ]}
        onFocus={() => {
          setFocus(true);
          // console.log(focus);
        }}
        onBlur={() => {
          setFocus(false);
        }}
      />
    </View>
  );
};

export const AppLabelledInput = (props) => {
  const {inputLabel, labelColor} = props;
  return (
    <View style={{position: 'relative'}}>
      <View style={styles.inputLabelContainer}>
        <Text style={{...styles.inputLabel, color: labelColor || Colors.BROWN}}>
          {inputLabel}
        </Text>
      </View>
      <AppInput {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    alignSelf: 'center',
    width: '105%',
    // backgroundColor: Colors.PRIMARY,
  },

  white: {
    backgroundColor: Colors.LIGHTGREY,
  },
  primary: {
    backgroundColor: Colors.WHITE,
  },
  inputContainer: {
    borderBottomWidth: 0,
    borderWidth: 0,
    borderRadius: 50,
    backgroundColor: Colors.SECONDARY,
    paddingHorizontal: RFValue(20),
    paddingVertical: RFValue(8),
  },
  input: {
    color: Colors.BLACK,
    fontFamily: Fonts.Muli.BOLD,
    fontSize: RFValue(14),
    width: '100%',
  },
  focused: {
    color: Colors.BLACK,
  },
  focusedOutline: {
    borderBottomWidth: 1,
    borderColor: Colors.PRIMARY,
    borderWidth: 1,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    // fontFamily: "open-sans",
    color: 'red',
    fontSize: 13,
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
});

export default AppInput;
