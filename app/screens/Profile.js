import React from 'react'
import { Alert, Linking } from 'react-native'
import { Container, Header, Content, Body, Title, Spinner, Left, Icon, Text, Button, Item, Input, Form, Picker, View, Toast, Right } from 'native-base'
import * as Keys from '../preferences/Constant.js'
import * as Style from '../theme/Theme.js'
import AsyncStorage from '@react-native-community/async-storage'
import dbManager from '../database/Database.js'
import session from '../preferences/Session.js'


export class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            isLoading: false,
            gender: undefined,
        }
    }


    componentDidMount() {
        this.getUserProfile();
    }

    getUserProfile = async () => {
        let userSessionInfo = await session.getSession();
        let profile = await dbManager.getUserInfo(userSessionInfo);
        console.log(profile);
        this.setState({ firstname: profile.firstname, lastname: profile.lastname, email: profile.email, gender: profile.gender });
    }

    logOutUser = () => {

        session.removeSession()
        this.props.navigation.navigate('LoginStackRT');
    }

    showDeleteAccountAlert = () => {
        Alert.alert(
            'Delete Account',
            'Do you really want to delete account ?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('cancel'),
                    style: "cancel"
                },

                {
                    text: 'Delete',
                    onPress: () => this.deleteAccount(),
                }
            ],
            { cancelable: false }
        )
    }

    deleteAccount = async () => {
        let isUserDeleteFromDB = await dbManager.deleteUser(this.state.email);
        if (isUserDeleteFromDB) {
            this.logOutUser()
        }

    }

    updateUser = async () => {

        this.setState({ isLoading: true })

        let isFormValid = this.validateInput()
        if (isFormValid) {
            console.log('Update User');
            const { firstname, lastname, email, gender } = this.state
            let user = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                gender: gender
            }
            let isUpdate = await dbManager.updateUser(user);
            console.log("Update Status:", isUpdate)
        }

        this.setState({ isLoading: false })
    }

    validateInput = () => {

        const { firstname, lastname, email, gender } = this.state

        if (firstname == '') {
            this.dispalayErrorToast('First name field is empty');
            return false
        }

        if (lastname == '') {
            this.dispalayErrorToast('Last name field is empty');
            return false
        }

        if (email == '') {
            this.dispalayErrorToast('Email field is empty');
            return false
        }

        if (gender == '') {
            this.dispalayErrorToast('Select Gender');
            return false
        }

        return true
    }



    onValueChanges = (value) => {
        this.setState({ gender: value });
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

    openPrivacyPolicy = () => {
        let url = 'https://www.reactnative-app.com/privacy-policy/';
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + url);
            }
        });
    }


    render() {
        return (
            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>My Profile</Title>
                    </Body>
                    <Right>
                        <Button hasText transparent
                            onPress={this.updateUser}>
                            <Text>Update</Text>
                        </Button>
                    </Right>
                </Header>

                <Content style={{ padding: 16 }}>
                    <Form>
                        <Item>

                            <Input
                                style={Style.styles.inputStyle}
                                placeholderTextColor="#000000"
                                placeholder="First Name"
                                value={this.state.firstname}
                                onChange={text => this.setState({ firstname: text.nativeEvent.text })} />
                        </Item>

                        <Item>

                            <Input
                                style={Style.styles.inputStyle}
                                placeholderTextColor="#000000"
                                placeholder="Last Name"
                                value={this.state.lastname}
                                onChange={text => this.setState({ lastname: text.nativeEvent.text })} />
                        </Item>


                        <Item>

                            <Input
                                keyboardType="email-address"
                                style={Style.styles.inputStyle}
                                placeholderTextColor="#000000"
                                placeholder="Email"
                                value={this.state.email}
                                disabled />
                        </Item>


                        <View style={Style.styles.registerDropDownView}>

                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined, marginStart: 16, marginEnd: 16 }}
                                placeholder="Gender"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.gender}
                                onValueChange={this.onValueChanges.bind(this)}>
                                <Picker.Item label="Select" value="key0" />
                                <Picker.Item label="Male" value="key1" />
                                <Picker.Item label="Female" value="key2" />
                                <Picker.Item label="Don't Mention" value="key3" />
                            </Picker>
                        </View>


                        {this.state.isLoading ? (
                            <Spinner color="red" />
                        ) : (
                                <Button rounded dark block danger
                                    style={Style.styles.deleteButton}
                                    onPress={this.showDeleteAccountAlert}>
                                    <Text>Delete Account</Text>
                                </Button>
                            )
                        }

                        {this.state.isLoading ? (
                            <Spinner color="red" />
                        ) : (
                                <Button rounded dark block success
                                    style={Style.styles.deleteButton}
                                    onPress={this.logOutUser}>
                                    <Text>Log Out</Text>
                                </Button>
                            )
                        }

                        <Button rounded dark block primary
                            style={Style.styles.deleteButton}
                            onPress={this.openPrivacyPolicy}>
                            <Text>Privacy &amp; Policy</Text>
                        </Button>

                    </Form>
                </Content>
            </Container>
        )
    }
}