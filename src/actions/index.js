import types from './types';
import axios from 'axios';

const ROOT_URL = 'http://localhost:3090';

export function signInUser({ email, password }) {
  return function(dispatch) {
    return axios.post(`${ROOT_URL}/signin`, {email: email, password:password})
      .then(response => {
        dispatch({ type: types.AUTH_USER, payload: response.data });
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
