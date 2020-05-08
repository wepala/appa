import {List, Layout, StyleService, useStyleSheet} from '@ui-kitten/components';
import React, {useContext} from 'react';
import AgendaItem from '../components/AgendaItem';
import CurrentTask from '../components/CurrentTask';
import {useFocusEffect} from '@react-navigation/native';
import {TasksContext} from '../../model/context';

export default ({
  navigation,
  items,
  setTaskCompletion,
  startTask,
  contentContainerStyle,
  currentItem,
}) => {
  //get the setCurrentSection function from the Tasks context
  const {setCurrentSection} = useContext(TasksContext);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setCurrentSection('agenda');
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation, setCurrentSection]);
  const styles = useStyleSheet(themedStyles);
  const onItemPress = index => {
    navigation.navigate('UpdateTask', {
      id: items[index].id,
    });
  };

  //method to render each item in the list
  const renderItem = ({index, item}) => (
    <AgendaItem
      item={item}
      index={index}
      onPress={() => onItemPress(index)}
      onComplete={setTaskCompletion}
      onStart={startTask}
    />
  );

  return (
    <Layout style={styles.container} testID={'AgendaLayout'}>
      <CurrentTask item={currentItem} testID={'CurrentTask'} />
      <List
        style={[styles.list, contentContainerStyle]}
        numColumns={1}
        data={items}
        renderItem={renderItem}
      />
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    padding: 16,
    flex: 1,
  },
  list: {
    padding: 0,
    backgroundColor: '$background-basic-color-1',
  },
});
