
export const addGeo = (place,estado,cidade) =>({
  type: 'ADD_GEO',
  place,estado,cidade,
});

export const trocaTela = (tela) =>({
  type: 'TROCA_TELA',
  tela
})

export const mapSatelite= ()=>({
  type:'MAP_SATELITE',
})

export const register= ()=>({
  type:'REGISTER',
})

export const logout= ()=>({
  type:'LOGOUT',
})

export const autenticar= (bool)=>({
  type:'AUTH',
  bool,
})

export const conexao= (bool)=>({
  type:'CONEXAO',
  bool,
})
