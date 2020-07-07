import React, {useState} from 'react';
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
import Customize from '../customize/views/screens/Main';
import {setToken, setUser} from '../weos/model/commands';
import Spinner from '../views/components/Spinner';
import ConnectHOC from '../onboarding/controllers/ConnectHOC';

const {Navigator, Screen} = createDrawerNavigator();

const mapStateToProps = (state) => {
  return {
    onBoarded: state.onboard.onBoarded,
    token: state.weos.token,
    user: state.weos.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onShowConnect: () => {},
    logout: () => {
      dispatch(setToken(null));
      dispatch(setUser(null));
    },
  };
};

const HomeScreen = ({navigation, onBoarded, user}) => {
  const [loading, setLoading] = useState(false);
  const WrappedSettings = ConnectHOC(Settings);

  const MainStackScreen = () => {
    return (
      <Navigator
        screenOptions={{gestureEnabled: true}}
        drawerContent={(props) => (
          <MainMenu {...props} user={user} setLoading={setLoading} />
        )}>
        <Screen name="Agenda" component={Tasks} />
        <Screen name="Logs" component={Logs} />
        <Screen name="Reports" component={Reports} />
        <Screen name="Settings" component={WrappedSettings} />
        <Screen name="About" component={About} />
        <Screen name="Customize" component={Customize} />
      </Navigator>
    );
  };

  const RootStackScreen = () => {
    if (!onBoarded) {
      return <Onboarding />;
    } else {
      return (
        <>
          <MainStackScreen />
          {loading && <Spinner />}
        </>
      );
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
