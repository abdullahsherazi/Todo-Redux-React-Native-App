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
      if (item === 'todos') {
        this.setState({
          todos: true,
          addTodo: false,
          logout: false,
        });
      } else if (item === 'addTodo') {
        this.setState({
          todos: false,
          addTodo: true,
          logout: false,
        });
      } else if (item === 'logout') {
        this.setState({
          todos: false,
          addTodo: false,
          logout: true,
        });
      } else {
        this.setState({
          todos: false,
          addTodo: false,
          logout: false,
        });
      }
    };
  }
  state = {
    todos: false,
    addTodo: false,
    logout: true,
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.seperator}
          onPress={() => RootNavigation.navigate('Todos')}>
          <View style={styles.imageView}>
            <Image
              source={require('../assets/images/feed.png')}
              resizeMode="contain"
              style={
                this.state.todos ? styles.focusedImage : styles.unFocusedImage
              }
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.seperator}
          onPress={() => RootNavigation.navigate('AddTodo')}>
          <View style={styles.imageView}>
            <Image
              source={require('../assets/images/add.png')}
              resizeMode="contain"
              style={
                this.state.addTodo ? styles.focusedImage : styles.unFocusedImage
              }
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.seperator}
          onPress={() => RootNavigation.navigate('Logout')}>
          <View style={styles.profileImageView}>
            <Image
              source={require('../assets/images/profile.png')}
              resizeMode="contain"
              style={
                this.state.logout ? styles.focusedImage : styles.unFocusedImage
              }
            />
          </View>
        </TouchableOpacity>
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
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: colors.greyTextColor,
    paddingHorizontal: '20%',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageView: {height: 35, width: 35, overflow: 'hidden'},
  profileImageView: {height: 35, width: 30, overflow: 'hidden'},
  focusedImage: {
    height: '100%',
    width: '100%',
    tintColor: colors.themeColor,
  },
  unFocusedImage: {
    height: '100%',
    width: '100%',
    tintColor: colors.greyTextColor,
  },
});

const mapStateToProps = (state) => ({
  reduxState: state.reducers,
});

const mapDispatchToProps = (dispatch) => ({
  reduxActions: bindActionCreators(reduxActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BottomTab);
