import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Welcome from '../screens/List';

const OnboardingStack = createStackNavigator();

export default ({navigation}) => {
  return (
    <OnboardingStack.Navigator>
      <OnboardingStack.Screen name={'Welcome'} component={Welcome} />
    </OnboardingStack.Navigator>
  );
};
