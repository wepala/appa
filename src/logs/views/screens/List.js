import React from 'react';
import {
  Layout,
  Text,
  List,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import LogItem from '../components/LogItem';
import LogFilter from '../components/LogsFilter';

export default ({navigation, items, contentContainerStyle}) => {
  const styles = useStyleSheet(themedStyles);
  const onItemPress = index => {
    console.log(items, index);
    navigation.navigate('UpdateTask', {
      itemId: items[index].id,
    });
  };

  //method to render each item in the list
  const renderItem = ({index, item}) => (
    <LogItem item={item} index={index} onPress={() => onItemPress(index)} />
  );

  return (
    <Layout style={styles.container}>
      <Text>Top bar placeholder for logs</Text>
      <LogFilter />
      <List
        contentContainerStyle={[styles.list, contentContainerStyle]}
        numColumns={1}
        data={items}
        renderItem={renderItem}
      />
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: '$background-basic-color-1',
    padding: 16,
  },
  list: {
    padding: 0,
    backgroundColor: '$background-basic-color-1',
  },
});
