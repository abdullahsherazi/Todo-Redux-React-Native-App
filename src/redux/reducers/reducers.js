import * as actionTypes from '../actions/types';

const initialState = {
  userdata: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.CLEAR_DATA:
      return {
        ...state,
        userdata: {},
      };
    case actionTypes.SET_USER_DATA:
      console.log(action.payload);
      return {
        ...state,
        userdata: action.payload,
      };
    default:
      return state;
  }
}
