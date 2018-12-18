import React from 'react';
import {
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import Login     from './Login/Login';
import Cadastro  from './Login/Cadastro';
import Principal from './Marvel/Principal';
import DetalhaPersonagem from './Marvel/DetalhaPersonagem';

export default class App extends React.Component {
  render() {
    return (
      <AppContainer/>
    );
  }
}

const AppNavigator = createStackNavigator({
  Inicio: Login,
  Cadastro: Cadastro,
  Marvel: Principal,
  Detalhar: DetalhaPersonagem,
  //Ranking: Ranking,
  //Resultado: Resultado
}, {
  initialRouteName: "Inicio"
});

const AppContainer = createAppContainer(AppNavigator);
