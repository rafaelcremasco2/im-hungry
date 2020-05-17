import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Alert
} from 'react-native'
import {
    TITLE_ERROR
} from '../constants/message'
import { connect } from 'react-redux'
import { createUser } from '../store/actions/user'

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: ''
    }

    componentDidUpdate = prevProps => {
        if (prevProps.isLoading && !this.props.isLoading) {
            this.setState({
                name: '',
                email: '',
                password: ''
            })
            this.props.navigation.navigate('Profile')
        }
    }

    save = async () => {
        // Validar formulário
        if (this.state.name === '' || this.state.name === null) {
            Alert.alert(
                TITLE_ERROR,
                "É necessário informar o nome.")
            return
        }
        if (this.state.email === '' || this.state.email === null) {
            Alert.alert(
                TITLE_ERROR,
                "É necessário informar o e-mail.")
            return
        }
        if (this.state.password === '' || this.state.password === null) {
            Alert.alert(
                TITLE_ERROR,
                "É necessário informar uma senha.")
            return
        }

        // Cadastrar usuário
        this.props.onCreateUser(this.state)
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <TextInput placeholder='Nome' style={styles.input}
                        autoFocus={true} value={this.state.name}
                        onChangeText={name => this.setState({ name })}
                        placeholderTextColor="#999"
                        autoCapitalize="words"
                        autoCorrect={false} />
                    <TextInput placeholder='Email' style={styles.input}
                        keyboardType='email-address' value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        placeholderTextColor="#999"
                        autoCorrect={false} />
                    <TextInput placeholder='Senha' style={styles.input}
                        secureTextEntry={true} value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        placeholderTextColor="#999"
                        autoCorrect={false} />
                    <TouchableOpacity
                        onPress={this.save}
                        style={styles.buttom}>
                        <Text style={styles.buttomText}>Cadastrar-se</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
        onCreateUser: user => dispatch(createUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
//export default Register