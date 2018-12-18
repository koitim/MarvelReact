import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableHighlight
  } from 'react-native';
  

export default class ItemPersonagem extends Component {
  
    render() {
        const personagem = this.props.personagem;
        return (
            <TouchableHighlight 
                style={styles.lista}
                onPress={() => this.props.onPress(personagem.id)}>
                <View style={styles.item}>
                    <Image style={{height:50,width:50}} source={{uri:personagem.imagem}} />
                    <Text style={styles.texto}>{personagem.nome}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}
    
const styles = StyleSheet.create({
    lista: {
        alignSelf: 'stretch',
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: '#AAA',
    },
    item: {
        backgroundColor: '#333',
        alignSelf: 'stretch',
        flex:1,
        flexDirection:'row',
        marginBottom: 2
    },
    item2: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: 'space-between',
    },
    texto: {
        color:'#FFF',
        fontSize:20
    }
});