import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Welcome from '../screens/Welcome';
import Connect from '../screens/Connect';
import Support from '../screens/Support';

const OnboardingStack = createStackNavigator();

export default ({navigation}) => {
  return (
    <OnboardingStack.Navigator>
      <OnboardingStack.Screen name={'Welcome'} component={Welcome} />
      <OnboardingStack.Screen name={'Connect'} component={Connect} />
      <OnboardingStack.Screen name={'Support'} component={Support} />
    </OnboardingStack.Navigator>
  );
};
