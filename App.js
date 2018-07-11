import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Todos from './views/todos.js';
import data from './todos.json';

export default class App extends Component {
  render() {
    return (
        <View>
          <Todos todos={data}/>
        </View>
      );
    }
}

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 36
  }
});
*/
