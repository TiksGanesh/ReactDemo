import React from 'react'
import { StyleSheet, Platform, Image, ImageBackground } from 'react-native'
import { View, Container, Header, Content, Body, Text, Button, Spinner, Item, Input, Toast } from 'native-base'
import * as Style from '../theme/Theme.js'
import dbManager from '../database/Database.js';
import session from '../preferences/Session.js';

export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isLoading: false,
            errMessage: ''
        }
    }

    /**
     *  Login User function
     */

    loginUser = async () => {
        console.log(this.state.username, this.state.password);
        const { username, password, } = this.state
        if (this.validateForm()) {
            let isUserAuthenticated = await dbManager.authenticateUser(username, password);
            console.log('Auth', isUserAuthenticated)
            if (isUserAuthenticated) {
                session.storeSessionInfo(username);
                this.props.navigation.navigate('DashboartTabStackRt');
            } else {
                this.dispalayErrorToast('Please check email and password');
            }
        }
    }

    validateForm = () => {

        const { username, password, } = this.state

        if (username == '') {
            this.dispalayErrorToast('Email field is empty')
            return false
        }

        if (password == '') {
            this.dispalayErrorToast('Password field is empty')
            return false
        }
        return true
    }

    navigateToRegisterUser = () => {
        console.log('register user');
        this.props.navigation.push('RegisterRT');
    }

    loginWithFacebook = () => {

    }

    loginWithGoogle = async () => {

    }

    dispalayErrorToast = (errorMessage) => {
        Toast.show({
            text: errorMessage,
            buttonText: "Ok",
            type: "danger",
            duration: 3000
        });
    }

    render() {
        return (
            <Container>
                <Content contentContainerStyle={Style.styles.contentCenter}>
                    <Item>

                        <Input
                            keyboardType="email-address"
                            style={Style.styles.inputStyle}
                            placeholderTextColor="#000000"
                            placeholder="Email"
                            value={this.state.username}
                            onChange={text => this.setState({ username: text.nativeEvent.text })} />
                    </Item>
                    <Item>

                        <Input
                            secureTextEntry={true}
                            style={Style.styles.inputStyle}
                            placeholderTextColor="#000000"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={text => this.setState({ password: text.nativeEvent.text })} />
                    </Item>

                    {this.state.isLoading ? (
                        <Spinner color="red" />
                    ) : (
                            <Button rounded dark block
                                style={Style.styles.invitationButton}
                                onPress={this.loginUser}>
                                <Text>Login</Text>
                            </Button>
                        )}
                    <Button rounded dark block
                        onPress={this.loginWithFacebook}
                        style={Style.styles.facebookButton}>
                        <Text>Facebook</Text>
                    </Button>

                    <Button rounded dark block
                        onPress={this.loginWithGoogle}
                        style={Style.styles.googleButton}>
                        <Text>Google+</Text>
                    </Button>


                    <Button transparent light block
                        style={Style.styles.newUserButton}
                        onPress={this.navigateToRegisterUser}>
                        <Text>New User?</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}