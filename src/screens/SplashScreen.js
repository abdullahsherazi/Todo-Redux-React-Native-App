import React from 'react';
import {View, Animated, StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import * as reduxActions from '../redux/actions/actions';
import {connect} from 'react-redux';
import colors from '../constants/colors';

class SplashScreen extends React.Component {
  constructor() {
    super();
    this.springValue = new Animated.Value(0.4);
  }
  componentDidMount() {
    global.setAppContainerColor(colors.themeColor);
    this.spring();
    let timeOutNavigate = setTimeout(() => {
      this.props.reduxActions.checkUser(this.props.navigation);
      clearTimeout(timeOutNavigate);
    }, 3000);

    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      global.showBottomTab(false);
    });
  }
  spring() {
    Animated.spring(this.springValue, {
      toValue: 1,
      friction: 1,
      useNativeDriver: true,
    }).start();
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  render() {
    return (
      <View style={styles.container}>
        <Animated.Image
          style={{
            width: 180,
            height: 180,
            transform: [{scale: this.springValue}],
          }}
          resizeMode="contain"
          source={require('../assets/images/appIcon.png')}
        />
      </View>
    );
  }
}

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
