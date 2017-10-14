import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,TextInput, StatusBar,Image,ScrollView, Platform, Animated  } from 'react-native';
import {Container, Header, Content, Footer, Title, Button, Icon, List, ListItem, Item, InputGroup, Input,Toast, Spinner} from 'native-base';
import styles from './styles'
import {Form,FormSecure} from './modules'
import Animation from 'lottie-react-native';
//import { LoginManager } from 'react-native-fbsdk'
import { connect } from 'react-redux';
import { register, autenticar } from './redux/actions'
import firebase from "firebase";

class login extends Component{
  constructor(props) {
      super(props);
      this.state={
           email:'',
           password:'',
           logando:false,
           logMsg:'',
            progress: new Animated.Value(0),
           }
    }

    logIn(email,password){
      this.setState({logando:true})
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        // ...
        this.setState({logando:false})
      }.bind(this));

    }

    handleFacebookLogin () {
        LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends']).then(
          function (result) {
            if (result.isCancelled) {
              console.log('Login cancelled')
            } else {
              console.log('Login success with permissions: ' + result.grantedPermissions.toString())
            }
          },
          function (error) {
            console.log('Login fail with error: ' + error)
          }
        )
      }


    componentDidMount() {
        this.animation.play();
    }

  render() {


    return (

      <View style={styles.container} >
        <View style={{flex: 1,flexDirection: 'column',justifyContent: 'center',alignItems: 'center', }}>
          <View>
          <Animation
            ref={animation => { this.animation = animation; }}
              style={{
                width: 350,
                height: 350,
              }}
              speed = {0.6}
              source={require('./animation/PinJump.json')}
              loop={true}
            />
          </View>
        </View>

        <View  style={{flex:1, margin:4,}}>

          <Item regular outline underline='false' style={StyleSheet.flatten(styles.input)}>
            <Icon active name='mail' style={StyleSheet.flatten(styles.whiteIcon)} />
            <Input

              retunKeyType= 'next'
              placeholder= 'Email'
              onChangeText= {(email) => this.setState({email})}/>
          </Item>

          <Item regular outline underline='false'  style={StyleSheet.flatten(styles.input)}>
              <Icon active name='md-key' style={StyleSheet.flatten(styles.whiteIcon)} />
              <Input

                retunKeyType='next'
                placeholder="Senha"
                onChangeText= {(password) => this.setState({password})}
                secureTextEntry={true}/>
          </Item>

          {this.state.logando ? <Spinner color='blue' /> :
          <View style = {{flexDirection:'row', marginLeft: 5, marginRight:5,}}>

            <Button block //disabled = {verifica ? false:true}
              style = {StyleSheet.flatten([styles.buttonLogin, {backgroundColor:'#24CE84',}])}
              onPress = {()=>this.logIn(this.state.email,this.state.password)}>
                <Text style={{color:'white', fontSize:17}}>Entrar </Text>
                <Icon active name='log-in' style = {{color:'white'}} />
            </Button>

            <Button block
              style = {StyleSheet.flatten([styles.buttonLogin, {backgroundColor:'hsla(331, 77%, 56%, 1)',}])}
              onPress = {()=>this.props.dispatch(register())}>
                <Text style={{color:'white', fontSize:17, }}>Cadastro </Text>
                <Icon active name='md-add' style = {{color: 'white'}}/>
            </Button>
          </View>}
          {/*{this.state.logando ? null :
          <View  style={{flexDirection:'row',marginLeft: 5, marginRight:5,}}>
            <Button
            style = {StyleSheet.flatten([styles.buttonLogin, {flex:1, backgroundColor:'rgba(66, 103, 179, 1)', justifyContent:'center',}])}
            onPress={this.handleFacebookLogin}>
                <Text style={{color:'white', fontSize:17}}>Continuar com Facebok </Text>
                <Icon  name='logo-facebook' style = {{color:'white'}}/>
            </Button>
          </View>}*/}

        </View>

      </View>


    );
  }
}




export default connect()(login);
//'hsla(198, 80%, 44%, 0.8)', 'hsla(158, 67%, 50%, 1)','hsla(158, 65%, 57%, 1)',
//'hsla(154, 67%, 50%, 1)', 'hsla(192, 65%, 57%, 1)','hsla(199, 65%, 57%, 0.9)'
//module.exports = login
