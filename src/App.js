import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootNavigator } from './routes'; 

export default class App extends Component {
  render() {
      const Nav = RootNavigator();
    return (
      <View style={styles.container}>
          <Nav/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
