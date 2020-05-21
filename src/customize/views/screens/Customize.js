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
  Divider,
} from '@ui-kitten/components';
import {MessageIcon} from '../../../views/components/Icons';
import TopBar from '../components/TopBar';
import {SafeAreaView} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faGithub} from '@fortawesome/free-brands-svg-icons';

export default ({navigation, route}) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <SafeAreaView style={styles.container}>
      <TopBar navigation={navigation} title="Customize" />
      <Layout style={styles.container}>
        <Layout style={styles.row}>
          <Layout style={styles.column}>
            <Text category="h5">Developers</Text>
            <Text category="s2">
              If you can code then jump right in and make the changes you want!
            </Text>
            <Text category="s2">Our code is free and open source!</Text>
          </Layout>
        </Layout>
        <Layout style={styles.row}>
          <FontAwesomeIcon icon={faGithub} size={100} color={'#444'} />
        </Layout>
        <Divider style={styles.divider} />
        <Layout style={styles.row}>
          <Layout style={styles.column}>
            <Text category="h5">Non-developers</Text>
            <Text category="s2">
              Need some help modifying Appa to work the way you want?
            </Text>
            <Text category="s2">No problem, we;ll take of it for you.</Text>
          </Layout>
        </Layout>
        <Layout style={styles.row}>
          <Button
            accessoryRight={MessageIcon}
            status="info"
            onPress={() => navigation.navigate('Help')}>
            Get Help
          </Button>
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: '$background-basic-color-1',
    padding: 16,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  column: {
    flexGrow: 1,
  },

  divider: {
    marginVertical: 32,
  },
});
