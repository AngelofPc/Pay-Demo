import React, {Component} from 'react';
import {Text, View} from 'react-native';
import PropTypes from 'prop-types';
import AppButton from '../../components/global/AppButton';

export default class Otp extends Component {
  static get propTypes() {
    return {
      options: PropTypes.object,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      showfield: false,
      minutes: this.props.minutes ? this.props.minutes : 0,
      seconds: this.props.seconds ? this.props.seconds : 30,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    clearInterval(this.myInterval);
    this.otptimer();
  }

  otptimer() {
    clearInterval(this.myInterval);
    this.myInterval = setInterval(() => {
      const {seconds, minutes} = this.state;

      if (seconds > 0) {
        this.setState(({seconds}) => ({
          seconds: seconds - 1,
        }));
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.myInterval);
        } else {
          this.setState(({minutes}) => ({
            minutes: minutes - 1,
            seconds: 59,
          }));
        }
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  handleClick(event) {
    this.setState({
      minutes: this.props.minutes ? this.props.minutes : 0,
      seconds: this.props.seconds ? this.props.seconds : 30,
    });
    this.props.resend();
    this.otptimer();
    event.preventDefault();
  }
  //   wrapperFunction(e){
  //     this.props.resend;
  //     this.handleClick.bind(this);
  // }

  render() {
    const textStyle = {
      fontSize: '16px',
      fontFamily: 'Roboto',
      lineHeight: '22px',
      color: this.props.textColor ? this.props.textColor : '#000000',
    };

    const buttonStyling = {
      border: 'none',
      background: this.props.background ? this.props.background : '#0033cc',
      color: this.props.buttonColor ? this.props.buttonColor : '#fff',
      fontSize: '16px',
      lineHeight: '22px',
    };

    return (
      <View style={{}}>
        {this.state.minutes === 0 && this.state.seconds === 0 ? (
          <AppButton style={buttonStyling} onPress={this.handleClick}>
            {this.props.ButtonText ? (
              <Text>{this.props.ButtonText} </Text>
            ) : (
              <Text>Resend</Text>
            )}
          </AppButton>
        ) : (
          <Text>
            {this.props.text ? (
              <Text>{this.props.text} </Text>
            ) : (
              <Text>Time left: </Text>
            )}
            {this.state.minutes < 10
              ? `0${this.state.minutes}`
              : this.state.minutes}
            :
            {this.state.seconds < 10
              ? `0${this.state.seconds}`
              : this.state.seconds}
          </Text>
        )}
      </View>
    );
  }
}
