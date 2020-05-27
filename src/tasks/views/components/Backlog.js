import {List} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';
import BacklogItem from './BacklogItem';

export default ({navigation, items, contentContainerStyle}) => {
  const onItemPress = (index) => {
    console.log(items[index].id);

    navigation.navigate('UpdateTask', {
      id: items[index].id,
    });
  };

  //method to render each item in the list
  const renderItem = ({index, item}) => (
    <BacklogItem item={item} index={index} onPress={onItemPress} />
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
    flex: 1,
    padding: 16,
  },
});
