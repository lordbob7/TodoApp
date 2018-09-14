import React, { Component } from 'react';
import { TouchableHighlight, ScrollView, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import * as colors from './../styles/colors.js';

export default class Todos extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let todos = this.props.todos.map(item =>
        <Todo onPress={() => {this.props.onPress(item)}} onLongPress={() => {this.props.onLongPress(item)}} todo={item} key={item.text} text={item.text} done={item.done} selected={item.selected} />
    );

    return(
      <ScrollView style={{}}>
        {todos}
      </ScrollView>
    );
  }
}

const Todo = (props) => {
  let bgColor = props.selected ?  colors.selectedColor : 'white';
  return (
    <TouchableHighlight underlayColor={colors.todoUnderlayColor} onPress={props.onPress} onLongPress={props.onLongPress}>
      <View style={[styles.todo, {backgroundColor: bgColor}]}>
        <Text style={{fontSize:28, textAlign:'left', color: colors.todoTextColor, marginLeft: 10}}>{props.text.toUpperCase()}</Text>
        {props.done &&
          <Text style={{fontSize:28, textAlign:'right', marginRight: 10}}>&#9632;</Text>
        }
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  todo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    padding: 3,
    borderBottomColor: 'gray',
    borderBottomWidth:0.2
  }
})
