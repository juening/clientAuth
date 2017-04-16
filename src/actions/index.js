import axios from 'axios';
import { browserHistory } from 'react-router';
import types from './types';

const ROOT_URL = 'http://localhost:3090';

export function signInUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signin`, {email: email, password:password})
      .then(response => {
        dispatch({ type: types.AUTH_USER });
        browserHistory.push('feature');
        localStorage.setItem('token', response.data.token);
      })
      .catch((error)=> {
        dispatch(authError('Bad Login Info.'));
      });
  };
}

export function authError(error) {
  return {
    type: types.AUTH_ERROR,
    payload: error
  };
}

export function signOutUser() {
  localStorage.removeItem('token');
  return { type: types.UNAUTH_USER };
}

export function signUpUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email: email, password: password })
      .then(response => {
        dispatch({ type: types.AUTH_USER });
        localStorage.setItem( 'token', response.data.token );
        browserHistory.push('feature')
      })
      .catch((error) => { dispatch(authError( error.response.data.error ))});
  }
}