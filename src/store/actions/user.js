import {
    USER_LOGGED_IN,
    USER_LOGGED_OUT,
    LOADING_USER,
    USER_LOADED
} from './actionTypes'
import {
    TITLE_ERROR,
    TEXT_DEFAULT_ERROR,
    TEXT_ERROR_LOGIN,
    TITLE_SUCCESS,
    TEXT_PASSWORD_RESET
} from '../../constants/message'
import { API_KEY, AUTH_BASE_URL } from '../../constants/auth'
import { setMessage } from '../actions/message'
import axios from 'axios'


export const userLogged = user => {
    return {
        type: USER_LOGGED_IN,
        payload: user
    }
}

export const logout = () => {
    return {
        type: USER_LOGGED_OUT
    }
}

export const loadingUser = () => {
    return {
        type: LOADING_USER
    }
}

export const userLoaded = () => {
    return {
        type: USER_LOADED
    }
}

/* export const passworReset = user => {
    return dispatch => {
        //dispatch(loadingUser())
        console.log(user.email)

        axios.post(`${AUTH_BASE_URL}/resetPassword?key=${API_KEY}`, {
            email: user.email,
            returnSecureToken: true
        })
            .catch(err => {
                console.log('==================================')
                console.log('DEU ERRO: ' + err)
                console.log('==================================')
                dispatch(setMessage({
                    title: TITLE_ERROR,
                    text: TEXT_DEFAULT_ERROR + err
                }))
            })
            .then(res => {
                console.log('==================================')
                console.log('URI: ' + `${AUTH_BASE_URL}/resetPassword?key=${API_KEY}`)
                console.log('RESPOSTA PASSWORD-RESET')
                console.log(res)
                console.log('==================================')
                dispatch(setMessage({
                    title: TITLE_SUCCESS,
                    text: TEXT_PASSWORD_RESET
                }))
                //dispatch(userLoaded())
            })
    }
} */

export const createUser = user => {
    return dispatch => {
        dispatch(loadingUser())
        axios.post(`${AUTH_BASE_URL}/signupNewUser?key=${API_KEY}`, {
            email: user.email,
            password: user.password,
            returnSecureToken: true
        })
            .catch(err => {
                dispatch(setMessage({
                    title: TITLE_ERROR,
                    text: TEXT_DEFAULT_ERROR + err
                }))
            })
            .then(res => {
                if (res.data.localId) {
                    axios.put(`/users/${res.data.localId}.json`, {
                        name: user.name
                    })
                        .catch(err => {
                            dispatch(setMessage({
                                title: TITLE_ERROR,
                                text: TEXT_DEFAULT_ERROR + err
                            }))
                        })
                        .then(() => {
                            dispatch(login(user))
                        })
                }
            })
    }
}


export const login = user => {
    return dispatch => {
        dispatch(loadingUser())
        axios.post(`${AUTH_BASE_URL}/verifyPassword?key=${API_KEY}`, {
            email: user.email,
            password: user.password,
            returnSecureToken: true
        })
            .catch(err => {
                dispatch(setMessage({
                    title: TITLE_ERROR,
                    text: TEXT_ERROR_LOGIN
                }))
            })
            .then(res => {
                if (res.data.localId) {
                    user.token = res.data.idToken
                    axios.get(`/users/${res.data.localId}.json`)
                        .catch(err => {
                            dispatch(setMessage({
                                title: TITLE_ERROR,
                                text: TEXT_ERROR_LOGIN
                            }))
                        })
                        .then(res => {
                            delete user.password
                            user.name = res.data.name
                            dispatch(userLogged(user))
                            dispatch(userLoaded())
                        })
                }
            })
    }
}