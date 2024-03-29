import React, { Component } from 'react';
import { AppRegistry, AppState, View, AsyncStorage } from 'react-native';
import _ from 'lodash';
import TodoList from './components/todolist.js';
import Controls from './components/controls.js';
import NewTodo from './components/newtodo.js';
import { colors } from './styles/colors.js';
import appConfig from './appconfig.js';

const todosStorageKey = 'TODOS'

export default class TodoApp extends Component {
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
    this.onCloseAddTodo = this.onCloseAddTodo.bind(this);
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
    if (!storedItems) {
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
      let remainingTodos = _.filter(this.state.todos, {'selected': false});
      this.setState({todos: remainingTodos, selectionActive: false});
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

  onPressTodo(todo) {
    console.log(`onPressTodo`);
    let todos = []

    if (appConfig.checkIsEnabled === true) {
      todos = this.state.todos.map(t => {
        if (t.text === todo.text) {
          let mutatedTodo = this.state.selectionActive ? {...t, ...{selected: !t.selected}} : {...t, ...{done: !t.done}}
          return mutatedTodo;
        } else {
          return t;
        }
      });
    } else {
      return;
    }

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

  onCloseAddTodo() {
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
            onRequestClose={this.onCloseAddTodo}
            text={this.state.addNewInput}
            onConfirm={this.onConfirmAddTodo}
            onCancel={this.onCloseAddTodo} />
          <View style={{flex: 8, backgroundColor: colors.bgColor}}>
            <TodoList onPress={this.onPressTodo} onLongPress={this.onLongPressTodo} todos={this.state.todos} checkIsEnabled={appConfig.checkIsEnabled} />
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

AppRegistry.registerComponent('TodoApp', () => TodoApp);
