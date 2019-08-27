import React, { Component } from 'react'
import { Text, StyleSheet, View, Platform, Image, TouchableOpacity } from 'react-native';
import {
    createStackNavigator,
    createBottomTabNavigator,
    createSwitchNavigator,
    createAppContainer
} from 'react-navigation';


// importing ionicons
import Ionicons from '../node_modules/react-native-vector-icons/Ionicons';

// import images and icons
import Back from './assets/icons/back.png';

// Screens 
import SignIn from './components/auth';
import Home from './components/Home';
import Match from './components/Home/Match';
import Player from './components/Home/Player';
import News from './components/news';
import Article from './components/news/Article';
import Games from './components/games';
import GamesArticle from './components/games/Article';

// logo
import Logo from './utils/logo';

const headerConf = {
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#12284D',
            borderBottomColor: 'transparent',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
        },
        headerTintColor: "white",
        headerBackImage: <Image source={Back} resizeMode='contain' style={{ width: 22, marginLeft: 15 }} />,
        headerBackTitle: null,
        // headerRight: <TouchableOpacity onPress={this.props.toggleTheme}><Image source={Back} resizeMode='contain' style={{ width: 22, marginLeft: 15 }} /></TouchableOpacity>
    }
}

// const NewsStack = createStackNavigator({
//     News: News,
//     Article: Article
// }

// const GamesStack = createStackNavigator({

// }, headerConf)



const AppStack = createBottomTabNavigator({
    Home: Home,
    News: News,
    Games: Games
}, {
        tabBarOptions: {
            activeTintColor: "#fff",
            showLabel: false,
            inactiveBackgroundColor: "#12284D",
            style: {
                backgroundColor: '#12284D',
            }
        },
        initialRouteName: 'Home',
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'News') {
                    iconName = `md-bookmark`
                } else if (routeName === 'Games') {
                    iconName = `ios-tv`;
                } else if (routeName === 'Home') {
                    iconName = `md-basketball`;
                }

                return <Ionicons name={iconName} size={25} color={tintColor} />
            }
        })
    });

const AuthStack = createStackNavigator({
    SignIn: SignIn
});
const mainContainer = createStackNavigator({
    App: AppStack,
    News: News,
    Article: Article,
    Games: Games,
    GamesArticle: GamesArticle,
    Match: Match,
    Player: Player
}, headerConf)

const styles = StyleSheet.create({})


export const RootNavigator = (props) => {
    return (
        createAppContainer(createSwitchNavigator({
            App: mainContainer,
            Auth: AuthStack
        }, {
                initialRouteName: 'Auth'
            }))
    )
}
