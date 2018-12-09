import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableNativeFeedback } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';

const iconSize = 28;

export default class Controls extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let viewStyle = {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center'
    }

    let addIcon = (<AntDesignIcon name='plus' size={iconSize} />);
    let removeIcon = (<FeatherIcon name='trash' size={iconSize} />);
    let backIcon = (<AntDesignIcon name='left' size={iconSize} />);

    return (
      this.props.selectionActive ? (
        <View style={viewStyle}>
          <ControlButton text='Clear' icon={removeIcon} onPress={this.props.onClearTodos} />
          <ControlButton text='Deselect' icon={backIcon} onPress={this.props.onDeselectTodos} />
        </View>
        ) : (
        <View style={viewStyle}>
          <ControlButton text='Clear' icon={removeIcon} onPress={this.props.onClearTodos} />
          <ControlButton text='Add' icon={addIcon} onPress={this.props.onAddTodo} />
        </View>
      )
    );
  }
}

const ControlButton = (props) => {
  return (
    <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()} onPress={props.onPress}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(240, 255, 243, 0.3)' }}>
        {props.icon}
      </View>
    </TouchableNativeFeedback>
  );
}
