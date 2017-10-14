import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,TextInput, StatusBar,Image,ScrollView,Switch,Alert} from 'react-native';
import {Container,SwipeRow, Icon, Header, Content, Footer, Title, Button, List, ListItem, Item, InputGroup, Input,Picker,CheckBox, Left, Right,Body, Label,Spinner} from 'native-base';
import { connect } from 'react-redux'
import {trocaTela } from '../redux/actions'
import styles from '../styles'
import firebase from 'firebase';
import Animation from 'lottie-react-native';
import RNGooglePlaces from 'react-native-google-places';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const mapStateToProps = (state) => ({
    atualView:state.atualView,
    atualPlace:state.atualPlace,
    estado:state.estado,
    cidade:state.cidade,
});



class addPonto extends Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: undefined,
      selected1: 'key1',
      results: {items: []},
      deficientes:false,
      arcond:false,
      error: null,
      partida:undefined,
      destino:undefined,
      estado:undefined,
      cidade:undefined,
      loading:false,
      mapa:false,
      coord:null,
    };
  }
  openSearchModal(tipo) {
      this.setState({loading:true})
      RNGooglePlaces.openAutocompleteModal({
        country:'BR',
        useOverlay:true,
      })
      .then((place) => {
        tipo === 0 ? this.setState({loading:false}) : null
        tipo === 0 ? this.setState({partida:{...place}}) : this.setState({destino:place})
        tipo === 1 ? this.getPlace(place.placeID) : null
      })
      .catch((error) => {console.log(error.message), this.setState({loading:false})})

    }
    getPlace(id) {
      const placeApi = 'https://maps.googleapis.com/maps/api/place/details/json?placeid='//caminho para API do Google Places
      const placeKey = '&key=AIzaSyBieUzg4RIa9dMYEvM5SG6b0yvAoJPRnbk' //Key para acessar a API
      const json = placeApi+id+placeKey // caminho completo do places com o ID do local e a key obrigatórios

       return fetch(json)
         .then((response) => response.json())
         .then((responseJson) => {
            responseJson.result.address_components.forEach(function(entry, index) {
              if (entry.short_name.length === 2  && entry.short_name !== 'BR'){
                this.setState({estado:responseJson.result.address_components[index].short_name})
                this.setState({cidade:responseJson.result.address_components[--index].short_name})
                this.setState({loading:false})
              }
            }.bind(this))
         })
         .catch((error) => {
           this.setState({loading:false})
           console.error(error);
         });
     }
  fitPadding(fit) {
    console.log(fit);
    this.map.fitToCoordinates([fit], {
      edgePadding: { top: 80, right: 80, bottom: 80, left: 80 },
      animated: true,
    })
  }

  getRef(ref){
    return firebase.database().ref().child(ref);
  }
  addLocal(){
    this.setState({loading:true})
    var userId = firebase.auth().currentUser.uid;
    var nome = ''
    var contato = ''
    firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      nome = snapshot.val().nome;
      contato = snapshot.val().contato;
    }).then(() => {
        this.getRef('locais').push(
          {...this.state.destino,
              cidade:this.state.cidade,
              estado:this.state.estado,
              partida:{...this.state.partida},
              nome:nome,
              contato:contato,
              userId:userId,
              deficientes:this.state.deficientes,
              arcond:this.state.arcond,
          }).then(() => {
            return(
            Alert.alert(
                'Cadastro Efetuado',
                'Local cadastrado com sucesso !',
                [{text: 'OK',onPress: ()=>this.props.dispatch(trocaTela('MeusLocais'))},])
            )
          }).catch(e => {
            console.log('Catched object set:' + e.message);
          })
        this.setState({loading:false})
    }).catch(e => {
      console.log('erro ao retornar usuário:' + e.message);
      this.setState({loading:false})
    })
  }

  buttonSpinner(){
    if (this.state.loading){
      return(
        <Spinner color='#24CE84' />
      )
    }
    else {
      return(
        <View>
          <Button block
            disabled = {(this.state.partida === undefined && this.state.destino === undefined)?true:false}
            onPress={()=>this.addLocal()}
            style = {StyleSheet.flatten([styles.buttonLogin, {justifyContent:'center',margin: 5, backgroundColor:'#24CE84' }])}>
            <Text style={{color:'white', fontSize:19, fontWeight:'500'}}>Adicionar local !</Text>
          </Button>
        </View>
      )
    }
  }
  componentDidUpdate(){
      {(this.map !==undefined && this.state.mapa) ? this.map.fitToCoordinates([this.state.coord], {
                                    edgePadding: { top: 40, right: 40, bottom: 40, left: 40 },
                                    animated: true,
                                  }) : null}
  }

  render(){
    if (this.state.mapa) {
      return(
        <Container>
          <MapView
            ref={ref => {this.map = ref; }}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            mapType= {this.props.satelite ? 'hybrid' : 'standard'}
            //showsUserLocation={true}
            //followsUserLocation = {true}
            //showsMyLocationButton = {true}
            showsPointsOfInterest = {true}
            showsCompass = {true}
            onPress={(e) => this.onMapPress(e)}
            toolbarEnabled= {false}/>
            <Button full
              onPress = {()=>this.setState({mapa:false})}
              style = {StyleSheet.flatten({justifyContent:'center', backgroundColor:'hsla(331, 77%, 56%, 1)' })}>
              <Text style={{color:'white', fontSize:19, fontWeight:'500'}}>Voltar</Text>
            </Button>

        </Container>

      )
    }else{
    return(
      <View style={styles.container}>
        <ScrollView style={{flex:1, margin:5}}>
          <View >
            <ListItem itemDivider><Text>Partidade e Destino</Text></ListItem>
              <ListItem>
                <Text>{this.state.partida === undefined ? "Clique adicionar partida": this.state.partida.name}</Text>
                 <Right>
                   <View style={{flexDirection:'row'}}>
                     <Button style={{backgroundColor:'hsla(331, 77%, 56%, 1)'}}
                        onPress={()=>this.openSearchModal(0)}>
                       <Icon active name="add" />
                     </Button>
                     {this.state.partida === undefined ? null :
                     <Button style={{marginLeft:2,backgroundColor:'#1b7ced'}}
                        onPress={()=>{this.setState({mapa:true}),
                          this.setState({coord:{
                              latitude:this.state.partida.latitude,
                              longitude:this.state.partida.longitude,
                          }})}}>
                       <Icon active name="ios-navigate-outline" />
                     </Button>}
                  </View>
                 </Right>
              </ListItem>

              <ListItem>
                <Text>{this.state.destino === undefined ? "Clique para adicionar destino": this.state.destino.name}</Text>
                 <Right>
                   <View style={{flexDirection:'row'}}>
                     <Button style={{backgroundColor:'hsla(331, 77%, 56%, 1)'}}
                        onPress={()=>this.openSearchModal(1)}>
                       <Icon active name="add" />
                     </Button>
                     {this.state.destino === undefined ? null :
                     <Button style={{marginLeft:2,backgroundColor:'#1b7ced'}}
                       onPress={()=>{this.setState({mapa:true}),
                         this.setState({coord:{
                             latitude:this.state.destino.latitude,
                             longitude:this.state.destino.longitude,
                         }})}}>
                       <Icon active name="ios-navigate-outline" />
                     </Button>}
                  </View>
                 </Right>
              </ListItem>

            <ListItem itemDivider><Text>Definições</Text></ListItem>

                <ListItem>
                  <Text>Vagas</Text>
                  <Right>
                  </Right>
                </ListItem>
                <ListItem><Text>Preço médio</Text></ListItem>

            <ListItem itemDivider><Text>Opcionais</Text></ListItem>
                <ListItem>
                  <Text> Vaga para deficientes </Text>
                  <Right><Switch onValueChange = {()=>this.setState({deficientes:!this.state.deficientes})} value ={this.state.deficientes}/></Right>
                </ListItem>
                <ListItem>
                  <Text> Ar-condicionado </Text>
                  <Right><Switch onValueChange = {()=>this.setState({arcond:!this.state.arcond})} value ={this.state.arcond}/></Right>
                </ListItem>

            {this.buttonSpinner()}
        </View>
      </ScrollView>
      </View>
    )

    }
  }
}




export default connect(mapStateToProps)(addPonto);
//export default addPonto
