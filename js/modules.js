import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,TextInput, StatusBar,Image,ScrollView,} from 'react-native';
import {Container, Header, Content, Footer, Title, Button, Icon, List, ListItem, Item, InputGroup, Input,Label} from 'native-base';
import styles from './styles'

export function Form (props){
return(
  <Item   underline='false' style={StyleSheet.flatten(styles.input)}>
    {props.children}
    <Input
      retunKeyType='next'
      placeholder={props.nome}
      onChangeText={props.change}
      value={props.value}/>

  </Item>)
}


export function FormSecure (props){
return(
  <Item underline='false'  style={StyleSheet.flatten(styles.input)}>
      {props.children}
      <Input
        retunKeyType='next'
        placeholder={props.nome}
        onChangeText={props.change}
        value={props.value}
        secureTextEntry={true}/>
  </Item>)
}

export function FormFloating (props){
return(

      <Item floatingLabel underline='false' style={style={flex:1, margin:10}}>
        <Label>{props.nome}</Label>
          <Input retunKeyType='next'
          onChangeText={props.change}
          value={props.value} />
      </Item>
    )
}
