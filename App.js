/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Root } from 'native-base';
import Navigator from './app/routes/Routes.js';
import dbManager from './app/database/Database.js';
export default class App extends React.Component {

  componentDidMount() {
    this.checkDB()
    
  }

  checkDB = async () => {
    try {
      await dbManager.initialiseDatabase()
    } catch (e) {
      console.log(e);
    }
  }

  

  render() {
    return (
      <Root>
        <Navigator />
      </Root>
    );
  }
};