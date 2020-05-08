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
  const styles = useStyleSheet(themedStyles);
  return (
    <SafeAreaView style={styles.container}>
      <Logs {...props} />
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'background-basic-color-1',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: 'color-primary-default',
  },
});
