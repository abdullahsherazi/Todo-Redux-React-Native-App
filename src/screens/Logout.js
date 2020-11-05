import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../constants/colors';
import globalStyling from '../constants/globalStyling';
import {bindActionCreators} from 'redux';
import * as reduxActions from '../redux/actions/actions';
import {connect} from 'react-redux';
import GlobalHeader from '../components/GlobalHeader';
import GlobalButton from '../components/GlobalButton';

const Logout = ({navigation, reduxState, reduxActions}) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      global.showBottomTab(true).then(() => {
        global.setFocused('logout');
      });
    });
    return unsubscribe;
  }, []);

  return (
    <View style={globalStyling.container}>
      <GlobalHeader
        navigation={navigation}
        headingText={`Hello, ${reduxState.userdata.name}`}
      />

      <View style={styles.view}>
        <GlobalButton
          backgroundColor={colors.whiteColor}
          borderColor={colors.greyColor}
          marginTop={20}
          borderWidth={0.5}
          marginBottom={10}
          borderRadius={5}
          width="90%"
          text={'Logout'}
          textColor={colors.redErrorColor}
          submit={() => {
            reduxActions.logout(navigation);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
});

const mapStateToProps = (state) => ({
  reduxState: state.reducers,
});

const mapDispatchToProps = (dispatch) => ({
  reduxActions: bindActionCreators(reduxActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
