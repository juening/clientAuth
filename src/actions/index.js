import axios from 'axios';
import { browserHistory } from 'react-router';
import types from './types';

const ROOT_URL = 'http://localhost:3090';

export function signInUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signin`, {email: email, password:password})
      .then(response => {
        dispatch({ type: types.AUTH_USER, payload: response.data });
        browserHistory.push('feature');
        localStorage.setItem('token', response.data.token);
      })
      .catch((error)=> {
        dispatch(authError('Bad Login Info.'));
        throw(error);
      });
  };
}

export function authError(error) {
  return {
    type: types.AUTH_ERROR,
    payload: error
  };
}
