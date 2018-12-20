import React from 'react';
import {
  View
} from 'react-native';
import {
  validaEmail,
  validaSenha,
  validaConfirmacaoSenha
} from './Funcoes';
import InputCustomizado from '../componentes/InputCustomizado';
import BotaoCustomizado from '../componentes/BotaoCustomizado';
import LogoMarvel       from '../componentes/LogoMarvel';
import {
  inicializarServicos,
  criarUsuario
} from '../Service/Index';
import {styles} from './Estilos';


export default class Cadastro extends React.Component {
  
  static navigationOptions = {
    title: 'Cadastro de usuário',
  };

  constructor(props) {
    super(props);
    this.state = dadosIniciais;
  }

  componentWillMount() {
    inicializarServicos();
  }

  cadastrar = async () => {
    const {email, senha, confirmaSenha} = this.state;
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
    if (validaConfirmacaoSenha(senha, confirmaSenha)) {
      this.atualizaConfirmaSenha(styles.input, '');
    }
    else {
      this.atualizaConfirmaSenha(styles.inputError, 'Confirmação deve ser igual a senha.');
      contemErros = true;
    }
    if (!contemErros) {
      criarUsuario(email, senha)
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
        <InputCustomizado
          msgErro={this.state.msgErroConfirmaSenha}
          style={this.state.estiloInputConfirmaSenha}
          label="Confirme sua senha"
          value={this.state.confirmaSenha}
          onChange={confirmaSenha => this.setState({confirmaSenha})}
          senha={true}
        />
        <BotaoCustomizado texto="Cadastrar" onPress = {this.cadastrar} />
        <BotaoCustomizado texto="Voltar" onPress = {this.voltar} />
      </View>
    );
  }
}

const dadosIniciais = {
  email: '',
  senha: '',
  confirmaSenha: '',
  estiloInputEmail: styles.input,
  estiloInputSenha: styles.input,
  estiloInputConfirmaSenha: styles.input,
  msgErroEmail: '',
  msgErroSenha: '',
  msgErroConfirmaSenha: ''
};
