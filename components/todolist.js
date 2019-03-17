import React, { Component } from 'react';
import { TouchableHighlight, ScrollView, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import * as colors from '../styles/colors.js';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default class TodoList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let todos = this.props.todos.map(item =>
        <Todo onPress={() => {this.props.onPress(item)}} 
              onLongPress={() => {this.props.onLongPress(item)}} 
              todo={item} 
              key={item.text} 
              text={item.text} 
              done={item.done} 
              selected={item.selected} />
    );

    return(
      <ScrollView>
        {todos}
      </ScrollView>
    );
  }
}

const Todo = (props) => {
  let bgColor = props.selected ?  colors.selectedColor : colors.bgColor;
  let checkColor = props.done ? colors.checked : colors.unchecked;
  return (
    <TouchableHighlight underlayColor={colors.todoUnderlayColor} onPress={props.onPress} onLongPress={props.onLongPress}>
      <View style={[todoStyle.todo, {backgroundColor: bgColor}]}>
        <Text style={{fontSize:24, fontWeight:'200', textAlign:'left', marginLeft: 20, color: colors.todoTextColor}}>{props.text.toUpperCase()}</Text>
         {props.checkIsEnabled && 
         <View style={{marginRight: 20}}>
            <FeatherIcon name='check' size={28} color={checkColor} />
        </View>
         }
      </View>
    </TouchableHighlight>
  )
}

const todoStyle = StyleSheet.create({
  todo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70,
    padding: 3,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.2
  }
})
