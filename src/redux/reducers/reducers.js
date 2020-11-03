import * as actionTypes from '../actions/types';

const initialState = {
  userdata: {},
  loading: false,
  todos: [],
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
        todos: [],
      };
    case actionTypes.SET_USER_DATA:
      return {
        ...state,
        userdata: action.payload,
      };
    case actionTypes.SET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };
    default:
      return state;
  }
}
