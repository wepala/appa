import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {Button, Text} from '@ui-kitten/components';

export default ({navigation}) => {
  return (
    <SafeAreaView>
      <View>
        <Text category="h1" status="control">
          Create Account
        </Text>
        <Text category="s1" status="control">
          You can connect to WeOS our platform to make it easier to make it
          easier to share information between devices. You can learn more about
          WeOS here.
        </Text>
        <Button>WeOS Connect</Button>
      </View>
      <Button onPress={() => navigation.navigate('Complete')}>Skip</Button>
    </SafeAreaView>
  );
};
