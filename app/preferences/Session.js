import React from 'react'
import AsyncStorage from '@react-native-community/async-storage';

export class Session {

    /**
     * Store Session Info 
     * @param email Email of User
     */
    storeSessionInfo = (email) => {
        AsyncStorage.setItem(SESSION_KEY, email)
    }

    removeSession = () => {
        AsyncStorage.removeItem(SESSION_KEY);
    }

    getSession = () => {
        return new Promise((resolve, reject) => {
            try {
                AsyncStorage.getItem(SESSION_KEY).then(session => {
                    resolve(session)
                })
            } catch (e) {
                reject(e)
            }
        })
    }

    isSessionAlive = () => {
        return new Promise((resolve, reject) => {
            try {
                AsyncStorage.getItem(SESSION_KEY).then(session => {

                    console.log("Session Data:", session);
                    if (session) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                })

            } catch (e) {
                reject(e)
            }
        })
    }

    setGoogleLoginFlag = () => {
        AsyncStorage.setItem(GOOGLE_LOGIN, JSON.stringify(true))
    }

    isGoogleLogin = () => {
        return new Promise((resolve, reject) => {
            try {
                AsyncStorage.getItem('key', (err, value) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(JSON.parse(value)) // boolean false
                    }
                })
            } catch (e) {
                reject(e)
            }
        })
    }
}



// --- Session Keys ---

const SESSION_KEY = 'session_key';
const GOOGLE_LOGIN = 'google_login'

// --- Session Keys ---

const session = new Session()
export default session;