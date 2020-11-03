import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
} from 'react-native';
import colors from '../constants/colors';
import fontSizes from '../constants/fontSizes';
import {bindActionCreators} from 'redux';
import * as reduxActions from '../redux/actions/actions';
import {connect} from 'react-redux';
import GlobalButton from '../components/GlobalButton';
import GlobalInput from '../components/GlobalInput';
import globalStyling from '../constants/globalStyling';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import i18n from '../constants/languages';
import GlobalHeader from '../components/GlobalHeader';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.email = React.createRef();
    this.phoneNumber = React.createRef();
    this.password = React.createRef();
    this.confirmPassword = React.createRef();
    this.state = {
      emailAddress: '',
      password: '',
      error: false,
      validEmail: false,
      fullName: '',
      phoneNumber: '',
      confirmPassword: '',
      gender: '',
      showDatePicker: false,
      dateOfBirth: false,
      showPassword: false,
      showConfirmPassword: false,
      genderMaleSelected: false,
      genderFemaleSelected: false,
    };
  }
  signup = () => {
    // this.props.reduxActions.signup(this.props.navigation, user);
    if (
      this.state.emailAddress === '' ||
      this.state.password === '' ||
      this.state.fullName === '' ||
      this.state.phoneNumber === '' ||
      // this.state.gender === "" ||
      // this.state.dateOfBirth === "" ||
      this.state.confirmPassword === ''
      // this.state.genderMaleSelected === !this.state.genderFemaleSelected
    ) {
      this.setState({error: i18n.kindlyFillAllTheFields});
    } else if (this.state.gender === '') {
      this.setState({error: i18n.kindlySelectTheGender});
    } else if (this.state.validEmail === false) {
      this.setState({error: i18n.kindlyEnterCorrectEmail});
    } else if (this.state.password !== this.state.confirmPassword) {
      this.setState({error: i18n.passwordAndConfirmPasswordDoesnMatch});
    } else if (this.state.password.length < 8) {
      this.setState({error: i18n.passwordLengthShoultBeGreaterThan8});
    } else if (this.state.phoneNumber.trim().length !== 8) {
      this.setState({error: i18n.phoneNumberLengthShouldBeGreaterThan8});
    } else {
      this.setState({error: false});

      let user = {
        name: this.state.fullName,
        email: this.state.emailAddress,
        billing_phone: this.state.phoneNumber,
        gender: this.state.gender,
        date_of_birth: this.state.dateOfBirth,
        password: this.state.password,
        action: 'register',
      };
      this.props.reduxActions.signup(
        this.props.navigation,
        user,
        typeof this.props.route.params === 'undefined' ? false : true,
      );
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
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={40}
        style={globalStyling.container}>
        <View style={globalStyling.container}>
          <GlobalHeader
            navigation={this.props.navigation}
            backArrow={true}
            // appIcon={true}
          />
          <ScrollView>
            <View style={styles.logoView}>
              <Image
                source={require('../assets/images/appIcon.png')}
                resizeMode="contain"
                style={globalStyling.imageStyle}
              />
            </View>
            <Text style={globalStyling.headingText}>{i18n.signUp}</Text>
            <GlobalInput
              ref=""
              submitEditing={() => {
                this.email.current.focus();
              }}
              returnKeyType="next"
              marginTop={10}
              paddingLeft={20}
              borderRadius={10}
              width={'80%'}
              placeholder={'Full Name*'}
              backgroundColor={colors.whiteColor}
              changeText={(fullName) => this.setState({fullName})}
            />

            <GlobalInput
              ref={this.email}
              submitEditing={() => {
                this.phoneNumber.current.focus();
              }}
              returnKeyType="next"
              paddingLeft={20}
              borderRadius={10}
              width={'80%'}
              placeholder={'Email*'}
              backgroundColor={colors.whiteColor}
              changeText={(email) => {
                const emailCheckRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
                this.setState({emailAddress: email});
                if (emailCheckRegex.test(String(email)) === true) {
                  this.setState({validEmail: true});
                } else if (emailCheckRegex.test(String(email)) === false) {
                  this.setState({validEmail: false});
                }
              }}
              keyboardType="email-address"
            />

            <GlobalInput
              ref={this.phoneNumber}
              submitEditing={() => {
                this.password.current.focus();
              }}
              returnKeyType="next"
              marginTop={10}
              paddingLeft={20}
              borderRadius={10}
              width={'80%'}
              placeholder={'Phone*'}
              maxLength={8}
              keyboardType="phone-pad"
              backgroundColor={colors.whiteColor}
              changeText={(phoneNumber) => this.setState({phoneNumber})}
            />
            <View style={styles.rowGender}>
              <GlobalButton
                linearGradient={this.state.genderMaleSelected ? true : false}
                backgroundColor={
                  this.state.genderMaleSelected
                    ? colors.themeColor
                    : colors.whiteColor
                }
                borderWidth={this.state.genderMaleSelected ? null : 1}
                borderColor={colors.googleGrey}
                marginTop={20}
                marginBottom={10}
                borderRadius={10}
                width={'35%'}
                text={i18n.male}
                textColor={colors.blackColor}
                submit={() => {
                  this.setState({
                    gender: 'm',
                    genderMaleSelected: true,
                    genderFemaleSelected: false,
                  });
                }}
              />
              <GlobalButton
                linearGradient={this.state.genderFemaleSelected ? true : false}
                backgroundColor={
                  this.state.genderFemaleSelected
                    ? colors.themeColor
                    : colors.whiteColor
                }
                borderWidth={this.state.genderFemaleSelected ? null : 1}
                borderColor={colors.googleGrey}
                marginTop={20}
                marginBottom={10}
                borderRadius={10}
                width={'35%'}
                text={i18n.female}
                textColor={colors.blackColor}
                submit={() => {
                  this.setState({
                    gender: 'f',
                    genderMaleSelected: false,
                    genderFemaleSelected: true,
                  });
                }}
              />
            </View>
            <TouchableOpacity
              style={styles.datePickerTouchableOpacity}
              onPress={() => {
                this.setState({showDatePicker: true});
              }}>
              <Text style={styles.dateText}>
                {this.state.dateOfBirth
                  ? this.state.dateOfBirth
                  : 'Date of Birth'}
              </Text>
            </TouchableOpacity>

            <GlobalInput
              ref={this.password}
              submitEditing={() => {
                this.confirmPassword.current.focus();
              }}
              returnKeyType="next"
              marginTop={10}
              paddingLeft={20}
              borderRadius={10}
              width={'80%'}
              placeholder={'Password*'}
              backgroundColor={colors.whiteColor}
              changeText={(password) => this.setState({password})}
              secureTextEntry={this.state.showPassword ? false : true}
              visible={this.state.showPassword ? false : true}
              notVisible={this.state.showPassword ? true : false}
              changePasswordState={() => {
                this.setState({
                  showPassword: !this.state.showPassword,
                });
              }}
            />

            <GlobalInput
              ref={this.confirmPassword}
              submitEditing={() => {
                // this.phoneNumber.current.focus();
              }}
              returnKeyType="done"
              marginTop={10}
              paddingLeft={20}
              borderRadius={10}
              width={'80%'}
              placeholder={'Confirm Password*'}
              backgroundColor={colors.whiteColor}
              changeText={(confirmPassword) => this.setState({confirmPassword})}
              secureTextEntry={this.state.showConfirmPassword ? false : true}
              visible={this.state.showConfirmPassword ? false : true}
              notVisible={this.state.showConfirmPassword ? true : false}
              changePasswordState={() => {
                this.setState({
                  showConfirmPassword: !this.state.showConfirmPassword,
                });
              }}
            />
            {this.state.error ? (
              <Text style={globalStyling.errorText}>{this.state.error}</Text>
            ) : null}

            <GlobalButton
              linearGradient={true}
              marginTop={10}
              marginBottom={20}
              borderRadius={10}
              width={'80%'}
              text={i18n.register}
              fontWeight="bold"
              submit={() => {
                // this.signin()
                this.signup();
              }}
            />
            <TouchableOpacity
              style={{marginVertical: 10}}
              onPress={() => this.props.navigation.navigate('SignIn')}>
              <Text style={{textAlign: 'center'}}>
                {i18n.loginWithExistingAccount}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={this.state.showDatePicker}
              mode="date"
              // minimumDate={new Date()}
              onConfirm={(date) => {
                this.setState({
                  showDatePicker: false,
                  dateOfBirth: moment(date).format('DD-MM-YYYY'),
                });
              }}
              onCancel={() => this.setState({showDatePicker: false})}
              cancelTextIOS="cancel"
              confirmTextIOS="confirm"
            />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  rowGender: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  logoView: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    marginVertical: 10,
  },
  datePickerTouchableOpacity: {
    marginTop: 10,
    paddingLeft: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.searchBarBorderColor,
    width: '80%',
    height: 43,
    backgroundColor: colors.whiteColor,
    alignSelf: 'center',
  },
  dateText: {
    color: colors.blackColor,
    paddingVertical: 10,
    fontSize: fontSizes.normal,
  },
});

const mapStateToProps = (state) => ({
  reduxState: state.reducers,
});

const mapDispatchToProps = (dispatch) => ({
  reduxActions: bindActionCreators(reduxActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
