import React from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import colors from '../constants/colors';
import {bindActionCreators} from 'redux';
import * as reduxActions from '../redux/actions/actions';
import {connect} from 'react-redux';

class Loader extends React.Component {
  render() {
    return this.props.reduxState.loading ? (
      <View style={styles.fullScreenView}>
        <ActivityIndicator size="large" color={colors.themeColor} />
      </View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  fullScreenView: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blackColor,
    opacity: 0.7,
  },
});

const mapStateToProps = (state) => ({
  reduxState: state.reducers,
});

const mapDispatchToProps = (dispatch) => ({
  reduxActions: bindActionCreators(reduxActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
