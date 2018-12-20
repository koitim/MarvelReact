import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput
} from 'react-native';
  

export default class InputCustomizado extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textoErro}>{this.props.msgErro}</Text>
                <TextInput
                    style={this.props.style}
                    placeholder={this.props.label}
                    value={this.props.value}
                    onChangeText={this.props.onChange}
                    secureTextEntry={this.props.senha} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        backgroundColor: '#333'
    },
    textoErro: {
        color: '#F00',
        fontWeight: 'bold'
    }
});