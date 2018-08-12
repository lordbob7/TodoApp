import React, { Component } from 'react';
import { TouchableHighlight, ScrollView, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';

export default class Todos extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let todos = this.props.todos.map(item =>
        <Todo onPress={() => {this.props.onPress(item)}} todo={item} key={item.text} text={item.text} done={item.done} />
    );

    return(
      <ScrollView style={{backgroundColor: 'white'}}>
        {todos}
      </ScrollView>
    );
  }
}

const Todo = (props) => {
  let doneColor = 'rgba(111, 255, 77, 0.25)';
  let bgColor = props.done ?  doneColor : 'white';  
  return (
    <TouchableHighlight underlayColor={doneColor} onPress={props.onPress} style={{backgroundColor: bgColor}}>
      <View style={styles.todo}>
        <Text style={{fontSize:28, textAlign:'center'}}>{props.text.toUpperCase()}</Text>
      </View>
    </TouchableHighlight>
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
