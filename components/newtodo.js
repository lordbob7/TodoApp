import React, { Component } from 'react';
import { View, Modal, TextInput } from 'react-native';

export default class NewTodo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{marginTop: 50, width: 40}}>
        <Modal
          animationType='fade'
          transparent={false}
          visible={this.props.isVisible}
          onRequestClose={this.props.onRequestClose}>
          <View>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={this.props.onChangeText}
              value={this.props.text} />
          </View>
        </Modal>
      </View>
    );
  }
}
