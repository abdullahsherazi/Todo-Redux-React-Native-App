import React, {Component} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../constants/colors';
import * as RootNavigation from './RootNavigation.js';
import {bindActionCreators} from 'redux';
import * as reduxActions from '../redux/actions/actions';
import {connect} from 'react-redux';

class BottomTab extends Component {
  componentDidMount() {
    global.setFocused = (item) => {
      if (item === 'home') {
        this.setState({
          home: true,
          search: false,
          profile: false,
          contactUs: false,
        });
      } else if (item === 'search') {
        this.setState({
          home: false,
          search: true,
          profile: false,
          contactUs: false,
        });
      } else if (item === 'profile') {
        this.setState({
          home: false,
          search: false,
          profile: true,
          contactUs: false,
        });
      } else if (item === 'contactUs') {
        this.setState({
          home: false,
          search: false,
          profile: false,
          contactUs: true,
        });
      } else {
        this.setState({
          home: false,
          search: false,
          profile: false,
          contactUs: false,
        });
      }
    };
  }
  state = {
    home: false,
    search: false,
    profile: false,
    contactUs: false,
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.seperator, styles.additionalHomeViewStyle]}
            onPress={() => RootNavigation.navigate('Home')}>
            <View style={styles.imageView}>
              <Image
                source={require('../assets/images/dash_.png')}
                resizeMode="contain"
                style={
                  this.state.home ? styles.focusedImage : styles.unFocusedImage
                }
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.seperator}
            onPress={() => RootNavigation.navigate('Search')}>
            <View style={styles.imageView}>
              <Image
                source={require('../assets/images/search.png')}
                resizeMode="contain"
                style={
                  this.state.search
                    ? styles.focusedImage
                    : styles.unFocusedImage
                }
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.seperator}
            onPress={() => {
              if (Object.keys(this.props.reduxState.userdata).length === 0) {
                RootNavigation.navigate('GettingStarted');
              } else {
                RootNavigation.navigate('MyAccount');
              }
            }}>
            <View style={styles.profileImageView}>
              <Image
                source={require('../assets/images/user.png')}
                resizeMode="contain"
                style={
                  this.state.profile
                    ? styles.focusedImage
                    : styles.unFocusedImage
                }
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.seperator, styles.additionalContactUsViewStyle]}
            onPress={() => RootNavigation.navigate('ContactUs')}>
            <View style={styles.imageView}>
              <Image
                source={require('../assets/images/call.png')}
                resizeMode="contain"
                style={
                  this.state.contactUs
                    ? styles.focusedImage
                    : styles.unFocusedImage
                }
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.whiteColor,
    overflow: 'hidden',
    width: '100%',
    alignSelf: 'center',
    height: 60,
  },
  footer: {
    flexDirection: 'row',
    height: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    overflow: 'hidden',
    borderWidth: 0.5,
    overflow: 'hidden',
    backgroundColor: colors.greyDarkTextColor,
  },
  additionalContactUsViewStyle: {
    borderRightWidth: 0,
    borderTopRightRadius: 20,
  },
  additionalHomeViewStyle: {
    borderTopLeftRadius: 20,
  },
  seperator: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: colors.whiteColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  imageView: {height: 25, width: 25, overflow: 'hidden'},
  profileImageView: {height: 35, width: 30, overflow: 'hidden'},
  focusedImage: {
    height: '100%',
    width: '100%',
    tintColor: colors.themeColor,
  },
  unFocusedImage: {
    height: '100%',
    width: '100%',
    tintColor: colors.whiteColor,
  },
});

const mapStateToProps = (state) => ({
  reduxState: state.reducers,
});

const mapDispatchToProps = (dispatch) => ({
  reduxActions: bindActionCreators(reduxActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BottomTab);
