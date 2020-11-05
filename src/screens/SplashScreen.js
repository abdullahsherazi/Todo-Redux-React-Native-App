import React, {useState, useEffect} from 'react';
import {View, Animated, StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import * as reduxActions from '../redux/actions/actions';
import {connect} from 'react-redux';
import colors from '../constants/colors';

const SplashScreen = ({navigation, reduxState, reduxActions}) => {
  let springValue = new Animated.Value(0.4);

  let spring = () => {
    Animated.spring(springValue, {
      toValue: 1,
      friction: 1,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    global.setAppContainerColor(colors.themeColor);
    spring();
    let timeOutNavigate = setTimeout(() => {
      reduxActions.checkUser(navigation);
      clearTimeout(timeOutNavigate);
    }, 3000);

    const unsubscribe = navigation.addListener('focus', () => {
      global.showBottomTab(false);
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        style={{
          width: 180,
          height: 180,
          transform: [{scale: springValue}],
        }}
        resizeMode="contain"
        source={require('../assets/images/appIcon.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => ({
  reduxState: state.reducers,
});

const mapDispatchToProps = (dispatch) => ({
  reduxActions: bindActionCreators(reduxActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
