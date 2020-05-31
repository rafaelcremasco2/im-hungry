import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Alert,
    Switch
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
        password: '',
        terms: false,
    }

    toggleTerms = () => {
        this.setState({ terms: !this.state.terms })
    }

    componentDidUpdate = prevProps => {
        if (prevProps.isLoading && !this.props.isLoading) {
            this.setState({
                name: '',
                email: '',
                password: '',
                terms: false
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
            <ScrollView style={styles.scroll}>
                <View style={styles.container}>
                    <View style={styles.containerForms}>
                        <TextInput placeholder='Nome' style={styles.input}
                            autoFocus={false} value={this.state.name}
                            onChangeText={name => this.setState({ name })}
                            placeholderTextColor="#838080"
                            autoCapitalize="words"
                            autoCorrect={false} />
                        <TextInput placeholder='Email' style={styles.input}
                            keyboardType='email-address' value={this.state.email}
                            onChangeText={email => this.setState({ email })}
                            placeholderTextColor="#838080"
                            autoCorrect={false} />
                        <TextInput placeholder='Senha' style={styles.input}
                            secureTextEntry={true} value={this.state.password}
                            onChangeText={password => this.setState({ password })}
                            placeholderTextColor="#838080"
                            autoCorrect={false} />
                        <View style={styles.containerTerms}>
                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('Terms')
                            }} style={styles.buttomTerms}>
                                <Text style={styles.buttomTextTerms}>Termos de Uso e Privacidade</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.text}>Concorda com os Termos de Uso e Privacidade?</Text>
                        <View style={styles.containerSwitch}>
                            <Text style={styles.switchText}>Não</Text>
                            <Switch
                                trackColor={{ false: "#AAA", true: "#91b6f5" }}
                                thumbColor={this.state.terms ? "#ffafb9" : "steelblue"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={this.toggleTerms}
                                value={this.state.terms}
                            />
                            <Text style={styles.switchText}>Sim</Text>
                        </View>
                        <TouchableOpacity
                            onPress={this.save}
                            style={[styles.buttom, !this.state.terms ? styles.buttomDisabled : null]}
                            disabled={!this.state.terms}>
                            <Text style={styles.buttomText}>Cadastrar-se</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView >
        )
    }
}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: '#FFF',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
    },
    containerForms: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerTerms: {
        height: 50,
        width: '90%',
        flexDirection: 'row',
        backgroundColor: 'steelblue',
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 7
    },
    containerSwitch: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttomTerms: {
        flex: 1,
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    buttomTextTerms: {
        fontSize: 16,
        color: '#FFF'
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
    buttomDisabled: {
        backgroundColor: '#AAA'
    },
    buttomText: {
        fontSize: 20,
        color: '#FFF'
    },
    input: {
        marginTop: 20,
        width: '90%',
        backgroundColor: '#f3f1f1',
        height: 40,
        borderWidth: 1,
        borderColor: '#666',
        padding: 10,
        borderRadius: 7,
        fontSize: 18,
        color: '#333',
    },
    text: {
        width: '90%',
        fontSize: 16,
        marginTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    switchText: {
        fontSize: 16,
        marginRight: 5,
        marginLeft: 5,
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