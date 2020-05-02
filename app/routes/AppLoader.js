import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Container, Header, Content, Body, Title, Spinner } from 'native-base'
import * as Keys from '../preferences/Constant.js'
import * as Style from '../theme/Theme.js'
import session from '../preferences/Session.js'


export class AppLoader extends React.Component {

    constructor(props) {
        super(props);
        this.setRootNavigation();
    }

    componentDidUpdate() {
        session.isSessionAlive();
    }

    setRootNavigation = async () => {
        let isUserLoggedin = await session.isSessionAlive();
        console.log("ISe Session ALive:",isUserLoggedin)
        if (isUserLoggedin) {
            this.props.navigation.navigate('DashboartTabStackRt');
        } else {
            this.props.navigation.navigate('LoginStackRT');
        }
    }

    render() {
        return (
            <Container>
                <Content contentContainerStyle={Style.contentCenter}>
                    <Spinner color="red" size="large"></Spinner>
                </Content>
            </Container>
        )
    }
}