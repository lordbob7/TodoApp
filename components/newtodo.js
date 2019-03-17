import React, { Component } from 'react';
import {TouchableNativeFeedback, TouchableHighlight, View, Modal, Text, TextInput } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { colors } from './../styles/colors.js';

const iconSize = 28;

export default class NewTodo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Modal
          animationType='fade'
          transparent={true}
          visible={this.props.isVisible}
          onRequestClose={this.props.onRequestClose}
          onShow={() => {this.refs.todoInput.focus()}}>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-start'
          }}>
            <View elevation={2} style={{
                flex: 7,
                flexDirection: 'column',
                justifyContent: 'center',
                height: 250,
                backgroundColor: 'rgba(252, 250, 248, 1.0)'
               }}>
               <View style={{flex:4, padding: 3, alignItems: 'center', justifyContent: 'center'}}>
                  <TextInput
                    ref='todoInput'
                    underlineColorAndroid='transparent'
                    onChangeText={this.props.onChangeText}
                    onSubmitEditing={this.props.onConfirm}
                    value={this.props.text}
                    clearButtonMode='while-editing'
                    selectTextOnFocus={true}
                    style={{backgroundColor: 'transparent', fontSize: 36, textAlign: 'center'}} />
                </View>
                <View style={{flex: 3, flexDirection: 'row', justifyContent: 'center' }}>
                  <ModalButton iconName='close' onPress={this.props.onCancel} />
                  <ModalButton iconName='check' onPress={this.props.onConfirm} />
                </View>
              </View>
          </View>
        </Modal>
    );
  }
}

const ModalButton = (props) => {
  return(<TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(colors.rippleColor, false)} onPress={props.onPress}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <AntDesignIcon name={this.props.iconName} size={iconSize} />
            </View>
         </TouchableNativeFeedback>)
}
