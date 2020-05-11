import {List, Layout, StyleService, useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import AgendaItem from '../components/AgendaItem';
import CurrentTask from '../components/CurrentTask';

export default ({
  navigation,
  items,
  setTaskCompletion,
  startTask,
  contentContainerStyle,
  currentItem,
  timeTotals,
}) => {
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
      timeSpentToday={timeTotals[index]}
    />
  );

  return (
    <Layout style={styles.container} testID={'AgendaLayout'}>
      {currentItem ? (
        <CurrentTask item={currentItem} testID={'CurrentTask'} />
      ) : null}
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
