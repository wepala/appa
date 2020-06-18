import React, {useEffect} from 'react';
import {
  Button,
  StyleService,
  useStyleSheet,
  Select,
  SelectItem,
  IndexPath,
  Layout,
} from '@ui-kitten/components';
import {Linking} from 'react-native';

import {ArrowDownIcon, SyncIcon, LogoutIcon} from './Icons';
import PKCE from '../../weos/auth/pkce';
import {AUTHORIZE_URL} from 'react-native-dotenv';

export default ({account, token, logout}) => {
  const styles = useStyleSheet(themedStyles);
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

  PKCE.config.setVars({
    AUTHORIZE_URL,
  });

  useEffect(() => {
    Linking.addEventListener('url', logout);
    Linking.getInitialURL().then((url) => {
      if (url) {
        logout();
      }
    });

    return () => Linking.removeEventListener('url', logout);
  });

  const openLogout = () => {
    Linking.openURL(PKCE.logoutURL(token.id_token));
  };

  return (
    <Layout style={styles.row}>
      <Layout style={styles.column1}>
        <Select
          testID="Select"
          style={styles.select}
          value={account.emails[selectedIndex.row]}
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
          accessoryRight={ArrowDownIcon}>
          {account.emails.map((email, index) => (
            <SelectItem key={index} title={email} />
          ))}
        </Select>
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
