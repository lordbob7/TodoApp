import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default class Todos extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let todos = this.props.todos.map(item =>
        <Todo key={item.text} text={item.text} done={item.done} />
    );

    return(
      <ScrollView style={{backgroundColor: 'white'}}>
        {todos}
      </ScrollView>
    );
  }
}

const Todo = (props) => {
  let bgColor = props.done ? 'rgba(111, 255, 77, 0.08)' : 'white';
  //{props.done ? 'green' : 'white'}
  return (
    <View style={[styles.todo, {backgroundColor: bgColor}]}>
      <Text style={{fontSize:28, textAlign:'center'}}>{props.text.toUpperCase()}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  todo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    height:80
  }
})
