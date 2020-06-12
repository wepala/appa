import React from 'react';
import {SafeAreaView, ImageBackground} from 'react-native';

import {
  Button,
  Text,
  useStyleSheet,
  StyleService,
  Layout,
} from '@ui-kitten/components';
import background from '../../../../assets/images/brand/connect.png';

export default ({navigation}) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={background} style={styles.image}>
        <Layout style={styles.headerContainer}>
          {/* <Text style={styles.text} category="h2">
            Create Account
          </Text>
          <Button style={styles.buttonConnect}>WeOS Connect</Button> */}
          <Text style={styles.text} category="s1">
            You can connect to WeOS our platform to make it easier to share
            information between devices. You can learn more about WeOS here.
          </Text>
        </Layout>
        <Button
          style={styles.buttonSkip}
          appearance="outline"
          onPress={() => navigation.navigate('Complete')}>
          Skip
        </Button>
      </ImageBackground>
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  container: {
    height: '100%',
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
  },
  headerContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingBottom: 16,
    width: '100%',
  },
  text: {
    color: '$color-basic-700',
    textAlign: 'center',
    marginBottom: 16,
  },
  buttonSkip: {
    width: '100%',
  },
  buttonConnect: {
    marginBottom: 16,
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
