import React from 'react'
import {
    createBottomTabNavigator,
    createSwitchNavigator,
    createStackNavigator
} from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'

import Login from '../pages/Login'
import Radar from '../pages/Radar'
import Profile from '../pages/Profile'
import Register from '../pages/Register'
import AddRequestForHelp from '../pages/AddRequestForHelp'
import PrivacyPolicy from '../pages/PrivacyPolicy'
import Terms from '../pages/Terms'

const authRouter = createStackNavigator({
    Login: { screen: Login, navigationOptions: { title: 'Login' } },
    Register: { screen: Register, navigationOptions: { title: 'Cadastro' } },
    Privacy: { screen: PrivacyPolicy, navigationOptions: { title: 'Política de Privacidade' } },
    Terms: { screen: Terms, navigationOptions: { title: 'Termos de Uso' } },

}, {
    initialRouteName: 'Login'
})

const loginOrProfileRouter = createSwitchNavigator({
    Profile: Profile,
    Auth: authRouter
}, {
    initialRouteName: 'Auth'
})

const MenuRoutes = {
    Radar: {
        name: 'Radar',
        screen: Radar,
        navigationOptions: {
            title: 'Radar',
            tabBarIcon: ({ tintColor }) => <Icon name='globe' size={30} color={tintColor} />
        }
    },
    Add: {
        name: 'AddRequestForHelp',
        screen: AddRequestForHelp,
        navigationOptions: {
            title: 'Add Request',
            tabBarIcon: ({ tintColor }) => <Icon name='cutlery' size={30} color={tintColor} />
        }
    },
    Profile: {
        name: 'Profile',
        screen: loginOrProfileRouter,
        navigationOptions: {
            title: 'Profile',
            tabBarIcon: ({ tintColor }) => <Icon name='user' size={30} color={tintColor} />
        }
    }
}

const MenuConfig = {
    initialRouteName: 'Radar',
    tabBarOptions: {
        showLabel: false,
    }
}

const MenuNavigator = createBottomTabNavigator(MenuRoutes, MenuConfig)
export default MenuNavigator