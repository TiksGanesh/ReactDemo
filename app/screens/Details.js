import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Container, Header, Content, Body, Title, Spinner, Form, Text, Left, Right, Icon, Button } from 'native-base'
import * as Keys from '../preferences/Constant.js'
import * as Style from '../theme/Theme.js'
import AsyncStorage from '@react-native-community/async-storage'



export class Details extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: ''
        }
    }

    componentDidMount() {
        let mUser = this.props.navigation.getParam('data')
        console.log(mUser);
        if (mUser.gender === 'key1') {
            mUser.gender = 'Male'
        } else if (mUser.gender === 'key2') {
            mUser.gender = 'Female'
        } else {
            mUser.gender = 'Don\'t Mention'
        }

        this.setState({ user: mUser })
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
                        <Title>Detail</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <Form>
                        <Text>First Name: {this.state.user.firstname}</Text>
                        <Text>Last Name: {this.state.user.lastname}</Text>
                        <Text>Email: {this.state.user.email}</Text>
                        <Text>Gender: {this.state.user.gender}</Text>
                    </Form>
                </Content>
            </Container>
        )
    }
}