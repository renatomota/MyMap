import React, { Component } from 'react';
import {AppRegistry,StyleSheet,View,TextInput, StatusBar,Image,ScrollView, Platform, Animated  } from 'react-native';
import {Text,}from 'native-base'
import Animation from 'lottie-react-native';
import styles from '../styles'

class loading extends Component{
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      counter: 1
    }
  }
componentDidMount() {
    let timer = setInterval(this.tick.bind(this), 2500);
    this.setState({timer});
    //this.animation.play()
  }
componentWillUnmount() {
    clearInterval(this.state.timer);
  }
tick() {
  if (this.state.counter <=5){
    this.setState({
      counter: this.state.counter + 1
    })
  }else{
    this.setState({
      counter:1
    })
  }
}
  switchImage(){
    /*switch (this.state.counter) {
      case 1: return require('../img/gif1.gif')
      case 2: return require('../img/gif2.gif')
      case 3: return require('../img/gif3.gif')
      case 4: return require('../img/gif4.gif')
      case 5: return require('../img/gif5.gif')
      case 6: return require('../img/gif6.gif')
      default: return require('../img/gif1.gif')
    }*/
    switch (this.state.counter) {
      case 1: return require('../img/jpg/img1.jpg')
      case 2: return require('../img/jpg/img2.jpg')
      case 3: return require('../img/jpg/img3.jpg')
      case 4: return require('../img/jpg/img4.jpg')
      case 5: return require('../img/jpg/img5.jpg')
      case 6: return require('../img/jpg/img6.jpg')
      default: return require('../img/jpg/img1.jpg')
    }
  }
  render(){
    return(
      <View style={styles.container}>
        <Image  style={styles.backgroundImage} source={this.switchImage()} >
          <View style={{flex:1, justifyContent:'center',}}>
            <Text style={{fontSize:40,backgroundColor:'#24CE84',color:'white'}}>Carregando !</Text>
          </View>
          <View style={{flex: 1,flexDirection: 'column',justifyContent: 'center',alignItems: 'center', }}>

          </View>
        </Image>
      </View>
      )
  }
}

/*
<View>
<Animation
  ref={animation => { this.animation = animation; }}
    style={{
      width: 300,
      height: 300,
    }}
    source={require('../animation/snap_loader_black.json')}
    loop={true}
  />
</View>*/
module.exports = loading
