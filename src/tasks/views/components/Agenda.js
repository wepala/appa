import React, {useState, useEffect, useContext} from 'react';
import {SectionContext} from '../../context/section-context';
import {List, Layout, StyleService, useStyleSheet} from '@ui-kitten/components';
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
  const onItemPress = (index) => {
    navigation.navigate('UpdateTask', {
      id: items[index].id,
    });
  };

  const context = useContext(SectionContext);

  useEffect(() => {
    if (navigation.isFocused()) {
      context.setSection('agenda');
    }
  });
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

  return (
    <Layout style={styles.container} testID={'AgendaLayout'}>
      {currentItem && currentItem.id ? (
        <CurrentTask
          testID={'CurrentTask'}
          item={currentItem}
          timeSpentToday={timeTotals[currentIndex]}
          stopTask={startTask}
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
    paddingVertical: 16,
    flex: 1,
    backgroundColor: '$background-basic-color-2',
  },
  list: {
    padding: 0,
    backgroundColor: 'transparent',
  },
});
