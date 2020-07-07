import React from 'react';
import {
  Button,
  StyleService,
  useStyleSheet,
  Layout,
  Text,
} from '@ui-kitten/components';
import {SyncIcon, LogoutIcon} from './Icons';

export default ({user, handleLogout}) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <Layout style={styles.row}>
      <Layout style={styles.column1}>
        <Text testID="UserEmail">{user.sub.email}</Text>
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
          onPress={handleLogout}
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
