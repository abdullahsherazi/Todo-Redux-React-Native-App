import * as actionTypes from './types';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import {Alert, Platform} from 'react-native';

export const checkUser = (navigation) => async (dispatch) => {
  let UserdataAsync = await AsyncStorage.getItem('userdata');
  let userdata = JSON.parse(UserdataAsync);
  if (userdata) {
    dispatch({
      type: actionTypes.SET_USER_DATA,
      payload: userdata,
    });
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Todos'}],
      }),
    );
  } else {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Login'}],
      }),
    );
  }
};

export const signup = (navigation, userdata, fromOrderSummary) => async (
  dispatch,
) => {
  dispatch({type: actionTypes.START_LOADING});

  try {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: (token) => {
        let appType = Platform.OS == 'ios' ? 'ios' : 'andriod';
        axios
          .post(
            `${server}/wp-api.php/?email=${userdata.email}&pass=${userdata.password}&action=${userdata.action}&username=${userdata.name}&date_of_birth=${userdata.date_of_birth}&gender=${userdata.gender}&billing_phone=${userdata.billing_phone}&app_token=${token.token}&app_type=${appType}`,
          )
          .then((res) => {
            if (res.data.error === '0' && res.status === 200) {
              let data = {
                ...res.data.user.data,
                gender: res.data.user.data.gender == 'm' ? 'Male' : 'Female',
              };
              AsyncStorage.setItem('userdata', JSON.stringify(data)).then(
                () => {
                  dispatch({
                    type: actionTypes.SET_USER_DATA,
                    payload: data,
                  });

                  if (fromOrderSummary) {
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [{name: 'OrderSummary'}],
                      }),
                    );
                  } else {
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [{name: 'Home'}],
                      }),
                    );
                  }

                  dispatch({type: actionTypes.STOP_LOADING});
                  Alert.alert(
                    '',
                    'Your account has been successfully created.',
                    [{text: 'OK'}],
                    {
                      cancelable: false,
                    },
                  );
                },
              );
            } else if (res.data.error === '1') {
              dispatch({type: actionTypes.STOP_LOADING});
              Alert.alert('', res.data.message, [{text: 'OK'}], {
                cancelable: false,
              });
            } else {
              dispatch({type: actionTypes.STOP_LOADING});
              Alert.alert(
                '',
                'Some problem cccured while signing you up, Try again',
                [{text: 'OK'}],
                {
                  cancelable: false,
                },
              );
            }
          })
          .catch(() => {
            dispatch({type: actionTypes.STOP_LOADING});
            Alert.alert(
              '',
              'Some problem cccured while signing you up, Try again',
              [{text: 'OK'}],
              {
                cancelable: false,
              },
            );
          });
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: (notification) => {},

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.log(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  } catch (error) {
    dispatch({type: actionTypes.STOP_LOADING});
    Alert.alert(
      '',
      'Some problem cccured while signing you up, Try again',
      [{text: 'OK'}],
      {
        cancelable: false,
      },
    );
  }
};

export const signout = (navigation, userdata) => async (dispatch) => {
  dispatch({type: actionTypes.START_LOADING});
  axios
    .get(`${server}/wp-api.php?action=logout&uid=${userdata.ID}`)
    .then((res) => {
      if (res.status === 200 && res.data.status == 1) {
        AsyncStorage.removeItem('userdata').then(() => {
          dispatch({
            type: actionTypes.CLEAR_DATA_ON_SIGN_OUT,
          });
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Home'}],
            }),
          );
          dispatch({type: actionTypes.STOP_LOADING});
        });
      } else {
        dispatch({type: actionTypes.STOP_LOADING});
        Alert.alert(
          '',
          'Some problem occured while signing you out, Try again',
          [{text: 'OK'}],
          {
            cancelable: false,
          },
        );
      }
    })
    .catch(() => {
      dispatch({type: actionTypes.STOP_LOADING});
      Alert.alert(
        '',
        'Some problem occured while signing you out, Try again',
        [{text: 'OK'}],
        {
          cancelable: false,
        },
      );
    });
};
