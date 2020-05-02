import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Container, Header, Content, Body, Title, Left, Right, Button, Icon, Text, List } from 'native-base'
import * as Keys from '../preferences/Constant.js'
import * as Style from '../theme/Theme.js'
import dbManager from '../database/Database.js'
import { UserCardItem } from '../custom/UserCardItem.js'



export class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            allUsers: [],
            isLoading: true
        }
    }

    componentDidMount() {
        this.loadAllUsers()
    }

    loadAllUsers = async () => {
        let users = await dbManager.getAllUsers();
        this.setState({ allUsers: users, isLoading: false })
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>Users</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <List style={{ width: undefined, height: '100%' }}>
                        {this.state.allUsers.map((item, index) => (

                            <UserCardItem key={index}
                                onPress={() => { this.props.navigation.push('DetailsRT', { data: item }) }}
                                fullname={item.firstname + ' ' + item.lastname}
                                email={item.email}
                                gender={item.gender}
                            />
                        ))}
                    </List>
                </Content>
            </Container>
        )
    }
}

// 83165-`51443