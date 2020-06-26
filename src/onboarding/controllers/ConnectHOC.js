import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Alert, Linking} from 'react-native';
import URL from 'url-parse';

import {
  CLIENT_ID,
  AUTHORIZE_URL,
  REDIRECT_URI,
  RESPONSE_TYPE,
  SCOPE,
  CODE_CHALLENGE_METHOD,
} from 'react-native-dotenv';
import PKCE from '../../weos/auth/pkce';
import {setToken, setUser} from '../../weos/model/commands';

const ConnectHOC = (WrappedComponent, props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {navigation} = props;

  PKCE.config.setVars({
    CLIENT_ID,
    AUTHORIZE_URL,
    REDIRECT_URI,
    RESPONSE_TYPE,
    SCOPE,
    CODE_CHALLENGE_METHOD,
  });

  const handleWeosConnect = () => {
    setLoading(true);
    Linking.openURL(PKCE.authorizeURL());
  };

  const accountCreation = () => {
    Alert.alert(
      'Account Creation',
      'Do you want to create a new account with this email address?',
      [
        {
          text: 'Cancel',
          onPress: () => Linking.openURL(PKCE.createAccountURL(false)),
        },
        {
          text: 'Confirm',
          onPress: () => Linking.openURL(PKCE.createAccountURL(true)),
        },
      ],
      {cancelable: false},
    );
  };

  /**
   * Handle PKCE URL Opening
   *
   * @param {string} screen - Screen name to navigate to when complete
   * @param {string} urlString - Url returned by PKCE
   */
  const handleOpenUrl = async (screen, urlString) => {
    const url = new URL(urlString.url, true);
    const {code, state, confirm_creation} = url.query;

    if (confirm_creation) {
      setLoading(false);
      accountCreation();
      setLoading(true);
      return;
    }

    try {
      let authToken = await PKCE.exchangeAuthCode(code, state);
      let user = await PKCE.getUserInfo(authToken);
      user.sub = JSON.parse(user.sub);
      dispatch(setToken(authToken));
      dispatch(setUser(user));
      setLoading(false);
      navigation.navigate(screen);
    } catch (error) {
      console.log('Error occurred ', error);
      setLoading(false);
    }
  };

  return (
    <WrappedComponent
      {...props}
      handleConnect={handleWeosConnect}
      handleOpenUrl={handleOpenUrl}
      loading={loading}
    />
  );
};

export default ConnectHOC;
