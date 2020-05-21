import React from 'react';
import Customize from './Customize';
import Detail from './Detail';
import {SafeAreaView} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

const {Navigator, Screen} = createStackNavigator();

export default () => (
  <SafeAreaView style={{flex: 1}}>
    <Navigator screenOptions={{gestureEnabled: false, headerShown: false}}>
      <Screen name="Customize" component={Customize} />
      <Screen name="Help" component={Detail} />
    </Navigator>
  </SafeAreaView>
);
