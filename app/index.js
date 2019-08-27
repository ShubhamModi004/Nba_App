import React, { Fragment, Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
} from 'react-native';
import { mapping, dark, light } from '@eva-design/eva';
import { ApplicationProvider, Layout } from 'react-native-ui-kitten';




import { RootNavigator } from './routes';

class App extends Component {
  state = {
    theme: light,
  }
  toggleTheme = () => {
    this.setState({
      theme: this.state.theme === 'light' ? 'dark' : 'light'
    })
  };
  render() {
    const Nav = RootNavigator();

    return (
      <ApplicationProvider
        mapping={mapping}
        theme={this.state.theme}>
        <StatusBar barStyle="light-content" />
        <Layout style={styles.container}>
          <Nav toggleTheme={this.toggleTheme} />
        </Layout>
      </ApplicationProvider>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})



export default App;
