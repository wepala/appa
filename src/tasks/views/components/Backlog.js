import {List, StyleService, useStyleSheet} from '@ui-kitten/components';
import React, {useEffect, useContext} from 'react';
import BacklogItem from './BacklogItem';
import {SectionContext} from '../../context/section-context';

export default ({
  navigation,
  items,
  contentContainerStyle,
  addToAgenda,
  setTaskCompletion,
}) => {
  const styles = useStyleSheet(themedStyles);
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
      onComplete={setTaskCompletion}
    />
  );

  return (
    <List
      style={[styles.container, contentContainerStyle]}
      numColumns={1}
      data={items}
      renderItem={renderItem}
    />
  );
};

const themedStyles = StyleService.create({
  container: {
    paddingVertical: 16,
    backgroundColor: '$background-basic-color-2',
    flex: 1,
  },
  list: {
    flex: 1,
    padding: 0,
    backgroundColor: 'transparent',
  },
});
