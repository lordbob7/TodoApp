import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableNativeFeedback } from 'react-native';

export default class Controls extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}>
        <ControlButton text='Clear' onPress={this.props.onClearTodos} />
        <ControlButton text='Add' onPress={this.props.onAddTodo} />
      </View>
    );
  }
}

const ControlButton = (props) => {
  return (
    <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()} onPress={props.onPress}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(240, 255, 243, 0.3)' }}>
        <Text>{props.text}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}
