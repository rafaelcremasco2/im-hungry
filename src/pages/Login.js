import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../store/actions/user'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView
} from 'react-native'

class Login extends Component {
    state = {
        name: '',
        email: '',
        password: ''
    }

    componentDidUpdate = prevProps => {
        if (prevProps.isLoading && !this.props.isLoading) {
            this.props.navigation.navigate('Profile')
        }
    }

    login = () => {
        this.props.onLogin({ ...this.state })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerForms}>
                    <TextInput placeholder='Email' style={styles.input}
                        autoFocus={false} keyboardType='email-address'
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        placeholderTextColor="#999"
                        autoCorrect={false} />
                    <TextInput placeholder='Senha' style={styles.input}
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        placeholderTextColor="#999"
                        autoCorrect={false} />
                    <TouchableOpacity onPress={this.login} style={styles.buttom}>
                        <Text style={styles.buttomText}>Entrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('Register')
                    }} style={styles.buttomRegister}>
                        <Text style={styles.buttomTextRegister}>Ainda não sou cadastratado.</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerTerms}>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('Privacy')
                    }} style={styles.buttomPrivacy}>
                        <Text style={styles.buttomTextPrivacy}>Política de Privacidade.</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('Terms')
                    }} style={styles.buttomTerms}>
                        <Text style={styles.buttomTextTerms}>Termos de uso.</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
    containerTerms: {
        height: 50,
        flexDirection: 'row',
        backgroundColor: 'steelblue'
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
    buttomRegister: {
        width: '90%',
        marginTop: 20,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    buttomTextRegister: {
        fontSize: 20,
        color: '#333'
    },
    buttomPrivacy: {
        flex: 1,
        marginTop: 5,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    buttomTextPrivacy: {
        fontSize: 16,
        color: '#FFF'
    },
    buttomTerms: {
        flex: 1,
        marginTop: 5,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    buttomTextTerms: {
        fontSize: 16,
        color: '#FFF'
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
        onLogin: user => dispatch(login(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)