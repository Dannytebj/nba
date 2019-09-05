import React from 'react';
import { Platform } from 'react-native';
import {
    createAppContainer,
    createBottomTabNavigator,
    createStackNavigator,
    createSwitchNavigator
} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

// SCREENS
import Auth from './components/auth';
import Games from './components/games';
import News from './components/news';
import NewsArticle from './components/news/newsArticle';
import GamesArticle from './components/games/gamesArticle';
import Logo from './utils/logo';

const headerConf = {
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#001338'
        },
        headerTintColor: 'white',
        headerTitle: Logo
    }  
  }

const NewsStack = createStackNavigator({
    News,
    NewsArticle
}, headerConf);

const GameStack = createStackNavigator({
    Games,
    GamesArticle
}, headerConf);

const AppStack = createBottomTabNavigator({
    News: NewsStack,
    Games: GameStack
},{
    tabBarOptions: {
        activeTintColor: '#fff',
        showLabel: false,
        activeBackgroundColor: '#00194b',
        inactiveBackgroundColor: '#001338',
        style: {
            backgroundColor: '#001338'
        }
    },
    initialRouteName: 'News',
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if(routeName === 'News') {
                iconName = `ios-basketball`
            } else if (routeName === `Games`) {
                iconName = `md-tv`;
            }
            return <Ionicons name={iconName} size={25} color={tintColor} />;
        }
    })
});

const AuthStack = createStackNavigator({
    Auth
},{
    headerMode: 'none'
});

export const RootNavigator = () => {
    return createAppContainer(createSwitchNavigator({
        App: AppStack,
        Auth: AuthStack
    },{
        initialRouteName: 'Auth'
    }))
}