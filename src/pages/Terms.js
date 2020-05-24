import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'


class Terms extends Component {

    render() {
        const terms = require('../assets/web/terms.js')();

        return (
            <WebView
                style={styles.WebViewStyle}
                originWhitelist={['*']}
                //Loading html file from project folder
                source={{ html: terms }}
                //Enable Javascript support
                javaScriptEnabled={true}
                //For the Cache
                domStorageEnabled={true}
            />
        )
    }

}

const styles = StyleSheet.create({
    WebViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
})

export default Terms