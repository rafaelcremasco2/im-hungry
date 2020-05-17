import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addRequestForHelp } from '../store/actions/requestForHelp'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
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
    TEXT_LOG_IN,
    TITLE_ERROR
} from '../constants/message'
import Icon from 'react-native-vector-icons/FontAwesome'
import Header from '../components/Header'

class AddRequestForHelp extends Component {
    state = {
        person: '',
        latitude: null,
        longitude: null
    }

    componentDidUpdate = prevProps => {
        /**
         * Caso o processo de save ocorra perfeitamente
         * o state retornará ao estado inicial
         * e navega para tela de radar
         */
        if (prevProps.loading && !this.props.loading) {
            this.setState({
                person: '',
                latitude: null,
                longitude: null
            })
            // Navega para a tela do radar (mapa)
            this.props.navigation.navigate('Radar')
        }
    }

    save = async () => {
        // Verifica se o usuário esta logado
        if (this.props.email) {
            // Validar formulário
            if (this.state.person === '' || this.state.person === null) {
                Alert.alert(
                    TITLE_ERROR,
                    "É necessário informar o nome da pessoa necessitada.")
                return
            }

            const { latitude, longitude } = await this.getGeolocation()
            this.setState({ latitude, longitude })

            this.props.onAddRequestForHelp({
                id: Math.random(),
                nickname: this.props.name,
                email: this.props.email,
                person: this.state.person,
                latitude: this.state.latitude,
                longitude: this.state.longitude
            })

        } else {
            Alert.alert(TITLE_ERROR, TEXT_LOG_IN)
            this.props.navigation.navigate('Login')
        }
    }

    async getGeolocation() {
        const { granted } = await requestPermissionsAsync()

        if (granted) {
            const { coords } = await getCurrentPositionAsync({
                enableHighAccuracy: true,
            })

            return { latitude, longitude } = coords

        }

    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Header />
                    <View style={styles.containerForm}>
                        <Text style={styles.text}>Informe o nome da pessoa necessitada.</Text>
                        <TextInput placeholder='Nome' style={styles.input}
                            value={this.state.person}
                            onChangeText={person => this.setState({ person })}
                            placeholderTextColor="#999"
                            autoCapitalize="words"
                            autoCorrect={false}
                        />
                        <Text style={styles.textAlert}>Esteja no endereço para definir o local da pessoa necessitada.</Text>
                        <TouchableOpacity onPress={this.save}
                            style={[styles.buttom, this.props.loading ? styles.buttomDisabled : null]}
                            disabled={this.props.loading}>
                            <Icon name='map-marker' size={30} color="#FFF" />
                            <Text style={styles.buttomText}>Definir local para assistência</Text>
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
    },
    containerForm: {
        flex: 1,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        width: '90%',
        fontSize: 20,
        color: '#333',
        alignItems: 'center',
        textAlign: 'center'
    },
    textAlert: {
        width: '90%',
        marginTop: 20,
        fontSize: 20,
        color: '#333',
        alignItems: 'center',
        textAlign: 'center'
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
        color: '#FFF',
        fontWeight: 'bold'
    },
    input: {
        width: '90%',
        marginTop: 20,
        backgroundColor: '#EEE',
        height: 40,
        borderWidth: 1,
        borderColor: '#666',
        padding: 10,
        borderRadius: 7,
        fontSize: 18,
        color: '#333'
    }
})

const mapStateToProps = ({ user, requestForHelp }) => {
    return {
        email: user.email,
        name: user.name,
        loading: requestForHelp.isUploading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddRequestForHelp: requestForHelp => dispatch(addRequestForHelp(requestForHelp))
    }
}

//export default RequestForHelp
export default connect(mapStateToProps, mapDispatchToProps)(AddRequestForHelp)