// reducers.js
import { LOGIN_SUCCESS, LOGIN_FAILURE } from './actions';

const initialState = {
  userData: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        userData: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
