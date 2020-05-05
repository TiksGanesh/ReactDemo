import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'


export const styles = StyleSheet.create({
    invitationButton: {
        marginStart: 50,
        marginEnd: 50,
        marginTop: 50,
        fontSize: 20,
        backgroundColor: '#2c80b9'
    },
    contentCenter: {
        flex: 1,
        justifyContent: "center",
        padding: 16
    },
    inputStyle: {
        color: '#000000',
    },
    facebookButton: {
        marginStart: 50,
        marginEnd: 50,
        marginTop: 16,
        fontSize: 20,
        backgroundColor: '#3b5998',
    },
    googleButton: {
        marginStart: 50,
        marginEnd: 50,
        marginTop: 16,
        width: '70%'
    },
    newUserButton: {
        marginStart: 50,
        marginEnd: 50,
        marginTop: 16,
        fontSize: 18,
    },
    registerButton: {
        marginStart: 50,
        marginEnd: 50,
        marginTop: 20,
        fontSize: 20,
        backgroundColor: '#2c80b9'
    },
    registerChcekBoxView: {
        flex: 1,
        flexDirection: "row",
        marginStart: 50,
        marginEnd: 50,
        marginTop: 40
    },
    registerDropDownView: {
        flex: 1,
        flexDirection: "row",
        marginTop: 16
    },
    deleteButton: {
        marginStart: 50,
        marginEnd: 50,
        marginTop: 20,
        fontSize: 20,
    },
    container: {
        flex: 1,
    },
    mapcontainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 115,
        flex: 1
    },
});