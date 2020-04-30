import {List} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';
import AgendaItem from '../components/AgendaItem';

export default ({navigation, data, contentContainerStyle}) => {
  const onItemPress = index => {
    console.log(data, index);
    navigation.navigate('UpdateTask', {
      itemId: data[index].id,
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
