import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,TextInput, StatusBar, TouchableHighlight} from 'react-native';
import {Container, Header, Content, Footer, Title, Button, Icon, List, ListItem, InputGroup, Input,Drawer} from 'native-base';
import styles from './styles'


export default class welcome extends Component{
  setParentState(args){
      this.props.setParentState(args)
    }

render(){

  return(

        <View style = {{ flex:1, backgroundColor:'rgb(255, 255, 255)'}}/>



  )
}

}
