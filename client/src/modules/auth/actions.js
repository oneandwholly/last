import axios from 'axios';
import * as a from './actionTypes';
import core from '../core';

export const authError = (error) =>
    ({
        type: a.ERROR,
        payload: error
    })

export const submitSignup = ({
  username,
  email,
  password
}) =>
  (dispatch) => {
    return axios.post(`${core.constants.ROOT_URL}/api/auth/signup`, {
      username,
      email,
      password
    })
      .then(res => {
        const token = res.data.token;
        // If request is good..
        // - Save the JWT token
        localStorage.setItem('token', token);
        dispatch(loginUser());
      })
      .catch(error => {
        const res = error.response;
        dispatch(authError(res.data.error));
      });
  }

  
  export const submitLogin = ({ username, password }) => {
      return (dispatch) => {
          return axios.post(`${core.constants.ROOT_URL}/api/auth/login`, {
              username,
              password
            })
            .then(res => {
                const token = res.data.token;
                localStorage.setItem('token', token);
                dispatch(loginUser());
            })
            .catch(error => {
                const res = error.response;
                dispatch(authError(res.data.error));
            });
        }
    }
    
    export const loginUser = () => {
        return (dispatch) => {
            dispatch({
                type: a.LOGIN
            })
        }
    }
export const logoutUser = (history) => {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({
      type: a.LOGOUT
    });
    history.push('/');
  }
}

export const setUserId = (userId) => {
  return (dispatch) => {
    dispatch({
      type: a.SET_USER_ID,
      payload: userId
    })
  }
}
