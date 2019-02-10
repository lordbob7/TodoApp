import React, { Component } from 'react';
import { View, TouchableNativeFeedback } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { controlButtonIconColor, rippleColor } from './../styles/colors.js';

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

    let addIcon = (<AntDesignIcon name='plus' size={iconSize} color={controlButtonIconColor} />);
    let removeIcon = (<FeatherIcon name='trash' size={26} color={controlButtonIconColor} />);
    let backIcon = (<AntDesignIcon name='left' size={iconSize} color={controlButtonIconColor}/>);

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
    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(rippleColor, false)} onPress={props.onPress}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(240, 255, 243, 0.3)' }}>
        {props.icon}
      </View>
    </TouchableNativeFeedback>
  );
}
