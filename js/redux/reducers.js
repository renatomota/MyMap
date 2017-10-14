import {addGeo,trocaTela,mapSatelite} from './actions'

const initialState = {
    atualView: 'Pesquisa',
    satelite: false,
    latitude:null,
    longitude:null,
    atualPlace:null,
    estado:'',
    cidade:'',
    authorized:false,
    register:false,
    data:undefined,
    conexao:true,
};

 export const reducer = (state = initialState, action) =>{
  switch (action.type){
    case 'ADD_GEO':
    return Object.assign({}, state, {
        atualPlace:action.place,
        estado:action.estado,
        cidade:action.cidade,
    });
    case 'TROCA_TELA':
    return Object.assign({}, state, {
        atualView:action.tela
    });
    case 'MAP_SATELITE':
    return Object.assign({}, state, {
        satelite: !state.satelite
    });
    case 'REGISTER':
    return Object.assign({}, state, {
        register: !state.register
    });
    case 'LOGOUT':
    firebase.auth().signOut()
    ;
    case 'AUTH':
    return Object.assign({}, state, {
        authorized: action.bool
    });
    case 'CONEXAO':
    return Object.assign({}, state, {
        conexao: action.bool
    });
    default:
      return state;
  }
}
