import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import {
  validaEmail,
  validaSenha
} from './Funcoes'
import {
  inicializeFirebase,
  logar
} from '../Service/Firebase';
import InputCustomizado from '../componentes/InputCustomizado';
import BotaoCustomizado from '../componentes/BotaoCustomizado';
import LogoMarvel from '../componentes/LogoMarvel';

export default class Login extends React.Component {
  
  static navigationOptions = {
    title: 'Login Marvel',
  };

  constructor() {
    super();
    this.state = dadosIniciais;
  }

  componentWillMount() {
    inicializeFirebase();
  }

  login() {
    const {email, senha} = this.state;
    let contemErros = false;
    if (validaEmail(email)) {
      this.atualizaEmail(styles.input, '');
    }
    else {
      this.atualizaEmail(styles.inputError, 'Email inválido.');
      contemErros = true;
    }
    if (validaSenha(senha)) {
      this.atualizaSenha(styles.input, '');
    }
    else {
      this.atualizaSenha(styles.inputError, 'Senha é obrigatório.');
      contemErros = true;
    }
    if (!contemErros) {
      logar(email, senha)
        .then(() => {
          this.mudarTela('Marvel');
        })
        .catch((erro) => {
          alert(erro)
        });
    }
  }

  mudarTela(tela) {
    this.props.navigation.navigate(tela);
    this.setState(dadosIniciais);
  }

  cadastrar() {
    this.mudarTela('Cadastro');
  }

  atualizaEmail = (estilo, msgErro) => {
    this.setState({
      estiloInputEmail: estilo,
      msgErroEmail: msgErro
    });
  }

  atualizaSenha = (estilo, msgErro) => {
    this.setState({
      estiloInputSenha: estilo,
      msgErroSenha: msgErro
    });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <LogoMarvel />
        <InputCustomizado
          msgErro={this.state.msgErroEmail}
          style={this.state.estiloInputEmail}
          label="Digite seu e-mail"
          value={this.state.email}
          onChange={email => this.setState({email})}
        />
        <InputCustomizado
          msgErro={this.state.msgErroSenha}
          style={this.state.estiloInputSenha}
          label="Digite sua senha"
          value={this.state.senha}
          onChange={senha => this.setState({senha})}
        />
        <BotaoCustomizado texto="Logar" onPress = {this.login.bind(this)} />
        <BotaoCustomizado texto="Cadastrar" onPress = {this.cadastrar.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 20
  },
  input: {
    height: 45,
    backgroundColor: '#FFF',
    alignSelf: 'stretch',
    borderColor: '#EEE',
    borderWidth: 1,
    marginBottom: 10
  },
  inputError: {
    height: 45,
    backgroundColor: '#FFF',
    alignSelf: 'stretch',
    borderColor: '#F00',
    borderWidth: 2,
    paddingHorizontal: 20,
    marginBottom: 10
  }
});

const dadosIniciais = {
  email: '',
  senha: '',
  estiloInputEmail: styles.input,
  estiloInputSenha: styles.input,
  msgErroEmail: '',
  msgErroSenha: ''
};