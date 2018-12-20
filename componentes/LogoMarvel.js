import React, { Component } from 'react';
import {
    Image,
    StyleSheet
} from 'react-native';
  

export default class LogoMarvel extends Component {
  
    render() {
        return (
            <Image style={styles.imagem} source={require('../assets/marvel-logo.png')}/>
        );
    }
}
    
const styles = StyleSheet.create({
    imagem: {
    flex:1,
    resizeMode:'contain',
    marginBottom: 10
    }
});
    