import {List} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';
import BacklogItem from './BacklogItem';

export default ({navigation, data, contentContainerStyle}) => {
  const onItemPress = index => {
    navigation.navigate('UpdateTask', {
      itemId: data[index].id,
    });
  };

  //method to render each item in the list
  const renderItem = ({index, item}) => (
    <BacklogItem item={item} index={index} onPress={onItemPress} />
  );

  return (
    <List
      contentContainerStyle={[styles.container, contentContainerStyle]}
      numColumns={3}
      data={data}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});
