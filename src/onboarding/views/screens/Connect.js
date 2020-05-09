import React from 'react';
import {SafeAreaView} from 'react-native';
import {
  Button,
  Text,
  useStyleSheet,
  StyleService,
  Layout,
} from '@ui-kitten/components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';

export default ({navigation}) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.container} level="2">
        <Layout style={styles.headerContainer} level="2">
          <FontAwesomeIcon
            style={styles.image}
            icon={faUserCircle}
            size={216}
          />
          <Text style={styles.text} category="h3">
            Create Account
          </Text>
          <Text style={styles.text} category="s1">
            You can connect to WeOS our platform to make it easier to make it
            easier to share information between devices. You can learn more
            about WeOS here.
          </Text>
        </Layout>
        <Layout level="2" style={styles.buttonContainer}>
          <Button style={styles.buttonConnct}>WeOS Connect</Button>
          <Button
            status="basic"
            onPress={() => navigation.navigate('Complete')}>
            Skip
          </Button>
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  container: {
    height: '100%',
    padding: 16,
  },
  image: {
    color: 'color-primary-default',
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  text: {
    color: '$color-basic-700',
    textAlign: 'center',
  },
  buttonGroup: {
    paddingVertical: 16,
  },
  buttonConnct: {
    marginBottom: 16,
  },
});
