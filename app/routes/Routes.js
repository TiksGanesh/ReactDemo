import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { AppLoader } from '../routes/AppLoader.js';
import { Register } from '../screens/Register.js';
import { Login } from '../screens/Login.js';
import { Home } from '../screens/Home.js';
import { Details } from '../screens/Details.js';

import { Map } from '../screens/Map.js';
import { Profile } from '../screens/Profile.js';



const defaultStackNavigationOptions = {
    defaultNavigationOptions: {
        headerShown: false
    }
}


// --- Login Stack Code ---

const loginStackScreen = {
    LoginRT: {
        screen: Login,
        title: 'Login'
    },
    RegisterRT: {
        screen: Register,
        title: 'Register'
    }
}

const loginRegisterStack = createStackNavigator(loginStackScreen, defaultStackNavigationOptions);

// --- Dashboard Stack Code ---

const dashbaordStackScreen = {
    HomeRT: {
        screen: Home,
        title: 'Users'
    },
    DetailsRT: {
        screen: Details,
        title: 'Details'
    }
}

const homeDetailStack = createStackNavigator(dashbaordStackScreen, defaultStackNavigationOptions);


// --- TabBar Code ---

const dashboardTabScreens = {

    HomeRT: {
        screen: homeDetailStack,
        title: 'Home',
        navigationOptions: {
            tabBarLabel: 'Users',
        }
    },
    MapRT: {
        screen: Map,
        title: 'Map',
        navigationOptions: {
            tabBarLabel: 'Map'
        }
    },
    ProfileRT: {
        screen: Profile,
        title: 'Profile',
        navigationOptions: {
            tabBarLabel: 'Profile'
        }
    }
    // add more tabs
}

const dashboardTabs = createBottomTabNavigator(dashboardTabScreens, {});

// --- Switch Navigator ---

const appSwitchNavigator = createSwitchNavigator(
    {
        AppLoaderRT: {
            screen: AppLoader,
            navigationOptions: { header: null }
        },
        LoginStackRT: loginRegisterStack,
        DashboartTabStackRt: dashboardTabs

    }, {
    initialRouteName: 'AppLoaderRT'
});

// Below line returns all screen register with HomeStack to App.js as Single View
export default createAppContainer(appSwitchNavigator);