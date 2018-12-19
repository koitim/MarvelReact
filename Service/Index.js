
import firebase from 'firebase';
import {
  inicializeFirebase,
  cadastrarUsuario
} from '../Service/Firebase';

// Geral
export function inicializarServicos() {
  inicializeFirebase();
}

// Autenticação
export function criarUsuario(email, senha) {
  return cadastrarUsuario(email, senha);
}

export async function getUsuarioAtual() {
  return await firebase.auth().currentUser;
}

export function logar(email, senha) {
  return firebase.auth().signInWithEmailAndPassword(email, senha);
}

export function logout() {
  return firebase.auth().signOut();
}

// Banco de dados

export function favoritar(id){
  const idUsuario = firebase.auth().currentUser.uid;
  firebase
    .database()
    .ref()
    .child(BD)
    .child(idUsuario)
    .child(id)
    .once('value')
      .then( function(snapshot) {
        if (snapshot.exists()) {
          firebase
            .database()
            .ref()
            .child(BD)
            .child(idUsuario)
            .child(id)
            .remove(); 
        } else {
          firebase
            .database()
            .ref()
            .child(BD)
            .child(idUsuario)
            .child(id)
            .set(id); 
        }
      });
};

export function temFavoritos(){
  const idUsuario = firebase.auth().currentUser.uid;
  firebase
    .database()
    .ref()
    .child(BD)
    .child(idUsuario)
    .once('value')
      .then( function(snapshot) {
        if (snapshot.exists()) {
          console.log('tem favoritos');
        } else {
          console.log('não tem favoritos');
        }
        return snapshot.exists();
      });
};

export function getFavoritos(callBackFavoritos){
  const idUsuario = firebase.auth().currentUser.uid;
  firebase
    .database()
    .ref()
    .child(BD)
    .child(idUsuario)
    .once('value')
      .then( function(snapshot) {
        let favoritos = [];
        if (snapshot.exists()) {
          snapshot.forEach(childSnapshot => {
            console.log(childSnapshot.key);
            console.log(childSnapshot.val());
              favoritos.push(childSnapshot.val());
          });
        }
        callBackFavoritos(favoritos)
      });
};

export function isFavorito(id, callBackFavorito){
  const idUsuario = firebase.auth().currentUser.uid;
  firebase
    .database()
    .ref()
    .child(BD)
    .child(idUsuario)
    .child(id)
    .once('value')
      .then( function(snapshot) {
        callBackFavorito(snapshot.exists());
      });
};

function encontrouPersonagem(snapshot) {
  
}

function naoEncontrouPersonagem(snapshot) {
  
}

export function recuperarRanking(callBack) {
  firebase
    .database()
    .ref()
    .child(BD)
    .on('value', function(snapshot) {
      let usuarios = [];
      snapshot.forEach(childSnapshot => {
          usuarios.push(childSnapshot.val());
      });
      callBack(usuarios);
    })
}

function getDataAtualFormatada() {
  const data = new Date();
  const dia  = data.getDate().toString()
  const diaF = (dia.length == 1) ? '0' + dia : dia
  const mes  = (data.getMonth() + 1).toString()
  const mesF = (mes.length == 1) ? '0' + mes : mes
  const anoF = data.getFullYear();
  return diaF + "/" + mesF + "/" + anoF;
}

const BD = 'PersonagensFavoritos';

const conexaoFirebase = {
  apiKey: "AIzaSyBR1IBrNvsNmxOzDSe517Y0dAUjC-7eZEc",
  authDomain: "marvelreact-73206.firebaseapp.com",
  databaseURL: "https://marvelreact-73206.firebaseio.com",
  projectId: "marvelreact-73206",
  storageBucket: "",
  messagingSenderId: "925472148637"
};