import React, {useState} from 'react';
import moment from 'moment';
import {AssetCalendarIcon} from '../../../views/components/Icons';

import {
  Text,
  Card,
  Layout,
  Button,
  CheckBox,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';

const BacklogItem = ({navigation, item, index, onPress, addToAgenda}) => {
  const [checked, toggleCheck] = useState(false);
  const styles = useStyleSheet(themedStyles);

  const onAddToAgenda = () => {
    addToAgenda(item, moment().format('YYYY-MM-DD')).then(() =>
      navigation.navigate('Today'),
    );
  };
  return (
    <Card style={styles.item} onPress={() => onPress(index)}>
      <Layout style={styles.row}>
        <Layout style={styles.column1}>
          <CheckBox
            checked={checked}
            onChange={toggleCheck}
            testID={'TaskCheckBox'}
          />
        </Layout>
        <Layout style={styles.column2}>
          <Text category="s1" style={styles.task} testID={'TaskTitle'}>
            {item.title}
          </Text>
          <Text category="s2" style={styles.time}>
            Time: 30m out of 1h
          </Text>
        </Layout>
        <Layout style={styles.column1}>
          <Button
            testID={'AddToAgenda'}
            size="small"
            appearance="ghost"
            status="basic"
            accessoryLeft={AssetCalendarIcon}
            onPress={onAddToAgenda}
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
  },

  column1: {
    backgroundColor: 'transparent',
    flexBasis: 'auto',
    flexShrink: 0,
    justifyContent: 'center',
  },
  column2: {
    backgroundColor: 'transparent',
    flexGrow: 1,
    paddingVertical: 2,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  task: {
    marginBottom: 4,
  },
  time: {
    marginBottom: 4,
  },
  icon: {
    width: 20,
    height: 20,
    margin: 0,
    padding: 0,
  },
});

export default BacklogItem;
