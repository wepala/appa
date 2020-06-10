import React, {useContext} from 'react';
import {ThemeContext} from '../../../../theme.context';
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
import {SafeAreaView, ScrollView} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faGithub} from '@fortawesome/free-brands-svg-icons';

export default ({navigation, route}) => {
  const themeContext = useContext(ThemeContext);
  const styles = useStyleSheet(themedStyles);
  return (
    <SafeAreaView style={styles.container}>
      <TopBar navigation={navigation} title="Customize" />
      <Text category="h1" style={styles.title}>
        Make Appa yours
      </Text>
      <Layout style={styles.row}>
        <Layout style={styles.column}>
          <Text category="h5" style={styles.subTitle}>
            DEVELOPERS
          </Text>
          <Text category="s1" style={styles.description}>
            If you can code then jump right in and make the changes you want!
            Our code is free and open source!
          </Text>
          <FontAwesomeIcon
            icon={faGithub}
            size={100}
            color={themeContext.theme === 'dark' ? '#fafafa' : '#444'}
          />
        </Layout>
        <Layout style={styles.column}>
          <Text category="h5" style={styles.subTitle}>
            NON-DEVELOPERS
          </Text>
          <Text category="s1" style={styles.description}>
            Need some help modifying Appa to work the way you want? No problem,
            we;ll take of it for you.
          </Text>
          <Button
            size="large"
            style={styles.buttonHelp}
            onPress={() => navigation.navigate('Help')}>
            GET HELP
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
    paddingBottom: 32,
  },
  buttonHelp: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    elevation: 5,
  },
});
