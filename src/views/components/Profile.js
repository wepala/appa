import React, {useEffect, useState} from 'react';
import {
  Button,
  StyleService,
  useStyleSheet,
  Layout,
  Text,
} from '@ui-kitten/components';
import {Linking} from 'react-native';

import {SyncIcon, LogoutIcon} from './Icons';
import PKCE from '../../weos/auth/pkce';
import {AUTHORIZE_URL} from 'react-native-dotenv';

export default ({user, token, logout, setUserInfo, setLoading}) => {
  const styles = useStyleSheet(themedStyles);
  PKCE.config.setVars({
    AUTHORIZE_URL,
  });

  const [email, setEmail] = useState(user?.sub?.email);

  useEffect(() => {
    Linking.addEventListener('url', logout);
    Linking.getInitialURL().then((url) => {
      if (url) {
        logout(url);
      }
    });

    if (!user) {
      PKCE.getUserInfo(token)
        .then((userInfo) => {
          userInfo.sub = JSON.parse(userInfo.sub);
          setUserInfo(userInfo);
          setEmail(userInfo.email);
        })
        .catch((error) => console.log(error));
    }

    return () => {
      Linking.removeEventListener('url', logout);
    };
  });

  const openLogout = () => {
    setLoading(true);
    Linking.openURL(PKCE.logoutURL(token.id_token));
  };

  return (
    <Layout style={styles.row}>
      <Layout style={styles.column1}>
        <Text>{email}</Text>
      </Layout>
      <Layout style={styles.column2}>
        <Button
          testID="SyncButton"
          style={styles.button}
          appearance="ghost"
          accessoryLeft={SyncIcon}
        />
      </Layout>
      <Layout style={styles.column3}>
        <Button
          testID="LogoutButton"
          appearance="ghost"
          style={styles.button}
          accessoryLeft={LogoutIcon}
          onPress={openLogout}
        />
      </Layout>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  column1: {
    width: '80%',
    backgroundColor: 'transparent',
  },
  column2: {
    width: '10%',
    backgroundColor: 'transparent',
  },
  column3: {
    width: '10%',
    backgroundColor: 'transparent',
  },
});
