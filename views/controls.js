import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

export default class Controls extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
        <ControlButton text='Add' onPress={this.props.onAddTodo}/>
        <View style={{width: 1, backgroundColor: 'gray'}} />
        <ControlButton text='Clear' onPress={this.props.onClearTodos}/>
      </View>
    );
  }
}

const ControlButton = (props) => {
  return (
    <TouchableHighlight underlayColor={'blue'} style={{flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }} onPress={props.onPress}>
      <Text>{props.text}</Text>
    </TouchableHighlight>
  );
}
