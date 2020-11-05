import React, {useState, useEffect} from 'react';
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

const AddTodo = ({navigation, reduxState, reduxActions}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [colorSelected, setColorSelected] = useState(0);
  const [work, setWork] = useState('');
  const [due, setDue] = useState('');
  const [showError, setError] = useState(false);

  let addTodo = () => {
    if (work === '') {
      setError('Kindly Fill To Do Field');
    } else if (due === '') {
      setError('Kindly Select The Due Date');
    } else {
      let data = {
        name: reduxState.userdata.name,
        todos: [
          ...reduxState.userdata.todos,
          {
            dueDate: due,
            work: work,
            colorSelected: colorSelected,
            completed: false,
          },
        ],
      };
      setError(false);
      reduxActions.addTodo(navigation, data);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      global.showBottomTab(true).then(() => {
        global.setFocused('addTodo');
      });
    });
    return unsubscribe;
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : null}
      keyboardVerticalOffset={40}
      style={globalStyling.container}>
      <ScrollView>
        <View style={globalStyling.container}>
          <GlobalHeader navigation={navigation} headingText={`Add`} />

          <TextInput
            style={styles.textArea}
            placeholder="What do you need to do?"
            placeholderTextColor={colors.greyTextColor}
            numberOfLines={10}
            multiline={true}
            onChangeText={(work) => {
              setWork(work);
            }}
          />

          <TouchableOpacity
            style={styles.dateTouchableOpacity}
            onPress={() => {
              setShowDatePicker(true);
            }}>
            <Text style={styles.text}>
              {due !== ''
                ? moment(due).format('DD-MM-YYYY hh:mm A')
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
                      opacity: colorSelected == i ? 1 : 0.3,
                    },
                  ]}
                  key={i}
                  onPress={() => {
                    setColorSelected(i);
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
              addTodo();
            }}
          />
          {showError ? (
            <Text style={globalStyling.errorText}>{showError}</Text>
          ) : null}
          <DateTimePickerModal
            isVisible={showDatePicker}
            mode="datetime"
            // minimumDate={new Date()}
            onConfirm={(date) => {
              setShowDatePicker(false);
              setDue(date);
            }}
            onCancel={() => setShowDatePicker(false)}
            cancelTextIOS="cancel"
            confirmTextIOS="confirm"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

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
