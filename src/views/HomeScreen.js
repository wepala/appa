import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {connect} from 'react-redux';
import {SafeAreaLayout} from './components/SafeAreaLayout';
import {MenuIcon} from './components/Icons';

//import the different modules
import MainMenu from './components/MainMenu';
import Tasks from '../tasks/views/screens/Main';
import Onboarding from '../onboarding/controllers/Main';
import Logs from '../logs/controllers/Main';
import Projects from '../projects/controllers/Main';
import Reports from '../reports/controllers/Main';
import Support from '../support/views/screens/Support';

const OnboardStack = createStackNavigator();
const {Navigator, Screen} = createDrawerNavigator();

const mapStateToProps = state => {
  return {
    onBoarded: state.onboard.onBoarded,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onShowConnect: () => {},
  };
};

const HomeScreen = ({navigation, onBoarded}) => {
  const MainStackScreen = () => {
    return (
      <Navigator
        screenOptions={{gestureEnabled: true}}
        drawerContent={props => <MainMenu {...props} />}>
        <Screen name="Agenda" component={Tasks} />
        <Screen name="Projects" component={Projects} />
        <Screen name="Logs" component={Logs} />
        <Screen name="Reports" component={Reports} />
        <Screen name="Settings" component={Tasks} />
        <Screen name="Support" component={Support} />
      </Navigator>
    );
  };

  const RootStackScreen = () => {
    if (!onBoarded) {
      return (
        <OnboardStack.Navigator mode="modal">
          <OnboardStack.Screen
            name="Onboarding"
            component={Onboarding}
            options={{headerShown: false}}
          />
        </OnboardStack.Navigator>
      );
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
