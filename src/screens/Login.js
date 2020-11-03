import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import colors from '../constants/colors';
import fontSizes from '../constants/fontSizes';
import globalStyling from '../constants/globalStyling';
import {bindActionCreators} from 'redux';
import * as reduxActions from '../redux/actions/actions';
import {connect} from 'react-redux';
import GlobalInput from '../components/GlobalInput';
import GlobalButton from '../components/GlobalButton';

class Login extends React.Component {
  state = {
    showError: false,
    name: '',
  };
  signin = () => {
    if (this.state.name === '') {
      this.setState({showError: 'Kindly Fill All The Fields'});
    } else {
      this.setState({showError: false});
      this.props.reduxActions.signin(this.props.navigation, this.state.name);
    }
  };

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      global.showBottomTab(false);
    });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : null}
        keyboardVerticalOffset={40}
        style={globalStyling.container}>
        <View style={globalStyling.container}>
          <ScrollView
            contentContainerStyle={{justifyContent: 'center', flexGrow: 1}}>
            <View style={styles.view}>
              <View style={styles.logoView}>
                <Image
                  source={require('../assets/images/appIcon.png')}
                  resizeMode="contain"
                  style={globalStyling.imageStyle}
                />
              </View>
              <Text style={globalStyling.headingText}>Todo</Text>
            </View>
            <View style={styles.view}>
              <GlobalInput
                paddingLeft={20}
                borderRadius={5}
                width="90%"
                placeholder="Name"
                placeholderTextColor={colors.blackColor}
                backgroundColor={colors.whiteColor}
                changeText={(name) => {
                  this.setState({name});
                }}
              />

              <GlobalButton
                marginTop={20}
                marginBottom={10}
                borderRadius={5}
                width="90%"
                text={'Login'}
                fontWeight="bold"
                textColor={colors.whiteColor}
                submit={() => {
                  this.signin();
                }}
              />
              {this.state.showError ? (
                <Text style={globalStyling.errorText}>
                  {this.state.showError}
                </Text>
              ) : null}
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  headingText: {
    color: colors.themeColor,
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    marginLeft: 5,
    marginTop: 20,
  },
  logoView: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    marginVertical: 10,
  },
});

const mapStateToProps = (state) => ({
  reduxState: state.reducers,
});

const mapDispatchToProps = (dispatch) => ({
  reduxActions: bindActionCreators(reduxActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
