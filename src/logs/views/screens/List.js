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
import TopBar from '../components/TopBar';

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
    <>
      <TopBar navigation={navigation} />
      <Layout style={styles.container}>
        <LogFilter />
        <List
          contentContainerStyle={[contentContainerStyle, styles.list]}
          numColumns={1}
          data={items}
          renderItem={renderItem}
        />
      </Layout>
    </>
  );
};

const themedStyles = StyleService.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '$background-basic-color-1',
  },
  list: {
    padding: 0,
    backgroundColor: '$background-basic-color-1',
    flex: 1,
  },
});
