import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

export default class BotaoCustomizado extends React.Component {
  
  render() {
    return (
        <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
          <Text style={styles.buttonText}>{this.props.texto}</Text>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: 45,
    backgroundColor: '#f00',
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold'
  }
});
