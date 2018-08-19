import React, { Component } from 'react';
import {TouchableNativeFeedback, TouchableHighlight, View, Modal, Text, TextInput } from 'react-native';

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
            alignItems: 'center'
          }}>
            <View style={{flex: 1}}/>
            <View elevation={2} style={{
                flex: 7,
                flexDirection: 'column',
                justifyContent: 'center',
                height:150,
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
                    style={{backgroundColor: 'transparent', fontSize: 24, textAlign: 'center'}} />
                </View>
                <View style={{flex: 3, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()} onPress={this.props.onCancel}>
                  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text>Cancel</Text>
                  </View>
                </TouchableNativeFeedback>
                  <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()} onPress={this.props.onConfirm}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                      <Text>Ok</Text>
                    </View>
                  </TouchableNativeFeedback>
                </View>
              </View>
            <View style={{flex: 1}}/>
          </View>
        </Modal>
    );
  }
}
