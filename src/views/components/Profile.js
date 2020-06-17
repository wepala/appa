import React from 'react';
import {
  Button,
  StyleService,
  useStyleSheet,
  Select,
  SelectItem,
  IndexPath,
  Layout,
} from '@ui-kitten/components';
import {ArrowDownIcon, SyncIcon, LogoutIcon} from './Icons';

export default ({account}) => {
  const styles = useStyleSheet(themedStyles);
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

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
