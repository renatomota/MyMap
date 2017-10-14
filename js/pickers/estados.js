import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,TextInput, StatusBar,ScrollView} from 'react-native';
import {Picker} from 'native-base'
const Item = Picker.Item;
import styles from '../styles'
export default function Estados(props){
  return(
    <Picker
      style={StyleSheet.flatten(styles.input)}
      supportedOrientations={['portrait','landscape']}
      placeholder="--"
      iosHeader="Estados"
      mode="dialog"
      selectedValue={props.value}
      onValueChange={(itemValue) => props.onValueChange(itemValue)}>

      <Item label="AC" value="AC" />
      <Item label="AL" value="AL" />
      <Item label="AP" value="AP" />
      <Item label="AM" value="AM" />
      <Item label="BA" value="BA" />
      <Item label="CE" value="CE" />
      <Item label="DF" value="DF" />
      <Item label="ES" value="ES" />
      <Item label="GO" value="GO" />
      <Item label="MA" value="MA" />
      <Item label="MT" value="MT" />
      <Item label="MS" value="MS" />
      <Item label="MG" value="MG" />
      <Item label="PA" value="PA" />
      <Item label="PB" value="PB" />
      <Item label="PR" value="PR" />
      <Item label="PE" value="PE" />
      <Item label="PI" value="PI" />
      <Item label="RJ" value="RJ" />
      <Item label="RN" value="RN" />
      <Item label="RS" value="RS" />
      <Item label="RO" value="RO" />
      <Item label="RR" value="RR" />
      <Item label="SC" value="SC" />
      <Item label="SP" value="SP" />
      <Item label="SE" value="SE" />
      <Item label="TO" value="TO" />

    </Picker>
  )
}
