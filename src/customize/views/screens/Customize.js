import React, {useState, U} from 'react';
import {Linking, Platform, SafeAreaView, ScrollView} from 'react-native';
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
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faGithub} from '@fortawesome/free-brands-svg-icons';

export default ({navigation, route}) => {
  const styles = useStyleSheet(themedStyles);
  let [visible, toggleVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <TopBar navigation={navigation} title="Customize" />
      <ScrollView>
        <Text category="h1" style={styles.title}>
          Make Appa yours
        </Text>
        <Layout style={styles.row}>
          <Layout style={styles.column}>
            <Text category="h5" style={styles.subTitle}>
              DEVELOPERS
            </Text>

            <Text category="s1" style={styles.description}>
              If you can code, then jump right in and make the changes you want!
            </Text>
            <Text category="s1" style={styles.descriptionLastLine}>
              Check out Appa on GitHub.
            </Text>

            <Button
              size="large"
              style={styles.buttonHelp}
              onPress={() => {
                Linking.openURL('https://github.com/wepala/weagenda').catch(
                  (err) => {
                    toggleVisible(true);
                    console.warn(err);
                  },
                );
              }}
              accessoryRight={() => (
                <FontAwesomeIcon style={styles.icon} icon={faGithub} />
              )}>
              GET STARTED
            </Button>
          </Layout>
          <Layout style={styles.column}>
            <Text category="h5" style={styles.subTitle}>
              NON-DEVELOPERS
            </Text>
            <Text category="s1" style={styles.description}>
              Need some help modifying Appa to work the way you want?
            </Text>
            <Text category="s1" style={styles.descriptionLastLine}>
              {' '}
              No problem, we'll take care of it for you.
            </Text>
            <Button
              size="large"
              style={styles.buttonHelp}
              onPress={() => navigation.navigate('Help')}>
              GET HELP
            </Button>
          </Layout>
        </Layout>
        <Modal visible={visible} style={styles.container}>
          <Card disabled={true}>
            <Text category="h3">Error</Text>
            <Button onPress={() => toggleVisible(false)}>DISMISS</Button>
          </Card>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: '$background-basic-color-1',
  },
  row: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    marginTop: 32,
  },
  subTitle: {
    paddingBottom: 32,
  },
  description: {
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  descriptionLastLine: {
    textAlign: 'center',
    paddingHorizontal: 32,
    paddingBottom: 32,
  },
  buttonHelp: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 32,
    lineHeight: 90,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    elevation: 5,
    paddingTop: Platform.OS === 'ios' ? 20 : 12,
  },
  icon: {
    color: '$background-basic-color-1',
    marginTop: Platform.OS === 'ios' ? -8 : 2,
  },
  modal: {
    marginTop: 8,
    backgroundColor: '$background-basic-color-1',
    borderColor: '$background-basic-color-1',
  },
});
