import React, { Component } from 'react';
import {AppRegistry,ListView, StyleSheet,Text,View,TextInput, StatusBar,Image,ScrollView,Switch,Alert,Animated,TouchableHighlight} from 'react-native';
import {Container, Header, Content, Footer, Title, Button, List, ListItem, Item, InputGroup, Input,Picker,CheckBox, Left, Right,Body, Label, Card, CardItem,} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Animation from 'lottie-react-native';
import { connect } from 'react-redux'
import {trocaTela } from '../redux/actions'
import styles from '../styles'
import firebase from 'firebase';
import ListIt from './ListItem'
import Loading from './loading'

const mapStateToProps = (state) => ({
    atualView:state.atualView,
    satelite:state.satelite,
    atualPlace:state.atualPlace,
    estado:state.estado,
    cidade:state.cidade,
    conexao:state.conexao
});

class MeusLocais extends Component{
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      mounted:true,
      conectado:false,
      loading:false,
      jsonPuro:"",
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    };
    this.ref = null;
  }

  listenForItems() {
    if (this.state.mounted){
      this.setState({loading:true})
      var userId = firebase.auth().currentUser.uid;
      var items = [];
      var query = firebase.database().ref('locais/').orderByChild('userId').equalTo(firebase.auth().currentUser.uid);
      query.on('child_added', (snap) => {
        console.log(snap)
        items.push({...snap.val(),key:snap.key})
        this.setState({
          jsonPuro:items,
          dataSource: this.state.dataSource.cloneWithRows(items),
          loading:false
        });
      })
    }
  }
  promptAlert(item){
    return(
    Alert.alert(
        item.name,
        item.nome,
        [
          {text: 'Remover', onPress: () => firebase.database().ref('locais/').child(item.key).remove()},
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    )
  }

  _renderItem(item) {
    if(item.partida !== undefined) {
      return(
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
      )
    }else{
        return(null)
      }
    }

  componentDidUpdate(){
    {(this.state.loading && (this.animation !== null && this.animation !== undefined)) ? this.animation.play() : null}
  }

  componentDidMount(){
    setTimeout(function()  {
      this.setState({mounted:true})
      //this.ref = firebase.database().ref('locais/').orderByChild('userId').equalTo(firebase.auth().currentUser.uid);
      this.listenForItems()
    }.bind(this),0);
  }
  componentWillUnmount() {
    this.setState({mounted:false})
    console.log(this.state);
  }
  handlePostUpdate = (snapshot) => {
    console.log('Post Content', snapshot.val());
  }

  render(){
    if (this.state.loading && this.props.conexao){
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
              loop={true}
            />
          </View>
            <Text style={{fontSize:24,}}>Carregando...</Text>
        </View>
        )
    }else if(!this.props.conexao) {
      return(
      <View style={{flex:1,justifyContent: 'center',alignItems: 'center',backgroundColor:'white'}}>
        <Icon name ="search" style={{color:'black', fontSize:19}}/>
      </View>
      )
    }else {
      return(
        <View style={styles.container}>
          <ListView dataSource={this.state.dataSource} renderRow={(rowData) => this._renderItem(rowData)} style={styles.listview}/>
        </View>

      )
    }
  }
}
export default connect(mapStateToProps)(MeusLocais);
