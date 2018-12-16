import React, { Component } from 'react';
import { AppRegistry, AppState, Platform, NativeModules, ScrollView, StyleSheet, Text, View, StatusBar, AsyncStorage } from 'react-native';
import _ from 'lodash';
import Todos from './components/todos.js';
import Controls from './components/controls.js';
import NewTodo from './components/newtodo.js';
import data from './todos.json';
import * as colors from './styles/colors.js';

var statusBarHeight = 20;
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
      todos: [],
      selectionActive: false
    };

    this.onAddTodo = this.onAddTodo.bind(this);
    this.onClearTodos = this.onClearTodos.bind(this);
    this.onConfirmAddTodo = this.onConfirmAddTodo.bind(this);
    this.closeAddNew = this.closeAddNew.bind(this);
    this.onPressTodo = this.onPressTodo.bind(this);
    this.onLongPressTodo = this.onLongPressTodo.bind(this);
    this.storeTodos = this.storeTodos.bind(this);
    this.loadStoredTodos = this.loadStoredTodos.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.onDeselectTodos = this.onDeselectTodos.bind(this);
  }

  async componentDidMount() {
    console.log('componentDidMount');
    this.addEventListeners();
    this.loadStoredTodos();
  }

  async componentWillUnmount() {
      console.log('componentWillUnmount');
      AppState.removeEventListener('change', this.handleAppStateChange);
  }

  addEventListeners() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  async handleAppStateChange(newAppState) {
    console.log(`handleAppStateChange new state: ${newAppState}`);

    if (newAppState === 'background' || newAppState === 'inactive') {
      await this.storeTodos();
    }
  }

  async loadStoredTodos() {
    let todos = []
    let storedItems = await AsyncStorage.getItem(todosStorageKey);
    if (storedItems !== null && storedItems !== '') {
      console.log(`stored items: ${storedItems}`);
      todos = JSON.parse(storedItems);
    }

    this.setState({todos: todos});
  }

  async storeTodos() {
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
    if (this.state.selectionActive) {
      let todos = _.filter(this.state.todos, {'selected': false});
      this.setState({todos: todos, selectionActive: false});
    } else {
      this.setState({todos: [], selectionActive: false});
    }
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
    console.log(`onPressTodo`);
    let todos = this.state.todos.map(t => {
      if (t.text === todo.text) {
        let mutatedTodo = this.state.selectionActive ? {...t, ...{selected: !t.selected}} : {...t, ...{done: !t.done}}
        return mutatedTodo;
      } else {
        return t;
      }
    });

    this.setState({todos: todos, selectionActive: _.some(todos, 'selected')});
  }

  onLongPressTodo(todo) {
    console.log(`onLongPressTodo`);
    
    if (!todo.selected) {
      let todos = this.state.todos.map(t => {
        return t.text === todo.text ? {...t, ...{selected: true}} : t;
      });

      this.setState({todos: todos, selectionActive: _.some(todos, 'selected')});
    }
  }

  closeAddNew() {
    this.setState({addNewVisible: false, addNewInput: ''})
  }

  onDeselectTodos() {
    let todos = this.state.todos.map(t => {
      return {...t, ...{selected: false}}
    });

    this.setState({todos: todos, selectionActive: false});
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
          <View style={{flex: 8, backgroundColor: colors.bgColor}}>
            <Todos onPress={this.onPressTodo} onLongPress={this.onLongPressTodo} todos={this.state.todos} />
          </View>
          <View style={{
                        flex: 1,
                        borderTopWidth:0.0,
                        borderTopColor:'gray'}}>
            <Controls selectionActive={this.state.selectionActive} onAddTodo={this.onAddTodo} onClearTodos={this.onClearTodos} onDeselectTodos={this.onDeselectTodos} />
          </View>
        </View>
      );
    }
}

AppRegistry.registerComponent('todos', () => App);
