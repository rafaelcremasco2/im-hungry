import React from 'react'
import {
    createBottomTabNavigator,
    createSwitchNavigator,
    createStackNavigator
} from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'

import Login from '../pages/Login'
import Register from '../pages/Register'
import ForgotPassword from '../pages/ForgotPassword'
import Radar from '../pages/Radar'
import Profile from '../pages/Profile'
import AddRequestForHelp from '../pages/AddRequestForHelp'
import Terms from '../pages/Terms'

const authRouter = createStackNavigator({
    Login: { screen: Login, navigationOptions: { title: 'Login' } },
    Register: { screen: Register, navigationOptions: { title: 'Cadastro' } },
    ForgotPassword: { screen: ForgotPassword, navigationOptions: { title: 'Esqueci minha senha' } },
    Terms: { screen: Terms, navigationOptions: { title: 'Termos de Uso e Privacidade' } },

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