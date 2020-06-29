import React, {useContext, useState} from 'react';
import {ImageBackground, Linking, SafeAreaView} from 'react-native';
import packageJson from '../../../../package.json';
import App from '../../../../App';
import {VersionContext} from '../../../../version.context';
// Inside component

import {
  Button,
  Card,
  Layout,
  Modal,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import TopBar from '../components/TopBar';
import background from '../../../../assets/images/brand/about.png';

export default ({navigation, status, route}) => {
  let [visible, toggleVisible] = useState(false);
  const styles = useStyleSheet(themedStyles);
  const version = useContext(VersionContext);

  return (
    <SafeAreaView style={styles.container}>
      <TopBar title="About Us" navigation={navigation} route={route} />
      <ImageBackground source={background} style={styles.image}>
        <Layout style={styles.container}>
          <Layout style={styles.row}>
            <Layout style={styles.column}>
              <Text category="s1">Version</Text>
              <Button
                onPress={() => {
                  Linking.openURL('https://github.com/wepala/weagenda').catch(
                    (err) => {
                      toggleVisible(true);
                      console.warn(err);
                    },
                  );
                }}
                style={styles.button}>
                <Text category="s1">Version: {version}</Text>
              </Button>
            </Layout>
          </Layout>
          <Layout style={styles.row}>
            <Layout style={styles.column}>
              <Text category="s1">Licence</Text>
              <Button
                onPress={() => {
                  Linking.openURL(
                    'https://www.gnu.org/licenses/agpl-3.0.en.html',
                  ).catch((err) => {
                    toggleVisible(true);
                    console.warn(err);
                  });
                }}
                style={styles.button}>
                <Text>Affero General Public License</Text>
              </Button>
            </Layout>
          </Layout>
          <Layout style={styles.row}>
            <Layout style={styles.column}>
              <Text category="s1">Wepala</Text>
              <Button
                onPress={() => {
                  Linking.openURL('https://wepala.com').catch((err) => {
                    toggleVisible(true);
                    console.warn(err);
                  });
                }}
                style={styles.button}>
                <Text>The company behind Appa</Text>
              </Button>
            </Layout>
          </Layout>
        </Layout>
        <Modal visible={visible} style={styles.container}>
          <Card disabled={true}>
            <Text category="h3">Error</Text>
            <Button onPress={() => toggleVisible(false)}>DISMISS</Button>
          </Card>
        </Modal>
      </ImageBackground>
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    backgroundColor: '#444',
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  column: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  card: {
    marginTop: 8,
  },
  button: {
    marginTop: 8,
    backgroundColor: 'white',
    borderColor: 'white',
  },
  modal: {
    marginTop: 8,
    backgroundColor: 'white',
    borderColor: 'white',
  },
});
