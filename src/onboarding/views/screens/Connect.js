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
import {Alert} from 'react-native';
import background from '../../../../assets/images/brand/connect.png';
import PKCE from '../../../weos/auth/pkce';
import {
  CLIENT_ID,
  AUTHORIZE_URL,
  REDIRECT_URI,
  RESPONSE_TYPE,
  SCOPE,
  CODE_CHALLENGE_METHOD,
} from 'react-native-dotenv';

export default ({navigation, authorizeURL, setToken, getToken}) => {
  const styles = useStyleSheet(themedStyles);

  PKCE.config.setVars({
    CLIENT_ID,
    AUTHORIZE_URL,
    REDIRECT_URI,
    RESPONSE_TYPE,
    SCOPE,
    CODE_CHALLENGE_METHOD,
  });

  const handleWeosConnect = () => {
    Linking.openURL(PKCE.authorizeURL());
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

  const accountCreation = () => {
    Alert.alert(
      'Account Creation',
      'Do you want to create a new account with this email address?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            Linking.openURL(PKCE.createAccountURL());
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleOpenUrl = (urlString) => {
    const url = new URL(urlString.url, true);
    const {code, state, confirm_creation} = url.query;

    if (confirm_creation) {
      accountCreation();
      return;
    }

    PKCE.exchangeAuthCode(code, state)
      .then((authToken) => {
        setToken(authToken).then(() => navigation.navigate('Complete'));
      })
      .catch((error) => {
        console.log(error);
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
