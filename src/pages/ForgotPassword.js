import React, { Component } from 'react'
import { connect } from 'react-redux'
import { passworReset } from '../store/actions/user'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView
} from 'react-native'

class ForgotPassword extends Component {
    state = {
        name: '',
        email: '',
        password: ''
    }

    /* componentDidUpdate = prevProps => {
        if (prevProps.isLoading && !this.props.isLoading) {
            this.props.navigation.navigate('Login')
        }
    } */

    passwordReset = () => {
        console.log('======================================')
        console.log('BOTÃO DE RESET CLICADO')
        console.log('Email informado: ' + this.state.email)
        console.log('======================================')
        this.props.onPasswordReset({ ...this.state })
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.containerForms}>
                        <TextInput placeholder='Digite seu email' style={styles.input}
                            autoFocus={false} keyboardType='email-address'
                            value={this.state.email}
                            onChangeText={email => this.setState({ email })}
                            placeholderTextColor="#999"
                            autoCorrect={false} />
                        <TouchableOpacity onPress={this.passwordReset} style={styles.buttom}>
                            <Text style={styles.buttomText}>Enviar</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    containerForms: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttom: {
        width: '90%',
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    buttomText: {
        fontSize: 20,
        color: '#FFF'
    },
    input: {
        marginTop: 20,
        width: '90%',
        backgroundColor: '#EEE',
        height: 40,
        borderWidth: 1,
        borderColor: '#666',
        padding: 10,
        borderRadius: 7,
        fontSize: 18,
        color: '#333',
    }
})


const mapStateToProps = ({ user }) => {
    return {
        isLoading: user.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPasswordReset: user => dispatch(passworReset(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)