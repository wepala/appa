import React from 'react';
import {View, SafeAreaView} from 'react-native';
import {
  Button,
  Input,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import Logs from '../components/Logs';

export default props => {
  return (
    <SafeAreaView>
      <Logs {...props} />
    </SafeAreaView>
  );
};
