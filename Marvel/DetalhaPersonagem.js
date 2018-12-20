import React, { Component } from 'react';
import BotaoCustomizado from '../componentes/BotaoCustomizado';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity
  } from 'react-native';
  import {
    inicializarServicos,
    getPersonagem,
    favoritarPersonagem
  } from '../Service/Index';
  

export default class DetalhaPersonagem extends Component {
  
    static navigationOptions = {
      title: 'Detalhe do personagem',
    };

    constructor(props) {
        super(props);
        const idPersonagem = this.props.navigation.getParam('idPersonagem');
        this.state = {
            isFavorito:false,
            id:idPersonagem,
            personagem:{
                nome:'',
                descricao:'',
                imagem:''
            }
        }
    }

    async componentWillMount() {
        inicializarServicos();
        const personagem = await getPersonagem(this.state.id, this.defineFavorito);
        this.setState({
            personagem:personagem
        })
    }

    defineFavorito = (favorito) => {
        this.setState({
            isFavorito:favorito
        })
    }

    voltar = () => {
      this.props.navigation.goBack();
    }

    favoritar = () => {
        const{isFavorito, id} = this.state;
        this.setState({
            isFavorito:!isFavorito
        });
        favoritarPersonagem(id);
    }
  
    render() {
        const {isFavorito, personagem} = this.state;
        return (
            <View style={styles.container}>
                <Image style={styles.imagem} source={{uri:personagem.imagem}} />
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={this.favoritar.bind(this)}>
                        <Image style={styles.favorito} source={isFavorito?favorito:naoFavorito} />
                    </TouchableOpacity>
                    <Text style={styles.titulo}>{personagem.nome}</Text>
                </View>
                <Text style={styles.texto}>{personagem.descricao}</Text>
                <BotaoCustomizado texto='Voltar' onPress = {this.voltar.bind(this)} />
            </View>
        );
    }
}
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
        padding: 10
    },
    texto: {
        alignSelf:'stretch',
        color:'#FFF',
        fontSize:20
    },
    titulo: {
        padding:10,
        alignSelf:'center',
        color:'#FFF',
        fontSize:30
    },
    imagem: {
        alignSelf:'center',
        height:250,
        width:250},
    favorito: {
        alignSelf:'flex-start',
        height:40,
        width:40}
});

const favorito = require('../assets/favorito.png');
const naoFavorito = require('../assets/nao-favorito.png');