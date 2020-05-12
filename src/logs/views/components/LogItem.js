import React from 'react';
import moment from 'moment';
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
  console.log('Log item', item);
  let loggedDate = moment(item.startTime).format('Do MMM, YYYY');
  let loggedTime = moment(item.startTime).format('h:mm:ss a');
  console.log(loggedTime);
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
          <Text>{loggedDate}</Text>
          <Text>{loggedTime}</Text>
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
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
  },

  column1: {
    backgroundColor: 'transparent',
    flexBasis: 'auto',
    flexShrink: 0,
    justifyContent: 'flex-start',
  },
  column2: {
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    width: '65%',
  },

  avatar: {
    height: 20,
    width: 20,
    color: '$color-basic-400',
  },
});
