import types from '../actions/types';

export default function (state={}, action) {
  switch(action.type) {
    case types.AUTH_USER:
      return { ...state, authenticated: true, error: '' };//reset error when sign in or sign up success

    case types.AUTH_ERROR:
      return { ...state, error: action.payload };

    case types.UNAUTH_USER:
      return { ... state, authenticated: false };

       case types.FETCH_MESSAGE:
        return { ...state, message: action.payload.secret };

    default:
      return state;
  }
}
