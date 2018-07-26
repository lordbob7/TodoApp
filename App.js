import React, { Component } from 'react';
import { AppRegistry, Platform, NativeModules, ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';
import _ from 'lodash';
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
      addNewInput: '',
      todos: []
    };

    this.onAddTodo = this.onAddTodo.bind(this);
    this.onClearTodos = this.onClearTodos.bind(this);
    this.onConfirmAddTodo = this.onConfirmAddTodo.bind(this);
    this.closeAddNew = this.closeAddNew.bind(this);
    this.onPressTodo = this.onPressTodo.bind(this);
  }

  onAddTodo() {
    if (this.state.addNewVisible === false) {
        this.setState({addNewVisible: true});
    }
  }

  onClearTodos() {
    this.setState({todos: []});
  }

  onConfirmAddTodo() {
    let newTodo = {text: this.state.addNewInput, done: false};
    if (this.state.todos.length > 0) {
        this.setState({todos: [...this.state.todos, newTodo]});
    } else {
      this.setState({todos: [newTodo]})
    }

    this.closeAddNew();
  }

  onPressTodo(todo) {
    console.log('onPressTodo');
    let temp = [...this.state.todos];
    for (var i in temp) {
      if (temp[i].text === todo.text) {
        temp[i].done = !temp[i].done;
        break;
      }
    }

    this.setState({todos: [...temp]});
  }

  closeAddNew() {
    this.setState({addNewVisible: false, addNewInput: ''})
  }

  render() {
    console.log(`render() this.state.todos = ${this.state.todos}`);
    return (
        <View style={{
              flex: 1,
              flexDirection: 'column'
        }}>
          <NewTodo
            isVisible={this.state.addNewVisible}
            onChangeText={(text) => this.setState({addNewInput: text})}
            onRequestClose={this.closeAddNew}
            text={this.state.addNewInput}
            onConfirm={this.onConfirmAddTodo}
            onCancel={this.closeAddNew} />
          <View style={{flex: 9}}>
            <Todos onPress={this.onPressTodo} todos={this.state.todos}/>
          </View>
          <View style={{
                        flex: 1,
                        borderTopWidth:0.2,
                        borderTopColor:'gray'}}>
            <Controls onAddTodo={this.onAddTodo} onClearTodos={this.onClearTodos} />
          </View>
        </View>
      );
    }
}

AppRegistry.registerComponent('Todos', () => App);

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
