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
        address: '',
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
                address: '',
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
            if (this.state.address === '' || this.state.address === null) {
                Alert.alert(
                    TITLE_ERROR,
                    "É necessário informar o endereço para assitência.")
                return
            }

            const { latitude, longitude } = await this.getGeolocation()
            this.setState({ latitude, longitude })

            this.props.onAddRequestForHelp({
                id: Math.random(),
                nickname: this.props.name,
                email: this.props.email,
                person: this.state.person,
                address: this.state.address,
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
            <ScrollView style={styles.scroll}>
                <View style={styles.container}>
                    <Header />
                    <View style={styles.containerForm}>
                        <Text style={styles.text}>Informe o nome da pessoa necessitada.</Text>
                        <TextInput placeholder='Nome' style={styles.input}
                            value={this.state.person}
                            onChangeText={person => this.setState({ person })}
                            placeholderTextColor="#838080"
                            autoCapitalize="words"
                            autoCorrect={false}
                        />
                        <Text style={styles.text}>Informe o endereço para assistência.</Text>
                        <TextInput placeholder='Endereço Completo' style={styles.input}
                            value={this.state.address}
                            onChangeText={address => this.setState({ address })}
                            placeholderTextColor="#838080"
                            autoCapitalize="words"
                            autoCorrect={false}
                        />
                        <View style={styles.containerAlert}>
                            <Icon name='exclamation-triangle' size={40} color="#ee6c7d" />
                            <Text style={styles.textAlert}>Esteja no endereço informado para definir a posição exata do local.</Text>
                        </View>
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
    scroll: {
        backgroundColor: '#FFF',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    containerForm: {
        flex: 1,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerAlert: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 6,
        paddingTop: 2,
        paddingBottom: 2,
        marginTop: 20,
        marginBottom: 20
    },
    text: {
        width: '90%',
        fontSize: 18,
        color: '#333',
        alignItems: 'center',
        textAlign: 'left'
    },
    textAlert: {
        flex: 1,
        fontSize: 17,
        color: '#ee6c7d',
        alignItems: 'center',
        textAlign: 'center',
    },
    buttom: {
        width: '90%',
        marginTop: 10,
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
        marginTop: 0,
        marginBottom: 20,
        backgroundColor: '#f3f1f1',
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