import React from 'react'
import { StyleSheet, Platform, CheckBox } from 'react-native'
import { Container, Header, Content, Body, Title, Spinner, Left, Icon, Text, Button, Item, Input, Form, Picker, View, Toast, Right, Switch } from 'native-base'
import * as Keys from '../preferences/Constant.js'
import * as Style from '../theme/Theme.js'
import AsyncStorage from '@react-native-community/async-storage'
import dbManager from '../database/Database.js';


export class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmPassword: '',
            isLoading: false,
            gender: '',
            isSelected: false
        }
    }

    registerUser = async () => {
        let isFormValid = this.validateInput()
        if (isFormValid) {
            console.log('Insert User');
            const { firstname, lastname, email, password, gender } = this.state
            let user = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                gender: gender
            }
            let numberOfUserExist = await dbManager.isUserAlreadyExist(this.state.email);
            if (numberOfUserExist == 0) {
                let insertId = await dbManager.insertUser(user)
                if (insertId > 0) {
                    this.dispalaySuccessToast('User registered');
                    this.navigateBack()
                } else {
                    this.dispalaySuccessToast('Error to register user');
                }
            } else {
                this.dispalayErrorToast('User is already registered');
            }
        }
    }

    validateInput = () => {

        const { firstname, lastname, email, password, confirmPassword, gender, isSelected } = this.state

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

        if (password == '') {
            this.dispalayErrorToast('Password field is empty');
            return false
        }

        if (confirmPassword == '') {
            this.dispalayErrorToast('Confirm Password field is empty');
            return false
        }

        if (password != confirmPassword) {
            this.dispalayErrorToast('Password and Confirm password mismatch');
            return false
        }

        if (gender == '') {
            this.dispalayErrorToast('Select Gender');
            return false
        }

        if (!isSelected) {
            this.dispalayErrorToast('Please accept terms and condition');
            return false
        }

        return true
    }

    navigateBack = () => {
        this.props.navigation.goBack();
    }

    onValueChanges = (value) => {
        console.log('Gender',value)
        this.setState({ gender: value });
    }

    onCheckChanges = (value) => {
        this.setState({ isSelected: value })
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



    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={this.navigateBack}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Register</Title>
                    </Body>
                    <Right />
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
                                onChange={text => this.setState({ email: text.nativeEvent.text })} />
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

                        <Item>

                            <Input
                                secureTextEntry={true}
                                style={Style.styles.inputStyle}
                                placeholderTextColor="#000000"
                                placeholder="Confirm Password"
                                value={this.state.confirmPassword}
                                onChange={text => this.setState({ confirmPassword: text.nativeEvent.text })} />
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

                        {
                            Platform.OS === 'android' ? (
                                <View style={Style.styles.registerChcekBoxView}>
                                    <CheckBox
                                        value={this.state.isSelected}
                                        onValueChange={this.onCheckChanges.bind(this)}
                                    />
                                    <Text style={{ marginTop: 4 }}>I accept terms &amp; condition</Text>
                                </View>
                            ) : (
                                    <View style={Style.styles.registerChcekBoxView}>
                                        <Switch
                                            value={this.state.isSelected}
                                            onValueChange={this.onCheckChanges.bind(this)}
                                        />
                                        <Text style={{ marginTop: 4 }}>I accept terms &amp; condition</Text>
                                    </View>
                                )
                        }

                        {this.state.isLoading ? (
                            <Spinner color="red" />
                        ) : (
                                <Button rounded dark block
                                    style={Style.styles.registerButton}
                                    onPress={this.registerUser}>
                                    <Text>Register</Text>
                                </Button>
                            )}

                    </Form>
                </Content>
            </Container>
        )
    }
}