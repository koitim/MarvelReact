import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import {
  validaNome,
  validaEmail,
  validaSenha,
  validaConfirmacaoSenha
} from './Funcoes'
import {
  inicializeFirebase,
  cadastrarUsuario
} from '../Service/Firebase';
import InputCustomizado from '../componentes/InputCustomizado';
import BotaoCustomizado from '../componentes/BotaoCustomizado';
import LogoMarvel from '../componentes/LogoMarvel';


export default class Cadastro extends React.Component {
  
  static navigationOptions = {
    title: 'Cadastro de usuário',
  };

  constructor(props) {
    super(props);
    this.state = dadosIniciais;
  }

  componentWillMount() {
    inicializeFirebase();
  }

  cadastrar = async () => {
    const {nome, email, senha, confirmaSenha} = this.state;
    let contemErros = false;
    if (validaNome(nome)) {
      this.atualizaNome(styles.input, '');
    }
    else {
      this.atualizaNome(styles.inputError, 'Nome inválido.');
      contemErros = true;
    }
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
    if (validaConfirmacaoSenha(senha, confirmaSenha)) {
      this.atualizaConfirmaSenha(styles.input, '');
    }
    else {
      this.atualizaConfirmaSenha(styles.inputError, 'Confirmação deve ser igual a senha.');
      contemErros = true;
    }
    if (!contemErros) {
      cadastrarUsuario(email, senha)
        .then(() => {
          alert("Usuário cadastrado com sucesso.");
          this.setState(dadosIniciais);
          this.voltar();
        })
        .catch((erro) => {
          alert(erro)
        });
    }
  }

  voltar = () => {
    this.props.navigation.goBack();
  }

  atualizaNome = (estilo, msgErro) => {
    this.setState({
      estiloInputNome: estilo,
      msgErroNome: msgErro
    });
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

  atualizaConfirmaSenha = (estilo, msgErro) => {
    this.setState({
      estiloInputConfirmaSenha: estilo,
      msgErroConfirmaSenha: msgErro
    });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <LogoMarvel />
        <InputCustomizado
          msgErro={this.state.msgErroNome}
          style={this.state.estiloInputNome}
          label="Digite seu nome"
          value={this.state.nome}
          onChange={nome => this.setState({nome})}
        />
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
        <InputCustomizado
          msgErro={this.state.msgErroConfirmaSenha}
          style={this.state.estiloInputConfirmaSenha}
          label="Confirme sua senha"
          value={this.state.confirmaSenha}
          onChange={confirmaSenha => this.setState({confirmaSenha})}
        />
        <BotaoCustomizado texto="Cadastrar" onPress = {this.cadastrar} />
        <BotaoCustomizado texto="Voltar" onPress = {this.voltar} />
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
  nome: '',
  email: '',
  senha: '',
  confirmaSenha: '',
  estiloInputNome: styles.input,
  estiloInputEmail: styles.input,
  estiloInputSenha: styles.input,
  estiloInputConfirmaSenha: styles.input,
  msgErroNome: '',
  msgErroEmail: '',
  msgErroSenha: '',
  msgErroConfirmaSenha: ''
};
