export function validaNome(nome) {
  return !(nome == null || nome.trim() == "");
}

export function validaEmail(email) {
  return (/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/).test(email);
}

export function validaSenha(senha) {
  return !(senha == null || senha.trim() == "");
}

export function validaConfirmacaoSenha(senha, confirmaSenha) {
  return senha === confirmaSenha;
}