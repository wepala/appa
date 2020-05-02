import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {Button, Text} from '@ui-kitten/components';

export default ({navigation}) => {
  return (
    <SafeAreaView>
      <View>
        <Text category="h1" status="control">
          Welcome to WeAgenda
        </Text>
        <Text category="s1" status="control">
          A fully customizable app built by Wepala and made better by you!
        </Text>
      </View>
      <Button onPress={() => navigation.navigate('Connect')}>Continue</Button>
    </SafeAreaView>
  );
};
