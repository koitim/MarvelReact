import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity
  } from 'react-native';
  import BotaoCustomizado from '../componentes/BotaoCustomizado';
  import {
    inicializeFirebase,
    favoritar,
    isFavorito
  } from '../Service/Firebase';
  

export default class DetalhaPersonagem extends Component {
  
    static navigationOptions = {
      title: 'Detalhe do personagem',
    };

    constructor(props) {
        super(props);
        const idPersonagem = this.props.navigation.getParam('idPersonagem');
        this.state = {
            favorito:false,
            id:idPersonagem,
            personagem:{
                nome:'',
                descricao:'',
                imagem:''
            }
        }
    }

    async componentWillMount() {
      inicializeFirebase();
      this.recuperarPersonagem();
    }

    async recuperarPersonagem()  {
        const {id} = this.state;
        try {
            await isFavorito(id, this.defineFavorito);
            const url = `https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=551148f586658804f0469ff9d7281d31&hash=d293e3579029a89690636ea7069b6600`;
            const resultado = await fetch(url);
            const resultadoJSON = await resultado.json();
            const personagemJSON = resultadoJSON.data.results;
            let listaPersonagens = [];
            personagemJSON.forEach(personagem => {
                listaPersonagens.push({
                    nome:personagem.name,
                    descricao:personagem.description,
                    imagem:`${personagem.thumbnail.path}.${personagem.thumbnail.extension}`
                })
            });
            this.setState({
                personagem:listaPersonagens[0]
            })
        } catch (error) {
            console.error('erro:' + error);
        }
    }

    defineFavorito = (favorito) => {
        this.setState({
            favorito:favorito
        })
    }

    voltar = () => {
      this.props.navigation.goBack();
    }

    favoritar = () => {
        const{favorito} = this.state;
        this.setState({
            favorito:!favorito
        });
        favoritar(this.state.id);
    }
  
    render() {
        const {personagem} = this.state;
        return (
            <View style={styles.container}>
                <Image style={styles.imagem} source={{uri:personagem.imagem}} />
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={this.favoritar.bind(this)}>
                        <Image style={styles.favorito} source={this.state.favorito?favorito:naoFavorito} />
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