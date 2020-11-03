import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {bindActionCreators} from 'redux';
import * as reduxActions from '../redux/actions/actions';
import {connect} from 'react-redux';
import colors from '../constants/colors';
import fontSizes from '../constants/fontSizes';

class GlobalHeader extends Component {
  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.text}>{this.props.headingText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.themeColor,
    elevation: 0,
    height: 70,
    borderBottomWidth: 0,
    justifyContent: 'flex-end',
    paddingLeft: 10,
  },
  text: {
    color: colors.whiteColor,
    fontSize: fontSizes.large,
  },
});

const mapStateToProps = (state) => ({
  reduxState: state.reducers,
});

const mapDispatchToProps = (dispatch) => ({
  reduxActions: bindActionCreators(reduxActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GlobalHeader);
