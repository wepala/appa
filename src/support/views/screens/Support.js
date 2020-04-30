import React from 'react';
import {View} from 'react-native';
import {
  Button,
  Input,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import {EyeIcon, EyeOffIcon, PersonIcon} from '../../../views/components/Icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLifeRing} from '@fortawesome/free-solid-svg-icons';

export default ({navigation}) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <Layout style={styles.container}>
      <Layout style={styles.headerContainer} level="1">
        <FontAwesomeIcon icon={faLifeRing} size={216} color={'white'} />
        <Text style={styles.text} category="h1">
          Get Help
        </Text>
      </Layout>
      <View style={styles.buttonGroup}>
        <Button style={styles.subscriptionButton} status="success" size="giant">
          Support Subscription
        </Button>
        <Button appearance="ghost" style={styles.skipButton} status="basic">
          Skip
        </Button>
      </View>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'background-basic-color-1',
    height: '100%',
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'color-primary-default',
  },
  text: {
    paddingTop: 16,
    color: '#fff',
  },

  buttonGroup: {
    paddingVertical: 16,
  },
  subscriptionButton: {
    marginHorizontal: 16,
  },
  skipButton: {
    marginVertical: 16,
    marginHorizontal: 16,
  },
});
