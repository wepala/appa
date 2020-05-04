import {List, StyleService, useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';
import LogItem from '../components/LogItem';

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
    <List
      contentContainerStyle={[styles.container, contentContainerStyle]}
      numColumns={1}
      data={data}
      renderItem={renderItem}
    />
  );
};

const themedStyles = StyleService.create({
  container: {
    padding: 16,
    backgroundColor: '$background-basic-color-1',
  },
});
