import React from 'react'
import { Provider } from 'react-redux'
import Navigator from './src/App'
import { URI_DATABASE } from './src/constants/database'

import storeConfig from './src/store/storeConfig'

import axios from 'axios'
axios.defaults.baseURL = URI_DATABASE

const store = storeConfig()

export default function App() {
    return (
        <Provider store={store}>
            <Navigator />
        </Provider>
    )
}