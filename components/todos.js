import React, { Component } from 'react';
import { TouchableHighlight, ScrollView, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import * as colors from './../styles/colors.js';

export default class Todos extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let todos = this.props.todos.map(item =>
        <Todo onPress={() => {this.props.onPress(item)}} todo={item} key={item.text} text={item.text} done={item.done} />
    );

    return(
      <ScrollView style={{}}>
        {todos}
      </ScrollView>
    );
  }
}

const Todo = (props) => {
  let textColor = props.done ? colors.doneColor : 'gray';
  //let bgColor = props.done ?  doneColor : 'white';
  return (
    <TouchableHighlight underlayColor={'lightgray'} onPress={props.onPress}>
      <View style={styles.todo}>
        <Text style={{fontSize:28, textAlign:'center', color: textColor}}>{props.text.toUpperCase()}</Text>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  todo: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    height:80,
    padding:3
  }
})
