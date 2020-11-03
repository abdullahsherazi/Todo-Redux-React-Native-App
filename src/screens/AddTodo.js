import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Pressable,
  TextInput,
} from 'react-native';
import colors from '../constants/colors';
import selectedColors from '../constants/selectedColors';
import globalStyling from '../constants/globalStyling';
import {bindActionCreators} from 'redux';
import * as reduxActions from '../redux/actions/actions';
import {connect} from 'react-redux';
import GlobalHeader from '../components/GlobalHeader';
import GlobalButton from '../components/GlobalButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

class AddTodo extends React.Component {
  state = {
    showDatePicker: false,
    colorSelected: 0,
    work: '',
    due: '',
  };
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      global.showBottomTab(true).then(() => {
        global.setFocused('addTodo');
      });
    });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  addTodo = () => {
    if (this.state.work === '') {
      this.setState({showError: 'Kindly Fill To Do Field'});
    } else if (this.state.due === '') {
      this.setState({showError: 'Kindly Select The Due Date'});
    } else {
      let data = {
        name: this.props.reduxState.userdata.name,
        todos: [
          ...this.props.reduxState.userdata.todos,
          {
            dueDate: this.state.due,
            work: this.state.work,
            colorSelected: this.state.colorSelected,
            completed: false,
          },
        ],
      };
      this.setState({showError: false});
      this.props.reduxActions.addTodo(this.props.navigation, data);
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : null}
        keyboardVerticalOffset={40}
        style={globalStyling.container}>
        <ScrollView>
          <View style={globalStyling.container}>
            <GlobalHeader
              navigation={this.props.navigation}
              headingText={`Add`}
            />

            <TextInput
              style={styles.textArea}
              placeholder="What do you need to do?"
              placeholderTextColor={colors.greyTextColor}
              numberOfLines={10}
              multiline={true}
              onChangeText={(work) => {
                this.setState({work});
              }}
            />

            <TouchableOpacity
              style={styles.dateTouchableOpacity}
              onPress={() => {
                this.setState({showDatePicker: true});
              }}>
              <Text style={styles.text}>
                {this.state.due !== ''
                  ? moment(this.state.due).format('DD-MM-YYYY')
                  : 'When it is due?'}
              </Text>
            </TouchableOpacity>
            <View style={styles.colorContainerView}>
              {selectedColors.map((item, i) => {
                return (
                  <Pressable
                    style={[
                      styles.colorPressable,

                      {
                        backgroundColor: item,
                        opacity: this.state.colorSelected == i ? 1 : 0.3,
                      },
                    ]}
                    key={i}
                    onPress={() => {
                      this.setState({colorSelected: i});
                    }}></Pressable>
                );
              })}
            </View>
            <GlobalButton
              backgroundColor={colors.themeColor}
              marginTop={20}
              borderWidth={0.5}
              marginBottom={10}
              borderRadius={5}
              width="90%"
              text={'Add'}
              textColor={colors.whiteColor}
              submit={() => {
                this.addTodo();
              }}
            />
            {this.state.showError ? (
              <Text style={globalStyling.errorText}>
                {this.state.showError}
              </Text>
            ) : null}
            <DateTimePickerModal
              isVisible={this.state.showDatePicker}
              mode="date"
              // minimumDate={new Date()}
              onConfirm={(date) => {
                this.setState({
                  showDatePicker: false,
                  due: date,
                });
              }}
              onCancel={() => this.setState({showDatePicker: false})}
              cancelTextIOS="cancel"
              confirmTextIOS="confirm"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  textArea: {
    textAlignVertical: 'top',
    height: 100,
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.greyTextColor,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  colorContainerView: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 30,
  },
  view: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  text: {color: colors.greyTextColor},
  dateTouchableOpacity: {
    width: '90%',
    alignSelf: 'center',
    paddingLeft: 10,
    borderColor: colors.greyTextColor,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.whiteColor,
    height: 45,
    marginTop: 10,
    justifyContent: 'center',
  },
  colorPressable: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
});

const mapStateToProps = (state) => ({
  reduxState: state.reducers,
});

const mapDispatchToProps = (dispatch) => ({
  reduxActions: bindActionCreators(reduxActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
