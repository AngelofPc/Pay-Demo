import React from 'react';
import {StyleSheet} from 'react-native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const AppKeyboardView = ({
  children,
  style,
  contentContainerStyle,
  enableOnAndroid,
}) => {
  return (
    <KeyboardAwareScrollView
      style={{...styles.keyboard, ...style}}
      resetScrollToCoords={{x: 0, y: 0}}
      enableOnAndroid={enableOnAndroid}
      contentContainerStyle={contentContainerStyle}
      scrollEnabled={true}>
      {children}
    </KeyboardAwareScrollView>
  );
};

export default AppKeyboardView;

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },
});
