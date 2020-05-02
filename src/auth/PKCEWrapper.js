import React, {useState, useEffect} from 'react';
import {Linking, SafeAreaView} from 'react-native';
import {
  Button,
  Text,
  Layout,
  useStyleSheet,
  StyleService,
} from '@ui-kitten/components';
import PKCE from './pkce';
import {
  CLIENT_ID,
  BASE_URL,
  REDIRECT_URI,
  RESPONSE_TYPE,
  SCOPE,
  CODE_CHALLENGE_METHOD,
} from 'react-native-dotenv';

const PKCEWrapper = props => {
  const styles = useStyleSheet(themedStyles);
  const [isAuth, setAuth] = useState(false);
  useEffect(() => {
    PKCE.config.setVars({
      CLIENT_ID,
      BASE_URL,
      REDIRECT_URI,
      RESPONSE_TYPE,
      SCOPE,
      CODE_CHALLENGE_METHOD,
    });
  }, []);

  const handleLogin = () => {
    console.log({
      CLIENT_ID,
      BASE_URL,
      REDIRECT_URI,
      RESPONSE_TYPE,
      SCOPE,
      CODE_CHALLENGE_METHOD,
    });

    Linking.openURL(PKCE.authorizeURL());
  };

  if (isAuth) {
    return props.children;
  }
  return (
    <SafeAreaView>
      <Layout style={styles.container}>
        <Layout style={styles.headerContainer} level="1">
          {/* <FontAwesomeIcon icon={faLifeRing} size={216} color={'white'} /> */}
          <Text style={styles.text} category="h1">
            You are not logged in
          </Text>
        </Layout>
        <Layout style={styles.buttonGroup}>
          <Button
            style={styles.loginButton}
            appearance="primary"
            onPress={handleLogin}>
            Login
          </Button>
        </Layout>
      </Layout>
    </SafeAreaView>
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
  loginButton: {
    marginHorizontal: 16,
  },
  skipButton: {
    marginVertical: 16,
    marginHorizontal: 16,
  },
});

export default PKCEWrapper;
