import React, { Component } from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    elevation:0,
    backgroundColor:'white'
  },
  bDrawer:{
    borderWidth:0,
    borderColor:'rgba(255, 255, 255, 1)',
    backgroundColor:'hsla(0, 0%, 100%, 0.8)'
  },
  drawer:{

    borderWidth:1,
    borderColor:'white',
    borderRadius:5
  },
  conteudo:{
    flex:1,
    alignItems: 'center',
  },
  map: {
    //...StyleSheet.absoluteFillObject,
    flex:1
  },
  cabecalho:{
    flex:0.1,
    backgroundColor:'rgb(30, 185, 101)',
    alignItems: 'center',
  },
  input:{
    marginRight:2,
    borderWidth:0.5,
    borderColor:'rgba(0, 0, 0, 0.2)',
    elevation:0,
    backgroundColor:'hsla(0, 0%, 100%, 0.9)',
    borderRadius:2,
  },
  welcome: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'hsla(0, 0%, 0%, 0.84)',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
        ...StyleSheet.absoluteFillObject,
  },
  buttonLogin:{
    elevation:0,
    flex:1,
    margin:1,
    borderRadius:0,
    backgroundColor:'white'
  },
  whiteIcon:{
    color:'rgba(0, 0, 0, 1)',
  },
  fitView:{
    flex: 1,
    elevation:10,
    backgroundColor:'hsl(0, 0%, 100%)',
    ...StyleSheet.absoluteFillObject,
  },

  listview: {
    flex: 1,
  },
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  liContainer: {
    flex: 2,
  },
  liText: {
    color: '#333',
    fontSize: 16,
  },
  navbar: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: 'center',
    height: 44,
    flexDirection: 'row'
  },
  navbarTitle: {
    color: '#444',
    fontSize: 16,
    fontWeight: "500"
  },
  statusbar: {
    backgroundColor: '#fff',
    height: 22,
  },
  center: {
    textAlign: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  action: {
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
});

module.exports = styles;
