import React from 'react';
import {StyleSheet} from 'react-native';

import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {connect} from 'react-redux';

//import the different modules
import MainMenu from './components/MainMenu';
import Tasks from '../tasks/views/screens/Main';
import Logs from '../logs/views/screens/Main';
import Onboarding from '../onboarding/views/screens/Main';
import Reports from '../reports/controllers/Main';
import Settings from '../settings/views/screens/Main';
import About from '../about/views/screens/Main';
import Support from '../support/views/screens/Support';
import Customize from '../customize/views/screens/Main';
import Features from '../features/controllers/Main';

const {Navigator, Screen} = createDrawerNavigator();

const mapStateToProps = (state) => {
  return {
    onBoarded: state.onboard.onBoarded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onShowConnect: () => {},
  };
};

const HomeScreen = ({navigation, onBoarded}) => {
  const MainStackScreen = () => {
    return (
      <Navigator
        screenOptions={{gestureEnabled: true}}
        drawerContent={(props) => <MainMenu {...props} />}>
        <Screen name="Agenda" component={Tasks} />
        <Screen name="Logs" component={Logs} />
        <Screen name="Reports" component={Reports} />
        <Screen name="Settings" component={Settings} />
        <Screen name="Support" component={Support} />
        <Screen name="About" component={About} />
        <Screen name="Customize" component={Customize} />
        <Screen name="Features" component={Features} />
      </Navigator>
    );
  };

  const RootStackScreen = () => {
    if (!onBoarded) {
      return <Onboarding />;
    } else {
      return <MainStackScreen />;
    }
  };

  return (
    <NavigationContainer theme={navigatorTheme}>
      <RootStackScreen />
    </NavigationContainer>
  );
};

/*
 * Navigation theming: https://reactnavigation.org/docs/en/next/themes.html
 */
const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // prevent layout blinking when performing navigation
    background: 'transparent',
  },
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
