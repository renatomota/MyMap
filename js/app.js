

import React, { Component } from 'react';
import {AppRegistry,View,Text} from 'react-native';
import { StackNavigator,NavigationOptions } from 'react-navigation';
import Loading from './telas/loading'
import Login from './login'
import Registro from './registro'
import Welcome from './Welcome'
import home from './home'
import addPonto from './telas/addPonto'
import Inicio from './Inicio'
import Animation from 'lottie-react-native';
//////////////////////// REDUX \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import {reducer} from './redux/reducers';
const store = createStore( reducer );
//////////////////////// REDUX \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

import * as firebase from "firebase";
const firebaseConfig={
  apiKey: "AIzaSyD2imZSkfL08muqulR4A6ifre-6CEkmKqE",
  authDomain: "tcc1-fd9f5.firebaseapp.com",
  databaseURL: "https://tcc1-fd9f5.firebaseio.com",
  projectId: "tcc1-fd9f5",
  storageBucket: "tcc1-fd9f5.appspot.com",
  messagingSenderId: "445528866197"
}

firebase.initializeApp(firebaseConfig);


const user = firebase.auth().currentUser;


const LoginOrApp = connect(
    (state) => ({
        register: state.register,
        authorized:state.authorized,
    }))
  (({ authorized, register }) => {

    if (authorized) {
        return (<Inicio />);
    }else{
        return (register ? <Registro/> : <Login/>);
    }
});


class MyMap extends Component{
  constructor(props) {
    super(props);
    this.state={
      isLoged:null,
      loading:true,
    }
  }

  componentWillMount() {
    var that = this;
    firebase.auth().onAuthStateChanged(function(user) {
      {console.log(user)}
      if(user) {
        that.setState({
          isLoged:true,
          loading:false,
        })
      }else{
        that.setState({
          isLoged: false,
          loading:false,
        })
      }
    });
  }
  render(){
    if (this.state.loading){
      return(<Loading/>)
      }else{
      return(
        <Provider store={store}>
          {this.state.isLoged ? <Inicio/> : <LoginOrApp/>}
        </Provider>
      )
    }
  }
}
AppRegistry.registerComponent('MyMap', () => MyMap)
