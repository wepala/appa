import React, {useEffect} from 'react';
import {SafeAreaView, ImageBackground, Linking} from 'react-native';
import {
  Button,
  Text,
  useStyleSheet,
  StyleService,
  Layout,
} from '@ui-kitten/components';
import URL from 'url-parse';
import background from '../../../../assets/images/brand/connect.png';
import AsyncStorage from '@react-native-community/async-storage';
import {CLIENT_ID, REDIRECT_URI} from 'react-native-dotenv';
import {fetchToken} from '../../../weos/auth/api';

export default ({navigation, authorizeURL, setToken}) => {
  const styles = useStyleSheet(themedStyles);

  const handleWeosConnect = () => {
    Linking.openURL(authorizeURL());
  };

  useEffect(() => {
    Linking.addEventListener('url', handleOpenUrl);
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleOpenUrl(url);
      }
    });

    return () => Linking.removeEventListener('url', handleOpenUrl);
  });

  const handleOpenUrl = (urlString) => {
    const url = new URL(urlString.url, true);
    const {code, state} = url.query;

    if (!code) {
      console.log('Code is missing');
      return;
    }

    Promise.all([
      AsyncStorage.getItem('verifier'),
      AsyncStorage.getItem('state'),
    ]).then(async ([appVerifier, appState]) => {
      await AsyncStorage.removeItem('verifier');
      await AsyncStorage.removeItem('state');

      if (appState !== state) {
        console.log(
          `State mismatch, didn't carry out token request, ${appState}, ${state}`,
        );
        return;
      }

      const payload = {code, appVerifier, CLIENT_ID, REDIRECT_URI};

      try {
        const response = await fetchToken(payload);
        setToken(response.token).then(() => {
          navigation.navigate('Complete');
        });
      } catch (error) {
        console.log('An error occured', error);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={background} style={styles.image}>
        <Layout style={styles.headerContainer}>
          <Text style={styles.text} category="h2">
            Create Account
          </Text>
          <Button
            style={styles.buttonConnect}
            testID="WeOsConnectBtn"
            onPress={handleWeosConnect}>
            WeOS Connect
          </Button>
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
