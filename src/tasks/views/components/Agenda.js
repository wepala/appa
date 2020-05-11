import {List, Layout, StyleService, useStyleSheet} from '@ui-kitten/components';
import React, {useState, useEffect} from 'react';
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
  const [currentIndex, setCurrentIndex] = useState(-1);
  const onItemPress = index => {
    navigation.navigate('UpdateTask', {
      id: items[index].id,
    });
  };
  //method to render each item in the list
  const renderItem = ({index, item}) => {
    // if there is a current item that is this item, set the totalTimes index to this item
    if (currentItem && item.id === currentItem.id) {
      setCurrentIndex(index);
    }
    return (
      <AgendaItem
        item={item}
        index={index}
        onPress={() => onItemPress(index)}
        onComplete={setTaskCompletion}
        onStart={startTask}
        setCurrentIndex={setCurrentIndex}
        timeSpentToday={timeTotals[index]}
        active={currentItem && currentItem.id === item.id}
      />
    );
  };

  useEffect(() => {
    return () => {
      console.log('Add a log when unmounting');
      if (currentItem) startTask(currentItem.id);
    };
  }, [startTask]);

  return (
    <Layout style={styles.container} testID={'AgendaLayout'}>
      {currentItem ? (
        <CurrentTask
          testID={'CurrentTask'}
          item={currentItem}
          timeSpentToday={timeTotals[currentIndex]}
        />
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
