import {List} from '@ui-kitten/components';
import React, {useEffect, useContext} from 'react';
import {StyleSheet} from 'react-native';
import BacklogItem from './BacklogItem';
import {SectionContext} from '../../context/section-context';

export default ({navigation, items, contentContainerStyle, addToAgenda}) => {
  const onItemPress = (index) => {
    navigation.navigate('UpdateTask', {
      id: items[index].id,
    });
  };

  const context = useContext(SectionContext);

  useEffect(() => {
    if (navigation.isFocused()) {
      context.setSection('backlog');
    }
  });

  //method to render each item in the list
  const renderItem = ({index, item}) => (
    <BacklogItem
      item={item}
      index={index}
      onPress={onItemPress}
      addToAgenda={addToAgenda}
      navigation={navigation}
    />
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
    padding: 16,
  },
});
