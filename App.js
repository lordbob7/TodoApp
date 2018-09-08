import React, { Component } from 'react';
import { AppRegistry, Platform, NativeModules, ScrollView, StyleSheet, Text, View, StatusBar, AsyncStorage } from 'react-native';
import _ from 'lodash';
import Todos from './components/todos.js';
import Controls from './components/controls.js';
import NewTodo from './components/newtodo.js';
import data from './todos.json';
import * as colors from './styles/colors.js';

const statusBarHeight = 20;
const todosStorageKey = 'TODOS'

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

  async componentDidMount() {
    let todos = []
    let storedItems = await AsyncStorage.getItem(todosStorageKey);
    if (storedItems !== null && storedItems !== '') {
      console.log(`stored items: ${storedItems}`);
      todos = JSON.parse(storedItems);
    }

    this.setState({todos: todos});
  }

  async componentWillUnmount() {
      console.log('clearing items');
      await AsyncStorage.removeItem(todosStorageKey);
      if (this.state.todos.length > 0) {
        let json = JSON.stringify(this.state.todos);
        console.log(`storing items: ${json}`)
        await AsyncStorage.setItem(todosStorageKey, json);
      }
  }

  onAddTodo() {
    console.log('onAddTodo');
    if (this.state.addNewVisible === false) {
        this.setState({addNewVisible: true});
    }
  }

  onClearTodos() {
    this.setState({todos: []});
  }

  onConfirmAddTodo() {
    if (this.state.addNewInput === '') {
      return;
    }

    let newTodo = {text: this.state.addNewInput, done: false, selected: false};
    this.setState({todos: [...this.state.todos, newTodo], addNewVisible: false, addNewInput: ''});
  }

  /// Toggles the 'done' state of a todo
  onPressTodo(todo) {
    this.setState({todos: this.state.todos.map(t => {
      return t.text === todo.text ? {...t, ...{done: !t.done}} : t;
    })});
  }

  closeAddNew() {
    this.setState({addNewVisible: false, addNewInput: ''})
  }

  render() {
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
          <View style={{flex: 9, backgroundColor: colors.bgColor}}>
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
