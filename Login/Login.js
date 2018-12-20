import React            from 'react';
import {View}           from 'react-native';
import InputCustomizado from '../componentes/InputCustomizado';
import BotaoCustomizado from '../componentes/BotaoCustomizado';
import LogoMarvel       from '../componentes/LogoMarvel';
import {styles}         from './Estilos';
import {
  inicializarServicos,
  entrar
} from '../Service/Index';
import {
  validaEmail,
  validaSenha
} from './Funcoes';

export default class Login extends React.Component {
  
  static navigationOptions = {
    title: 'Login',
  };

  constructor() {
    super();
    this.state = dadosIniciais;
  }

  componentWillMount() {
    inicializarServicos();
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
      entrar(email, senha)
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
          senha={false}
        />
        <InputCustomizado
          msgErro={this.state.msgErroSenha}
          style={this.state.estiloInputSenha}
          label="Digite sua senha"
          value={this.state.senha}
          onChange={senha => this.setState({senha})}
          senha={true}
        />
        <BotaoCustomizado texto="Logar" onPress = {this.login.bind(this)} />
        <BotaoCustomizado texto="Cadastrar" onPress = {this.cadastrar.bind(this)} />
      </View>
    );
  }
}

const dadosIniciais = {
  email: '',
  senha: '',
  estiloInputEmail: styles.input,
  estiloInputSenha: styles.input,
  msgErroEmail: '',
  msgErroSenha: ''
};