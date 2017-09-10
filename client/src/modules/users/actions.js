import auth from '../auth';
import axios from 'axios';
import core from '../core';
import * as u from './actionTypes';

export const addUser = (user) => {
    return (dispatch) => {
        dispatch({
            type: u.ADD,
            payload: user
        });
    }
}

export const fetchUserWithToken = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: { authorization: token }
        };
        return axios.get(`${core.constants.ROOT_URL}/api/auth/token`, config)
            .then((res) => {
                const user = res.data;
                dispatch(addUser(user));
                dispatch(auth.actions.setUserId(user.id));
            });
        }
    }