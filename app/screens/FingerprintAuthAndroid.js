import React from 'react'
import { Platform, Alert } from 'react-native'
import { Container, Header, Content, Body, Title, Left, Right, Button, Icon, Toast, Text } from 'native-base'
import FingerprintScanner from 'react-native-fingerprint-scanner';




export class FingerprintAuthAndroid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            errorMessageLegacy: undefined,
            biometricLegacy: undefined
        };


    }

    componentDidMount() {
        if (this.requiresLegacyAuthentication()) {
            this.authLegacy();
        } else {
            this.authCurrent();
        }
    }

    requiresLegacyAuthentication() {
        return Platform.Version < 23;
    }

    authCurrent() {
        FingerprintScanner
            .authenticate({ title: 'Log in with Biometrics' })
            .then(() => {
                //this.props.onAuthenticate();
                this.dispalaySuccessToast('Authenticated successfully');
                this.goBack()
            }).catch((error) => {
                this.setState({ errorMessage: error.message });
                this.dispalayErrorToast(error.message)
            });
    }

    authLegacy() {
        FingerprintScanner
            .authenticate({ onAttempt: this.handleAuthenticationAttemptedLegacy })
            .then(() => {
                this.props.handlePopupDismissedLegacy();
                Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
            })
            .catch((error) => {
                this.setState({ errorMessageLegacy: error.message, biometricLegacy: error.biometric });
                console.log("Legacy Error", error)
            });
    }

    handleAuthenticationAttemptedLegacy = (error) => {
        this.setState({ errorMessageLegacy: error.message });
        this.dispalayErrorToast(error.message)
    };

    dispalayErrorToast = (errorMessage) => {
        Toast.show({
            text: errorMessage,
            buttonText: "Ok",
            type: "danger",
            duration: 3000
        });
    }

    dispalaySuccessToast = (message) => {
        Toast.show({
            text: message,
            buttonText: "Ok",
            type: "success",
            duration: 3000
        });
    }

    componentWillUnmount() {
        FingerprintScanner.release();
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={this.goBack}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Biometric Auth</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Text>Place finger on Biometric sensor to authenticate yourself.</Text>
                </Content>
            </Container>
        )
    }
}

// 83165-`51443