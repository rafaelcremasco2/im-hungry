import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../store/actions/user'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import Header from '../components/Header'


class Profile extends Component {
    logout = () => {
        this.props.onLogout()
        this.props.navigation.navigate('Auth')
    }

    render() {
        const options = {
            email: this.props.email,
            secure: true
        }
        return (
            <View style={styles.container}>
                <Header />
                <View style={styles.containerProfile}>
                    <Text style={styles.nickname}>{this.props.name}</Text>
                    <Text style={styles.email}>{this.props.email}</Text>
                    <TouchableOpacity onPress={this.logout} style={styles.buttom}>
                        <Text style={styles.buttomText}>Sair</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerProfile: {
        alignItems: 'center',
        justifyContent: "center",
        padding: 10
    },
    nickname: {
        width: '90%',
        marginTop: 30,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    email: {
        width: '90%',
        marginTop: 20,
        fontSize: 25,
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
    buttomText: {
        fontSize: 20,
        color: '#FFF',
        textAlign: 'center'
    }
})

const mapStateToProps = ({ user }) => {
    return {
        email: user.email,
        name: user.name
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)