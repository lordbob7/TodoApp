import React, { Component } from 'react';
import { Platform, NativeModules, ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';
import Todos from './views/todos.js';
import Controls from './views/controls.js';
import data from './todos.json';

const statusBarHeight = 20;

const setStatusBarHeight = () => {
  if (Platform.OS === 'android') {
    statusBarHeight = StatusBar.currentHeight;
  } else if (Platform.OS === 'ios') {
    statusBarHeight = NativeModules.StatusBarManager.HEIGHT;
  }
}

setStatusBarHeight();

export default class App extends Component {

  onAddTodo() {
    console.log('onAddTodo');
    //data.push({text:text, done:false});
  }

  onClearTodos() {
    console.log('onClearTodos');
  }

  render() {
    return (
        <View style={{
          flex: 1,
          flexDirection: 'column',
          borderTopWidth: 1,
          borderTopColor: 'gray',
          borderBottomWidth: 1,
          borderBottomColor: 'gray',
          marginTop: statusBarHeight
        }}>
          <View style={{flex: 5}}>
            <Todos todos={data}/>
          </View>
          <View style={{flex: 1, borderTopColor: 'gray', borderTopWidth: 1}}>
            <Controls onAddTodo={this.onAddTodo} onClearTodos={this.onClearTodos} />
          </View>
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
