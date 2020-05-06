import React from 'react'
import { Container, Header, Content, Body, Title, Left, Right, Button, Icon, Toast, Text } from 'native-base'
import FingerprintScanner from 'react-native-fingerprint-scanner';


export class FingerprintAuthios extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            errorMessageLegacy: undefined,
            biometricLegacy: undefined
        };


    }

    componentDidMount() {
        FingerprintScanner
            .authenticate({ description: 'Scan your fingerprint on the device scanner to continue' })
            .then(() => {
                this.dispalaySuccessToast('Authenticated successfully')
                this.goBack()
            })
            .catch((error) => {
                this.dispalayErrorToast(error.message)
                this.goBack()
            });
    }

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