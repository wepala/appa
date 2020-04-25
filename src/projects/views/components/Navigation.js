import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import List from '../screens/List';

const OnboardingStack = createStackNavigator();

export default ({navigation}) => {
  return (
    <OnboardingStack.Navigator>
      <OnboardingStack.Screen name={'List'} component={List} />
    </OnboardingStack.Navigator>
  );
};
