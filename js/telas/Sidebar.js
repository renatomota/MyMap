import React, { Component } from 'react';
import {PropTypes,AppRegistry,StyleSheet,Text,View,TextInput, StatusBar,Image,ScrollView,Switch} from 'react-native';
import {Container, Header, Content, Footer, Title, Button, Icon, List, ListItem, Item, InputGroup, Input, Left, Right,Thumbnail} from 'native-base';
import styles from '../styles'
import { connect } from 'react-redux';
import { mapSatelite, logout } from '../redux/actions'
import Animation from 'lottie-react-native';
import Mapas from './Mapa'
import Inicio from '../Inicio'
import AddPonto from './addPonto'
import Pesquisa from './Pesquisa'
import firebase from "firebase";

const mapStateToProps = (state) => ({
    satelite:state.satelite,
});


class Sidebar extends Component {


logOut(){
  firebase.auth().signOut().then(function() {
  // Sign-out successful.
  }, function(error) {
    // An error happened.
  });
}
render(){
  return(

    <View style = {{flex:1, backgroundColor:'hsla(0, 0%, 100%, 0.8)',}}>

      <View style = {{flex:0.5, backgroundColor:'rgba(255, 255, 255, 0.8)',justifyContent: 'center',alignItems: 'center', }}>
        <Text>Circular Thumbnail</Text>
      </View>

    <List style = {{flex:1, backgroundColor:'rgba(255, 255, 255, 0.8)' }}>
      <ListItem>
        <Left><Text> Mapa por satélite </Text></Left>
        <Right><Switch onValueChange = {()=>this.props.dispatch(mapSatelite())} value ={this.props.satelite}/></Right>
      </ListItem>
    </List>
    <Button block
      style = {{backgroundColor:'hsla(331, 77%, 56%, 1)',}}
      onPress = {()=>this.logOut()}>
      <Text style={{color:'white', fontSize:17, }}>Deslogar</Text>
      <Icon active name='ios-log-out' style = {{color: 'white'}}/>
    </Button>
    </View>

  )
}
}
export default connect(mapStateToProps)(Sidebar);
//module.exports = Sidebar
