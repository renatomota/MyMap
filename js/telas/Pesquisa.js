import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View, ScrollView, TextInput, StatusBar, TouchableHighlight,Image,TouchableOpacity, ListView, AlertIOS,Alert,Platform,Animated} from 'react-native';
import {Container, Header, Content, Footer, Title, Button, List, ListItem, InputGroup, Input,Body, Right, Left, CheckBox, Switch, Card, CardItem} from 'native-base';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import Drawer from 'react-native-drawer'
import RNGooglePlaces from 'react-native-google-places';
import SideBar from './Sidebar'
import Lists from './ListItem'
import Estados from '../pickers/estados'
import styles from '../styles'
import { connect } from 'react-redux';
import * as firebase from "firebase";
import Animation from 'lottie-react-native';


class Pesquisa extends Component{

  constructor(props) {
      super(props);
      this.state = {
        progress: new Animated.Value(0),
        estado:null,
        pesquisa:false,
        loading:false,
        deficientes:false,
        arcond:false,
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        })
      };

    }

    listenForItems() {
      this.setState({loading:true})
      var userId = firebase.auth().currentUser.uid;
      var items = [];
      var query = firebase.database().ref('locais').orderByChild('estado').equalTo(this.state.estado);
      query.on('child_added', (snap) => {
        if (snap.val().userId !== userId){
          items.push(snap.val())
          console.log(snap.val().userId);
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(items),
          })
        }
        this.setState({loading:false})
      })
    }

    pesquisar(){
      if (this.state.estado !== null){
        this.listenForItems()
        this.setState({pesquisa:false})
      }
    }

    componentDidUpdate(){
      {(this.animation !== null) ? this.animation.play() : null}
    }

    componentDidMount() {
      {(this.animation !== null) ? this.animation.play() : null}
    }

  render(){
    if (this.state.loading){
      return(
        <View style={{flex: 1,flexDirection: 'column',justifyContent: 'center',alignItems: 'center', }}>
          <View>
          <Animation
            ref={animation => { this.animation = animation; }}
              style={{
                width: 300,
                height: 300,
              }}
              source={require('../animation/loading_.json')}
              speed= {0.6}
              loop={true}
            />
          </View>
          <Text style={{fontSize:24,}}>Procurando...</Text>
        </View>
        )
    }else if (this.state.pesquisa){
      return(
        <View style={styles.container}>
        <ScrollView style={styles.container}>
          <ListItem itemDivider><Text>Filtros</Text></ListItem>
             <ListItem>
               <Text> Vaga para deficientes </Text>
               <Right><Switch onValueChange = {()=>this.setState({deficientes:!this.state.deficientes})} value ={this.state.deficientes}/></Right>
             </ListItem>
             <ListItem>
               <Text> Ar-condicionado </Text>
               <Right><Switch onValueChange = {()=>this.setState({arcond:!this.state.arcond})} value ={this.state.arcond}/></Right>
             </ListItem>
             <ListItem>
               <Text>*Estado de destino: </Text>
               <Right><Estados value={this.state.estado} onValueChange={(itemValue)=>this.setState({estado:itemValue})}/></Right>
             </ListItem>
        </ScrollView>
        <Button full
          onPress = {()=>this.pesquisar()}
          //onPress = {()=>this.setState({pesquisa:false})}
          style = {StyleSheet.flatten({justifyContent:'center', backgroundColor:'hsla(331, 77%, 56%, 1)' })}>
          <Text style={{color:'white', fontSize:19, fontWeight:'500'}}>Pesquisar !</Text>
        </Button>
      </View>
      )
    }else{
      return(
        <View style={{flex:1}}>
          <Button style = {{backgroundColor:'hsla(331, 77%, 56%, 1)',}} full
            onPress = {()=>this.setState({pesquisa:true})}>
            <Text style={{color:'white'}}>Toque para pesquisar </Text>
            <Icon name ="search" style={{color:'white', fontSize:19}}/>
          </Button>

          {this.state.dataSource._dirtyRows.length === 0
          ?<View style={{flex:1,flexDirection: 'column',justifyContent: 'center',alignItems: 'center',backgroundColor:'hsla(0, 0%, 100%, 1)'}}>
              <View>
              <Animation
                ref={animation => { this.animation = animation; }}
                  style={{
                    width: 300,
                    height: 300,
                  }}
                  source={require('../animation/search-ask_loop.json')}
                  speed= {0.5}
                  loop={true}
                />
              </View>
              <Text style={{fontSize:24,}}>Nada a exibir</Text>
              <Text style={{fontSize:24,}}>Pesquise um novo destino</Text>
            </View>
          :<View style={styles.container}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this._renderItem.bind(this)}
              enableEmptySections={true}
              style={styles.listview}/>
            </View>}
          </View>
        )
    }

  }

 _renderItem(item) {
   if(item.partida !== undefined) {
   return (
     <TouchableHighlight onPress={()=>this.promptAlert(item)}>
       <Card>
         <CardItem bordered={true}>
           <Body>
             <Text>De {item.partida.name} até {item.name}</Text>
             <Text note><Icon name="user-circle"/> {item.nome}</Text>
             <Text note><Icon name="phone"/> {item.contato}</Text>
           </Body>
           <Right>
             <View style={{flexDirection:'row'}}>
               {item.deficientes ? <Icon active name ="wheelchair-alt" size={20} color="#5c5c5c"/>:null}
               {item.arcond ? <Icon style={{paddingLeft:2}} active name ="snowflake-o" size={20} color="#38a2e6"/>:null}
             </View>
           </Right>
         </CardItem>
       </Card>
     </TouchableHighlight>
   )}else{
     return(null)
   }
 }
}

export default connect()(Pesquisa);
//module.exports = Pesquisa
