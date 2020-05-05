import React from 'react'
import { StyleSheet, Platform, Image, ImageBackground } from 'react-native'
import { View, Container, Header, Content, Body, Text, Button, Spinner, Item, Input, Toast, Form } from 'native-base'
import * as Style from '../theme/Theme.js'
import dbManager from '../database/Database.js';
import session from '../preferences/Session.js';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

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

    componentDidMount() {
        this.confogureGoogleAccount()
    }

    confogureGoogleAccount = () => {

        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId: 'xxxxxxxxxxxxxxxxxxxx',
            offlineAccess: true,
            hostedDomain: '',
            loginHint: '',
            forceConsentPrompt: true,
            accountName: '',
            iosClientId: 'xxxxxxxxxxxxxxxxxxx'
        });
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
        try {
            this.setState({ isLoading: true })
            await GoogleSignin.hasPlayServices()
            const userInfo = await GoogleSignin.signIn()
            console.log('Google User Info:', userInfo.user.email)
            this.posGoogleLoginProcess(userInfo)
        } catch (e) {
            if (e.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                this.dispalayErrorToast('user cancelled the login flow')
            } else if (e.code === statusCodes.IN_PROGRESS) {
                // operation (f.e. sign in) is in progress already
                this.dispalayErrorToast('sign in is in progress already')
            } else if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                this.dispalayErrorToast('play services not available or outdated')
            } else {
                // some other error happened
                this.dispalayErrorToast('something gone wrong')
            }
            console.log('Error', e)
        } finally {
            this.setState({ isLoading: false })
        }
    }

    posGoogleLoginProcess = async (userInfo) => {

        let user = {
            firstname: userInfo.user.givenName,
            lastname: userInfo.user.familyName,
            email: userInfo.user.email,
            password: 'password',
            gender: 'key3'
        };

        let numberOfUserExist = await dbManager.isUserAlreadyExist(user.email);
        if (numberOfUserExist == 0) {
            let insertId = await dbManager.insertUser(user)
            if (insertId > 0) {
                session.storeSessionInfo(user.email);
                session.setGoogleLoginFlag();
                this.props.navigation.navigate('DashboartTabStackRt');
            } else {
                this.dispalaySuccessToast('Error to login user');
            }
        } else {
            session.storeSessionInfo(user.email);
            session.setGoogleLoginFlag();
            this.props.navigation.navigate('DashboartTabStackRt');
        }
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
                            <Form>

                                <Button rounded dark block
                                    style={Style.styles.invitationButton}
                                    onPress={this.loginUser}>
                                    <Text>Login</Text>
                                </Button>



                                <GoogleSigninButton
                                    style={Style.styles.googleButton}
                                    size={GoogleSigninButton.Size.Wide}
                                    color={GoogleSigninButton.Color.Dark}
                                    onPress={this.loginWithGoogle}
                                    disabled={this.state.isSigninInProgress} />

                                <Button transparent light block
                                    style={Style.styles.newUserButton}
                                    onPress={this.navigateToRegisterUser}>
                                    <Text>New User?</Text>
                                </Button>

                            </Form>
                        )}

                    {/* <Button rounded dark block
                        onPress={this.loginWithGoogle}
                        style={Style.styles.googleButton}>
                        <Text>Google+</Text>
                    </Button> */}

                    {/* <Button rounded dark block
                                    onPress={this.loginWithFacebook}
                                    style={Style.styles.facebookButton}>
                                    <Text>Facebook</Text>
                                </Button> */}

                </Content>
            </Container>
        )
    }
}