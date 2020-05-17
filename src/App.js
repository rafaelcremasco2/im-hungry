import React, { Component } from 'react'
import { Alert, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import Navigator from './components/Navigator'
import { setMessage } from './store/actions/message'

class App extends Component {

    componentDidUpdate = () => {
        if (this.props.text && this.props.text.toString().trim()) {
            Alert.alert(this.props.title || 'Mensagem', this.props.text.toString())
            this.props.clearMessage()
        }
    }

    render() {
        return (
            <>
                <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
                <Navigator />
            </>
        )
    }
}

const mapStateToProps = ({ message }) => {
    return {
        title: message.title,
        text: message.text
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearMessage: () => dispatch(setMessage({ title: '', text: '' }))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)