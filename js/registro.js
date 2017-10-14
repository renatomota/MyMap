import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,TextInput, StatusBar,Image,ScrollView,Alert, Picker} from 'react-native';
import {Container, Header, Content, Footer, Title, Button, Icon, List, Item, ListItem, InputGroup, Input,Segment, Toast, Spinner} from 'native-base';
import styles from './styles'
import Estados from './pickers/estados'
////////////////REDUX\\\\\\\\\\\\\\\\\\\\\\\
import { connect } from 'react-redux';
import { register } from './redux/actions'
////////////////REDUX\\\\\\\\\\\\\\\\\\\\\\\
import firebase from "firebase";
import Animation from 'lottie-react-native';

class registro extends Component{

  constructor(props){
    super(props)
    this.state = {
      date:"",
      email:undefined,
      nome:'',
      senha:undefined,
      confirmaSenha:undefined,
      contato:'',
      loading:false,
      estado:'AC',
    }
    //this.signup = this.signup.bind(this);

  }
  signup() {
    this.setState({loading:true})
       firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.senha).then(function() {
          console.log("Account created");
          const contato = this.state.contato
          const nome = this.state.nome
          firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
              contato:contato,
              nome:nome
          })
          return(
          Alert.alert(
              'Cadastro Efetuado',
              'Seu cadastro foi realizado com sucesso !',
              [{text: 'OK',},]
            )
          )
      }.bind(this),function(error) {{console.log(error)}})
      this.setState({loading:false})
  }

  componentDidMount() {
    this.animation.play();
    }
  render(){

    return(

        <Container style={StyleSheet.flatten(styles.container)} >

        <View style={{flex:0.4,alignItems: 'center',justifyContent:'center',backgroundColor:'hsla(0, 0%, 100%, 0.1)', } }>
          <View>
          <Animation
            ref={animation => { this.animation = animation; }}
              style={{
                width: 150,
                height: 150,
              }}
              speed = {0.8}
              source={require('./animation/outline_user.json')}
              loop={false}
            />
          </View>
        </View>
        <ScrollView style={{ backgroundColor:'rgba(255, 255, 255, 0.1)', borderRadius:5, padding:4 ,paddingLeft: 5, paddingRight:5,}}>

            <Item  regular bordered underline='false' style={StyleSheet.flatten(styles.input)}>
              <Icon active name='mail' style={StyleSheet.flatten(styles.whiteIcon)}/>
              <Input
                autoCapitalize='none'
                retunKeyType='next'
                placeholder='Email'
                onChangeText={(email) => this.setState({email})}/>
            </Item>
            <Item regular bordered underline='false' style={StyleSheet.flatten(styles.input)}>
              <Icon active name='person' style={StyleSheet.flatten(styles.whiteIcon)} />
              <Input
                retunKeyType='next'
                placeholder='Nome Completo'
                onChangeText={(nome) => this.setState({nome})}/>
            </Item>

            <Item regular bordered underline='false'  style={StyleSheet.flatten(styles.input)}>
                <Icon active name='md-key' style={StyleSheet.flatten(styles.whiteIcon)}/>
                <Input
                  retunKeyType='next'
                  placeholder='Senha'
                  onChangeText={(senha) => this.setState({senha})}
                  secureTextEntry={true}/>
            </Item>
            <Item regular bordered underline='false'  style={StyleSheet.flatten(styles.input)}>
                <Icon active name='md-key' style={StyleSheet.flatten(styles.whiteIcon)}/>
                <Input
                  retunKeyType='next'
                  placeholder='Confima Senha'
                  onChangeText={(confirmaSenha) => this.setState({confirmaSenha})}
                  secureTextEntry={true}/>
            </Item>

            <Item regular bordered underline='false' style={StyleSheet.flatten(styles.input)}>
              <Icon active name='ios-call' style={StyleSheet.flatten(styles.whiteIcon)}/>
              <Input
                retunKeyType='next'
                placeholder='Contato'
                onChangeText={(contato) => this.setState({contato})}/>
            </Item>
            <View style={{flexDirection:'row',flex:1, }}>
              <Text style={{marginLeft: 9,marginRight:5,fontSize:20, paddingTop:6,}}>Estado residente: </Text>
              <Estados value={this.state.estado} onValueChange={(itemValue)=>this.updateEstados(itemValue)}/>
            </View>

            <Button block
              onPress={()=>this.Cadastrar()}
              style = {StyleSheet.flatten([styles.buttonLogin, {flex:1,  justifyContent:'center',margin: 5, backgroundColor:'#24CE84' }])}>
              <Text style={{color:'white', fontSize:19, fontWeight:'500'}}>Cadastrar</Text>
            </Button>
            <Button block
              onPress = {()=>this.props.dispatch(register())}
              style = {StyleSheet.flatten([styles.buttonLogin, {flex:1,  justifyContent:'center',margin: 5, backgroundColor:'hsla(331, 77%, 56%, 1)' }])}>
              <Text style={{color:'white', fontSize:19, fontWeight:'500'}}>Voltar</Text>
            </Button>

        </ScrollView>

        <View style={{flexDirection:'row',}}></View>

      </Container>
    )
  }
  updateEstados(valor){
    this.setState({estado:valor})
  }
  Cadastrar(){
    if(this.state.senha === undefined || this.state.confirmaSenha === undefined || this.state.email === undefined){
      Toast.show({
            supportedOrientations: ['portrait','landscape'],
            text: 'Preencha todos os campos !',
            position: 'bottom',
            duration: 4000
          })
    } else if (this.state.senha !== this.state.confirmaSenha) {
      Toast.show({
            supportedOrientations: ['portrait','landscape'],
            text: 'As senhas não coincidem !',
            position: 'bottom',
            duration: 4000
          })
    }else {
      this.signup()

    }
  }


}

export default connect()(registro);
//module.exports = registro
