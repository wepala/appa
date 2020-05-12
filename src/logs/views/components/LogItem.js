import React from 'react';
import {PersonIcon, MoreVerticalIcon} from '../../../views/components/Icons';
import {
  Text,
  Card,
  Layout,
  StyleService,
  Icon,
  Button,
  useStyleSheet,
} from '@ui-kitten/components';

export default ({item, index, onPress}) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <Card style={styles.item} onPress={onPress}>
      <Layout style={styles.row}>
        <Layout style={styles.column1}>
          <Button
            status="basic"
            appearance="ghost"
            accessoryLeft={PersonIcon}
          />
        </Layout>
        <Layout style={styles.column2}>
          <Text category="s1">{item.title}</Text>
          <Text>8:07 AM | 1 hour</Text>
        </Layout>
        <Layout style={styles.column1}>
          <Button
            appearance="ghost"
            status="basic"
            accessoryLeft={MoreVerticalIcon}
          />
        </Layout>
      </Layout>
    </Card>
  );
};

const themedStyles = StyleService.create({
  item: {
    marginVertical: 8,
    padding: 0,
  },

  row: {
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'row',
  },

  column1: {
    // backgroundColor: 'transparent',
    width: '20%',
  },
  column2: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },

  avatar: {
    height: 20,
    width: 20,
    color: '$color-basic-400',
  },
});
