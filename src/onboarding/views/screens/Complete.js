import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {Button, Text} from '@ui-kitten/components';

export default ({navigation, onComplete}) => {
  return (
    <SafeAreaView>
      <View>
        <Text category="h1" status="control">
          You're All Set
        </Text>
        <Text category="s1" status="control">
          Don't hesitate to reach out with your feedback
        </Text>
      </View>
      <Button testID={'CompleteButton'} onPress={() => onComplete()}>
        Complete
      </Button>
    </SafeAreaView>
  );
};
