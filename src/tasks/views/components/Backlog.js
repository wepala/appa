import {List} from '@ui-kitten/components';
import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import BacklogItem from './BacklogItem';
import {TasksContext} from '../../model/context';
import {useFocusEffect} from '@react-navigation/native';

export default ({navigation, items, contentContainerStyle, addToAgenda}) => {
  //get the setCurrentSection function from the Tasks context
  const {setCurrentSection} = useContext(TasksContext);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setCurrentSection('backlog');
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation, setCurrentSection]);

  const onItemPress = index => {
    navigation.navigate('UpdateTask', {
      itemId: items[index].id,
    });
  };

  //method to render each item in the list
  const renderItem = ({index, item}) => (
    <BacklogItem item={item} index={index} onPress={onItemPress} onAddToAgenda={addToAgenda} />
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
