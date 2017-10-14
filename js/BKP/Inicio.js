

import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Dimensions, Text, View, StatusBar, Platform} from 'react-native';
import {Container, Left,Body, Right, Header, Content, Footer, Title, Button, Icon, List, ListItem, Item, InputGroup, Input,Image} from 'native-base';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import RNGooglePlaces from 'react-native-google-places';
import Drawer from 'react-native-drawer'
import SideBar from './Sidebar'
import Welcome from './Welcome'
import Mapa from './telas/Mapa'
import AddPonto from './telas/addPonto'
import Pesquisa from './telas/Pesquisa'


class Inicio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lightStatusbar: false,
      open:false,
      atualView:Pesquisa,
      latitude: 'teste',
      longitude: null,
      error: null,
    };
  }
  trocaTela(tela){ this.setState({atualView:tela})}

  openSearchModal() {
      RNGooglePlaces.openAutocompleteModal({

        country:'BR',
      })
      .then((place) => {
  		console.log(place);
  		// place represents user's selection from the
  		// suggestions and it is a simplified Google Place object.
      })
      .catch(error => console.log(error.message));  // error is a Javascript Error object
    }


  static navigationOptions = ({ navigation }) => ({
      header:null
  });

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, maximumAge: 2000 },
    );
  }

  render() {
    var Mapas = <Mapa latitude = {this.state.latitude} />
    var sidebar = <SideBar tela={(e) => {this.trocaTela(e), this._drawer.close()}} />

      closeDrawer = () => {
        this._drawer.close()
      };
      openDrawer = () => {
        this._drawer.open()
      };
      const AtualView = this.state.atualView
      const lightStatusbar = this.state.lightStatusbar
      return (
          <Drawer
            ref={(ref) => this._drawer = ref}
            type="static"
            content={sidebar}
            //type="overlay"
            tapToClose={true}
            //open = {this.state.open}
            openDrawerOffset={0.2} // 20% gap on the right side of drawer
            panCloseMask={0.2}
            closedDrawerOffset={-3}
            styles={drawerStyles}
            //onOpen = {() =>this.setState({lightStatusbar: !this.state.lightStatusbar})}
            //onClose = {() =>this.setState({lightStatusbar: !this.state.lightStatusbar })}
            tweenHandler={(ratio) => ({
              main: { opacity:(2-ratio)/2 }
            })}>

              <Header
                searchBar rounded
                androidStatusBarColor = {'rgb(255, 255, 255)'}
                iosBarStyle = {'dark-content'}
                style = {{backgroundColor:'rgba(255, 255, 255, 1)', flexDirection :'row'}} >
                <Left>
                  <Button transparent
                    //onPress = {() =>this.setState({open: !this.state.open})}>
                    onPress = {openDrawer}>
                    <Icon name ="menu" style={{color:'rgb(0, 117, 255)'}}/>
                  </Button>
                </Left>

                {(this.state.atualView == Mapas) ?
                  <Right>
                    <Button
                      onPress={() => this.openSearchModal()}
                      transparent>
                      <Icon name ="search" style={{color:'rgb(0, 117, 255)'}}/>
                    </Button>
                  </Right> : null }

              </Header>


              <AtualView />

             <StatusBar barStyle = {(lightStatusbar && Platform.OS === 'ios') ? "light-content": "dark-content"} />

          </Drawer>



    );
  }
}

const drawerStyles = {
  _drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 13},
  main: {shadowColor: '#000000', shadowOpacity: 0, shadowRadius: 15}
}



module.exports = Inicio
//{this.state.atualView === 0 ?  (<Welcome /> ):  (<Sidebar />)}
