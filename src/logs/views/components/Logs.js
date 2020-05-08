import React from 'react';
import {SafeAreaView} from 'react-native';
import {Layout, List, StyleService, useStyleSheet} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import LogItem from '../components/LogItem';
import LogFilter from '../components/LogsFilter';

export default ({navigation, data, contentContainerStyle}) => {
  const styles = useStyleSheet(themedStyles);
  const onItemPress = index => {
    console.log(data, index);
    navigation.navigate('UpdateTask', {
      itemId: data[index].id,
    });
  };

  //method to render each item in the list
  const renderItem = ({index, item}) => (
    <LogItem item={item} index={index} onPress={() => onItemPress(index)} />
  );

  return (
    <Layout style={styles.container}>
      <LogFilter />
      <List
        contentContainerStyle={[styles.list, contentContainerStyle]}
        numColumns={1}
        data={data}
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
