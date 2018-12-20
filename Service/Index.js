import {
  inicializeFirebase,
  cadastrarUsuario,
  logar,
  isFavorito,
  favoritar,
  logout,
  getFavoritos
} from '../Service/Firebase';

// Geral
export function inicializarServicos() {
  inicializeFirebase();
}

// Autenticação
export function criarUsuario(email, senha) {
  return cadastrarUsuario(email, senha);
}

export function entrar(email, senha) {
  return logar(email, senha);
}

export function sair() {
  return logout();
}

//Marvel
export async function getPersonagem(id, callBackFavorito)  {
  try {
      isFavorito(id, callBackFavorito);
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
      return listaPersonagens[0];
  } catch (error) {
      console.error('erro:' + error);
      return null;
  }
}

export function favoritarPersonagem(id){
  favoritar(id);
}

export async function getPersonagens()  {
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
        return listaPersonagens;
    } catch (error) {
        console.error('erro:' + error);
    }
}

export function getPersonagensFavoritos(callBackFavoritos){
  getFavoritos(callBackFavoritos);
}

export async function recuperarDadosPersonagensFavoritos(favoritos) {
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
        return listaPersonagens;
    } catch (error) {
        console.error('erro:' + error);
        return null;
    }
}