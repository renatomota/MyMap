import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,TextInput, StatusBar, TouchableHighlight,Platform} from 'react-native';
import {Container, Header, Content, Footer, Title, Segment, Body, Button, Icon, List, ListItem, InputGroup, Input,Left,Right, Toast, Fab, } from 'native-base';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import RNGooglePlaces from 'react-native-google-places';
import styles from '../styles'
import AddPonto from './addPonto'
import Drawer from 'react-native-drawer'
import SideBar from './Sidebar'
import { connect } from 'react-redux';
import { addGeo,trocaTela } from '../redux/actions'

let id = 0;

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const mapStateToProps = (state) => ({
    atualView:state.atualView,
    satelite:state.satelite,
    atualPlace:state.atualPlace,
    estado:state.estado,
    cidade:state.cidade,
});


class Map extends Component{
  constructor(props) {
    super(props);
    this.state = {
        markers: [],
        active:false,
        estado:'',
        cidade:'',
        place:'',
    }
  }

  openSearchModal() {
      RNGooglePlaces.openAutocompleteModal({
        country:'BR',
        useOverlay:true,
      })
      .then((place) => {
        this.getPlace(place.placeID)
        //let estadoCidade = this.getPlace(place.placeID)
        this.setState({place:place})
        //this.props.dispatch(addGeo(place))
      })
      .catch(error => console.log(error.message));  // error is a Javascript Error object

    }
    getPlace(id) {
      const placeApi = 'https://maps.googleapis.com/maps/api/place/details/json?placeid='//caminho para API do Google Places
      const placeKey = '&key=AIzaSyBieUzg4RIa9dMYEvM5SG6b0yvAoJPRnbk' //Key para acessar a API
      const json = placeApi+id+placeKey // caminho completo do places com o ID do local e a key obrigatórios

       return fetch(json)
         .then((response) => response.json())
         .then((responseJson) => {
           console.log(responseJson);
            responseJson.result.address_components.forEach(function(entry, index) {
              if (entry.short_name.length === 2  && entry.short_name !== 'BR'){
                this.setState({estado:responseJson.result.address_components[index].short_name})
                this.setState({cidade:responseJson.result.address_components[--index].short_name})
              }
            }.bind(this))
           this.props.dispatch(addGeo(this.state.place,this.state.estado,this.state.cidade))
         })
         .catch((error) => {
           console.error(error);
         });
     }

  createMarker() {
    return {
      latitude: this.props.atualPlace.latitude,
      longitude: this.props.atualPlace.longitude,
    }

  }

  fitPadding(fit) {
      this._map.fitToCoordinates([fit], {
        edgePadding: { top: 80, right: 80, bottom: 80, left: 80 },
        animated: true,
      });
    }

  onMapPress(e){
    {(e.nativeEvent.coordinate !== undefined) ?
      this.setState({markers: [
        {
          coordinate: e.nativeEvent.coordinate,
          key: id++,
          //color: randomColor(),
        },]})
    : null}
  }
  componentDidMount(){

  }
  componentDidUpdate(){
      {this.props.atualPlace !==null ? this.fitPadding(this.createMarker()) : null}
  }

  render(){

    return(
      <View style = {{ flex:1}}>
          <View style={{flexDirection:'row'}}>
            <Button style = {{backgroundColor:'white', flex:1}} full
              onPress = {()=>this._drawer.open()}>
              <Text style={{color:'#24CE84'}}>Opções de mapa </Text>
              <Icon active name ="map" style={{color:'#24CE84'}}/>
            </Button>
            <Button style = {{backgroundColor:'white',flex:1}} full
              onPress = {()=>this.openSearchModal()}>
              <Text style={{color:'hsla(331, 77%, 56%, 1)'}}>Pesquisar </Text>
              <Icon active name ="ios-search" style={{color:'hsla(331, 77%, 56%, 1)'}}/>
            </Button>
          </View>

          <Drawer
            type = {'overlay'}
            ref={(ref) => this._drawer = ref}
            content={<SideBar />}
            acceptTap={true}
            tapToClose={true}
            openDrawerOffset={0.2} // 20% gap on the right side of drawer
            panCloseMask={0.2}
            closedDrawerOffset={-3}
            styles={drawerStyles}
            tweenHandler={(ratio) => ({
              main: { opacity:(2-ratio)/2 }
            })}>
                <MapView
                  ref={ref => { this._map = ref; }}
                  provider={PROVIDER_GOOGLE}
                  style={styles.map}
                  mapType= {this.props.satelite ? 'hybrid' : 'standard'}
                  //showsUserLocation={true}
                  //followsUserLocation = {true}
                  //showsMyLocationButton = {true}
                  showsPointsOfInterest = {true}
                  showsCompass = {true}
                  onPress={(e) => this.onMapPress(e)}
                  toolbarEnabled= {false}>

                  {this.state.markers.map(marker => (
                    <MapView.Marker
                      key={marker.key}
                      coordinate={marker.coordinate}
                      //pinColor={marker.color}
                    />
                  ))}
                </MapView>
              </Drawer>
          {(this.props.atualPlace !== null) ?
              <Fab
                active={this.state.active}
                direction="right"
                containerStyle={{ marginLeft: 0 }}
                style={{ backgroundColor: 'white',}}
                position="bottomRight"
                onPress={() => this.props.dispatch(trocaTela('AddPonto'))}>
                <Icon active style={{color:'hsla(331, 77%, 56%, 1)'}} name="ios-bookmark-outline" />
              </Fab> : null }

      </View>

    )
    const drawerStyles = {
      drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
      main: {paddingLeft: 2},
    }
  }

}
export default connect(mapStateToProps)(Map);
//module.exports = Map
