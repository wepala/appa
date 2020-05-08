import {Spinner, Layout} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import React from 'react';

export const SyncSpinner = () => (
  <Layout style={styles.container} level="1">
    <Spinner size="large" />
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
});
