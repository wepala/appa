import React from 'react';
import {
  Button,
  Layout,
  StyleService,
  Select,
  SelectItem,
  useStyleSheet,
  Text,
  IndexPath,
} from '@ui-kitten/components';
import {FlashIcon, InfoIcon, ClockIcon} from '../../../views/components/Icons';
import TopBar from '../components/TopBar';
import {SafeAreaView, KeyboardAvoidingView, ScrollView} from 'react-native';

export default ({navigation, route}) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <SafeAreaView style={styles.container}>
      <TopBar title="About Us" navigation={navigation} route={route} />
      <Layout style={styles.container}>
        <Layout style={styles.row}>
          <Layout style={styles.column1}>
            <Text category="h5">Version</Text>
            <Text category="s2">WeAgenda beta 1.2</Text>
          </Layout>
        </Layout>
        <Layout style={styles.row}>
          <Layout style={styles.column1}>
            <Text category="h5">Pipeline</Text>
            <Text category="s2">See what features are coming next update</Text>
          </Layout>
        </Layout>
        <Layout style={styles.row}>
          <Layout style={styles.column1}>
            <Text category="h5">License</Text>
            <Text category="s2">Free as in Freedom</Text>
          </Layout>
        </Layout>
        <Layout style={styles.row}>
          <Layout style={styles.column1}>
            <Text category="h5">Wepala</Text>
            <Text category="s2">The company behind the cApps</Text>
          </Layout>
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: '$background-basic-color-1',
    paddingHorizontal: 32,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'center',
  },
  column1: {
    flexGrow: 1,
    marginRight: 16,
  },
  column2: {
    flexGrow: 0,
  },

  buttonGroup: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonCancel: {
    flexBasis: 'auto',
    flexShrink: 0,
    marginRight: 16,
  },
  buttonSubmit: {
    flexGrow: 1,
  },
});
