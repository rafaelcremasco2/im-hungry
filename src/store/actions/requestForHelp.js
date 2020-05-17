import {
    SET_HELP_RESQUESTS,
    CREATING_REQUEST_FOR_HELP,
    REQUEST_FOR_HELP_CREATED
} from './actionTypes'
import {
    TITLE_SUCCESS,
    TITLE_ERROR,
    TEXT_DEFAULT_ERROR
} from '../../constants/message'
import { setMessage } from '../actions/message'
import axios from 'axios'


export const setHelpRequests = helpRequests => {
    return {
        type: SET_HELP_RESQUESTS,
        payload: helpRequests
    }
}

export const creatingRequestForHelp = () => {
    return {
        type: CREATING_REQUEST_FOR_HELP
    }
}

export const requestForHelpCreated = () => {
    return {
        type: REQUEST_FOR_HELP_CREATED
    }
}


export const addRequestForHelp = requestForHelp => {

    return (dispatch, getState) => {
        dispatch(creatingRequestForHelp())

        axios.post(`/helpRequests.json?auth=${getState().user.token}`, { ...requestForHelp })
            .catch(err => {
                dispatch(setMessage({
                    title: TITLE_ERROR,
                    text: TEXT_DEFAULT_ERROR + err
                }))
            })
            .then(res => {
                dispatch(getHelpRequests()) // recarrega novos dados
                dispatch(requestForHelpCreated())
                dispatch(setMessage({
                    title: TITLE_SUCCESS,
                    text: 'Pedido de ajuda adicionado.'
                }))
            })
    }
}

export const getHelpRequests = () => {
    return dispatch => {
        axios.get('/helpRequests.json')
            .catch(err => {
                dispatch(setMessage({
                    title: TITLE_ERROR,
                    text: TEXT_DEFAULT_ERROR + err
                }))
            })
            .then(res => {
                const rawhelpRequests = res.data
                const helpRequests = []
                for (let key in rawhelpRequests) {
                    helpRequests.push({
                        ...rawhelpRequests[key],
                        id: key
                    })
                }
                dispatch(setHelpRequests(helpRequests.reverse()))
            })
    }
}