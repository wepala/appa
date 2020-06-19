import {Spinner, Layout} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import React from 'react';

export const Loading = () => (
  <Layout style={styles.container} level="1">
    <Spinner size="large" />
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
