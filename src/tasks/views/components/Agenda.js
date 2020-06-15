import React, {useState, useEffect, useContext} from 'react';
import {SectionContext} from '../../context/section-context';
import {
  List,
  Text,
  Layout,
  StyleService,
  useStyleSheet,
  Button,
} from '@ui-kitten/components';
import AgendaItem from '../components/AgendaItem';
import CurrentTask from '../components/CurrentTask';

const messages = [
  {title: 'What would you like to accomplish today?', subTitle: ''},
  {
    title: 'Let’s start planning your day.',
    subTitle: 'Add a new task or select one from your backlog',
  },
  {
    title: 'Hmmm…we have nothing planned for today. ',
    subTitle: 'Let’s fix that by adding a new task above.',
  },
  {
    title: 'Our day is a blank canvas! ',
    subTitle: 'Start your planning by adding your first task.',
  },
  {title: 'What can we get done today?', subTitle: ''},
  {title: 'Add a new task', subTitle: ''},
];

export default ({
  navigation,
  items,
  setTaskCompletion,
  startTask,
  contentContainerStyle,
  currentItem,
  timeTotals,
}) => {
  const [placeholder, setPlaceholder] = useState(
    messages[Math.floor(Math.random() * messages.length)],
  );
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
      {items.length ? (
        <List
          style={[styles.list, contentContainerStyle]}
          numColumns={1}
          data={items}
          renderItem={renderItem}
        />
      ) : (
        <Layout style={styles.placeholder}>
          <Text style={styles.title} category="h3" appearance="hint">
            {placeholder.title}
          </Text>
          <Text style={styles.subTitle} category="h6" appearance="hint">
            {placeholder.subTitle}
          </Text>
          <Button
            style={styles.buttonAdd}
            size="large"
            onPress={() => navigation.navigate('CreateTask')}>
            ADD TASK
          </Button>
        </Layout>
      )}
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
  placeholder: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'transparent',
  },
  title: {
    textAlign: 'center',
    paddingBottom: 32,
  },
  subTitle: {
    textAlign: 'center',
  },
  buttonAdd: {
    width: '100%',
    marginTop: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    elevation: 5,
  },
});
