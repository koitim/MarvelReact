import React, { Component } from 'react';
import ItemPersonagem       from '../componentes/ItemPersonagem';
import BotaoCustomizado     from '../componentes/BotaoCustomizado';
import {
    View,
    StyleSheet,
    FlatList
} from 'react-native';
import {
  inicializarServicos,
  getPersonagens,
  sair,
  getPersonagensFavoritos,
  recuperarDadosPersonagensFavoritos
} from '../Service/Index';
  

export default class Principal extends Component {
  
    static navigationOptions = {
      title: 'Personagens',
    };

    constructor() {
        super();
        this.state = {
            listaFavoritos:false,
            personagens:[]
        }
    }

    componentWillMount() {
        inicializarServicos();
        this.listarPersonagens();
    }

    sairApp(){
        sair();
        this.props.navigation.navigate('Inicio');
    }

    async listarPersonagens(){
        const listaPersonagens = await getPersonagens();
        this.setState({
            listaFavoritos:false,
            personagens:listaPersonagens
        });
    }

    detalharPersonagem = (id) => {
        this.props.navigation.navigate('Detalhar', {idPersonagem:id});
    }

    recuperarDadosFavoritos = async (favoritos) => {
        const listaPersonagens = await recuperarDadosPersonagensFavoritos(favoritos);
        this.setState({
            listaFavoritos:true,
            personagens:listaPersonagens
        });
    }

    recuperarFavoritos()  {
        getPersonagensFavoritos(this.recuperarDadosFavoritos.bind(this));
    }
  
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.personagens}
                    renderItem={(itemlista) => <ItemPersonagem personagem={itemlista.item} onPress={this.detalharPersonagem.bind(this)}/>}>
                </FlatList>
                <View style={styles.containerBotoes}>
                    <BotaoCustomizado texto='Favoritos' onPress = {this.recuperarFavoritos.bind(this)}/>
                    {this.state.listaFavoritos ? 
                        <BotaoCustomizado texto='Voltar' onPress = {this.listarPersonagens.bind(this)} /> :
                        <BotaoCustomizado texto='Sair' onPress = {this.sairApp.bind(this)} />
                    }
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