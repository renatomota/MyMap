

import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Dimensions, Text, View, StatusBar, Platform} from 'react-native';
import {Container, Left,Body, Right, Header, Content, Footer, Title, Button, Icon, List, ListItem, Item, InputGroup, Input,Image,FooterTab} from 'native-base';

import { connect } from 'react-redux';
import { addGeo,trocaTela,conexao } from './redux/actions'

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import RNGooglePlaces from 'react-native-google-places';
import Drawer from 'react-native-drawer'
import SideBar from './telas/Sidebar'
import Mapa from './telas/Mapa'
import MeusLocais from './telas/MeusLocais'
import AddPonto from './telas/addPonto'
import Pesquisa from './telas/Pesquisa'
import firebase from "firebase";
const mapStateToProps = (state) => ({
    atualView:state.atualView,
    atualPlace:state.atualPlace,
    conexao:state.conexao
});

const mapDispatchToProps = (dispatch) => {
  return {
    trocarTela: (tela) => {dispatch(trocaTela(tela))},
    placesAdd: (place) => {dispatch(addGeo(place))},
    registrar:() =>{dispatch(register())}
  }
}


class Inicio extends Component {


  closeControlPanel = () => {
     this._drawer.close()
   };
   openControlPanel = () => {
     this._drawer.open()
   };

   componentWillMount() {
     firebase.database().ref(".info/connected").on("value", function(snap) {
       if (snap.val() === true) {
         this.props.dispatch(conexao(true))
         //
       } else {
         this.props.dispatch(conexao(false))
       }
     }.bind(this));
     console.log(this.props);
   }

  render() {
      return (
        <Container>
          <Header
            searchBar rounded
            androidStatusBarColor = {this.props.conexao ?'hsla(153, 70%, 47%, 0.9)':'hsla(0, 1%, 18%, 0.9)'}
            iosBarStyle = {'light-content'}
            style = {{backgroundColor:this.props.conexao ?'hsla(153, 70%, 47%, 0.9)':'hsla(0, 1%, 18%, 0.9)'}} >
            <Left>
              <Button transparent
                onPress = {()=>this.openControlPanel()}>
                <Icon name='menu' style={{color:'white'}} />
              </Button>
            </Left>
            <Body>{this.props.conexao ? null :<Text style={{color:'white'}}>Sem conexão !</Text>}</Body>
            <Left></Left>
          </Header>

          <Drawer
            type = {'overlay'}
            ref={(ref) => this._drawer = ref}
            content={<SideBar />}
            tapToClose={true}
            openDrawerOffset={0.2} // 20% gap on the right side of drawer
            panCloseMask={0.2}
            closedDrawerOffset={-3}
            styles={drawerStyles}
            tweenHandler={(ratio) => ({
              main: { opacity:(2-ratio)/2 }
            })}>
              {this.SwitchTelas(this.props.atualView)}
          </Drawer>
          <Footer>
            <FooterTab tabActiveBgColor
              style={{backgroundColor:'white'}}>
                <Button vertical
                    onPress = {()=>this.props.dispatch(trocaTela('Pesquisa'))}
                    style = {{backgroundColor:'white'}}>
                    <Icon active  name="search"
                    style = {(this.props.atualView === 'Pesquisa') ? {color:'hsla(216, 72%, 55%, 0.9)'}:{color:'#838383'}}/>
                    <Text style = {{fontSize:11, color:'black'}}>Procurar destino</Text>
                </Button>

                <Button vertical
                    onPress = {()=>this.props.dispatch(trocaTela('AddPonto'))}
                    style = {{backgroundColor:'white'}}>
                    <Icon active  name="bus"
                    style = {(this.props.atualView === 'AddPonto') ? {color:'hsla(216, 72%, 55%, 0.9)'}:{color:'#838383'}}/>
                    <Text style = {{fontSize:11, color:'black'}}>Adicionar locais</Text>
                </Button>

                <Button vertical
                    onPress = {()=>this.props.dispatch(trocaTela('MeusLocais'))}
                    style = {{backgroundColor:'white'}}>
                    <Icon active  name="pin"
                    style = {(this.props.atualView === 'MeusLocais') ? {color:'hsla(0, 72%, 55%, 0.9)'}:{color:'#838383'}}/>
                    <Text style = {{fontSize:11, color:'black'}}>Meus loocais</Text>
                </Button>
            </FooterTab>
          </Footer>
        </Container>
    );

    const drawerStyles = {
      drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
      main: {paddingLeft: 2},
    }
  }

  SwitchTelas(tela){
    switch (tela) {
      case 'AddPonto': return <AddPonto/>;
      case 'Pesquisa': return <Pesquisa/>;
      case 'Mapa': return <Mapa/>
      case 'MeusLocais': return <MeusLocais/>

      default:
         return null
    }
  }


}




export default connect(mapStateToProps)(Inicio);
