import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,TextInput, StatusBar,Image,ScrollView,} from 'react-native';
import {Container, Header, Content, Footer, Title, Button, Icon, List, ListItem, Item, InputGroup, Input,} from 'native-base';
import styles from './styles'
import {Form,FormSecure} from './modules'

class home extends Component{
  static navigationOptions = ({ navigation }) => ({
      
  });

  render(){
    return(
      <View/>
    )
  }

}


module.exports = home
