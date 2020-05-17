import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Platform,
    Image
} from 'react-native'
import icon from '../assets/images/icon.png'
import logo from '../assets/images/logo.png'

class Header extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <Image source={icon} style={styles.icon} />
                    <Image source={logo} style={styles.logo} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'ios' ? 40 : 25,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#BBB',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        height: 30,
        width: 26,
        resizeMode: 'contain'
    },
    logo: {
        height: 25,
        width: 183,
        resizeMode: 'contain',
        flex: 1
    }
})

export default Header