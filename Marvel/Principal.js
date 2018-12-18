import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    FlatList
} from 'react-native';
import ItemPersonagem from '../componentes/ItemPersonagem';
import BotaoCustomizado from '../componentes/BotaoCustomizado';
import {
    logout,
    inicializeFirebase,
    temFavoritos,
    getFavoritos
} from '../Service/Firebase';
//import {recuperarPersonagens} from '../Service/MarvelService'
  

export default class Principal extends Component {
  
    static navigationOptions = {
      title: 'Personagens',
    };

    constructor() {
        super();
        this.state = {
            personagens:[]
        }
    }

    async componentWillMount() {
      inicializeFirebase();
      this.recuperarPersonagens();
    }

    ordenarResultado = (resultado) => {
        const resultadoOrdenado = resultado.sort((a, b) => {
            if (a.pontuacao > b.pontuacao) {
              return -1;
            }
            if (a.pontuacao < b.pontuacao) {
              return 1;
            }
            return 0;
          });
        this.setState({ranking: resultadoOrdenado});
    }

    sair(){
        logout()
        this.props.navigation.navigate('Inicio');
    }

    detalharPersonagem = (id) => {
        this.props.navigation.navigate('Detalhar', {idPersonagem:id});
    }

    async recuperarPersonagens()  {
        try {

            const url = "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=551148f586658804f0469ff9d7281d31&hash=d293e3579029a89690636ea7069b6600";
            const resultado = await fetch(url);
            const resultadoJSON = await resultado.json();
            const personagensJSON = resultadoJSON.data.results;
            let listaPersonagens = [];
            personagensJSON.forEach(personagem => {
                listaPersonagens.push({
                    id:personagem.id,
                    nome:personagem.name,
                    imagem:`${personagem.thumbnail.path}.${personagem.thumbnail.extension}`
                })
            });
            this.setState({
                personagens:listaPersonagens
            })
        } catch (error) {
            console.error('erro:' + error);
        }
    }

    recuperarDadosFavoritos = async (favoritos) => {
        try {
            let listaPersonagens = [];
            for (let i = 0; i < favoritos.length; i++) {
                const idFavorito = favoritos[i];
                const url = `https://gateway.marvel.com/v1/public/characters/${idFavorito}?ts=1&apikey=551148f586658804f0469ff9d7281d31&hash=d293e3579029a89690636ea7069b6600`;
                const resultado = await fetch(url);
                const resultadoJSON = await resultado.json();
                const personagensJSON = resultadoJSON.data.results;
                personagensJSON.forEach(personagem => {
                    listaPersonagens.push({
                        id:personagem.id,
                        nome:personagem.name,
                        imagem:`${personagem.thumbnail.path}.${personagem.thumbnail.extension}`
                    })
                });
            }
            this.setState({
                personagens:listaPersonagens
            })
        } catch (error) {
            console.error('erro:' + error);
        }
    }

    async recuperarIdsFavoritos()  {
        getFavoritos(this.recuperarDadosFavoritos.bind(this));
    }
  
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.personagens}
                    renderItem={(itemlista) => <ItemPersonagem personagem={itemlista.item} onPress={this.detalharPersonagem.bind(this)}/>}>
                </FlatList>
                <View style={styles.containerBotoes}>
                    <BotaoCustomizado texto='Favoritos' onPress = {this.recuperarIdsFavoritos.bind(this)}/>
                    <BotaoCustomizado texto='Sair' onPress = {this.sair.bind(this)} />
                </View>
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
    containerBotoes: {
        flexDirection:'row',
        justifyContent: 'space-evenly',
    }
});

const apikey = '551148f586658804f0469ff9d7281d31';
const chavePrivada = 'db9f4d51fdc457995ce2e8b708e66462a439ba7a';
const chavePublica = '551148f586658804f0469ff9d7281d31';