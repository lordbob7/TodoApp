import React, { Component } from 'react';
import { Platform, NativeModules, ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';
import Todos from './components/todos.js';
import Controls from './components/controls.js';
import NewTodo from './components/newtodo.js';
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
  constructor(props) {
    super(props);
    this.state = {
      addNewVisible: false,
      addNewInput: ''
    };

    this.onAddTodo = this.onAddTodo.bind(this);
    this.onClearTodos = this.onClearTodos.bind(this);
    this.onCloseAddNew = this.onCloseAddNew.bind(this);
  }

  onAddTodo() {
    console.log('onAddTodo');
    if (this.state.addNewVisible === false) {
        this.setState({addNewVisible: true});
    }
  }

  onClearTodos() {
    console.log('onClearTodos');
  }

  onCloseAddNew() {
    this.setState({addNewVisible: false, addNewInput: ''})
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
          <NewTodo
            isVisible={this.state.addNewVisible}
            onChangeText={(text) => this.setState({addNewInput: text})}
            onRequestClose={this.onCloseAddNew}
            text={this.state.addNewInput} />
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
