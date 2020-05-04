import {List} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';
import AgendaItem from '../components/AgendaItem';

export default ({navigation, items, contentContainerStyle}) => {
  const onItemPress = index => {
    navigation.navigate('UpdateTask', {
      itemId: items[index].id,
    });
  };

  //method to render each item in the list
  const renderItem = ({index, item}) => (
    <AgendaItem item={item} index={index} onPress={() => onItemPress(index)} />
  );

  return (
    <List
      contentContainerStyle={[styles.container, contentContainerStyle]}
      numColumns={1}
      data={items}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});
