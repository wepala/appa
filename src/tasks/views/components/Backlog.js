import React, {useContext, useEffect, useState} from 'react';
import {Image} from 'react-native';
import logo from '../../../../assets/images/brand/appaIcon.png';

import {
  Button,
  Layout,
  List,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import BacklogItem from './BacklogItem';
import {SectionContext} from '../../context/section-context';
import logo from '../../../../assets/images/brand/logo.png';

const messages = [
  {
    title: 'Your backlog is where all your unfinished tasks go.',
    subTitle:
      'You can quickly move them into your day’s agenda when tasks roll over into other days.',
  },
  {
    title: 'Yay, your backlog is empty!',
    subTitle:
      'This means you have no unfinished tasks. You can quickly move backlog tasks to your day’s agenda.',
  },
];

export default ({
  navigation,
  items,
  contentContainerStyle,
  addToAgenda,
  setTaskCompletion,
  timeTotals,
}) => {
  const [placeholder, setPlaceholder] = useState(
    messages[Math.floor(Math.random() * messages.length)],
  );
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
  console.log('Time TOTALS', timeTotals, '\n', items);
  //method to render each item in the list
  const renderItem = ({index, item}) => (
    <BacklogItem
      item={item}
      index={index}
      onPress={onItemPress}
      addToAgenda={addToAgenda}
      navigation={navigation}
      onComplete={setTaskCompletion}
      timeSpentToday={
        timeTotals.findIndex((obj) => obj.taskId === item.id) > -1
          ? timeTotals[timeTotals.findIndex((obj) => obj.taskId === item.id)]
              .totalTimeSpent
          : null
      }
    />
  );

  return items.length ? (
    <List
      style={[styles.container, contentContainerStyle]}
      numColumns={1}
      data={items}
      renderItem={renderItem}
    />
  ) : (
    <Layout testID={'Placeholder'} style={styles.placeholder}>
      <Image style={styles.image} source={logo} />
      <Layout>
        <Text style={styles.title} category="h3" appearance="hint">
          {placeholder.title}
        </Text>
        <Text style={styles.subTitle} category="h6" appearance="hint">
          {placeholder.subTitle}
        </Text>
      </Layout>
      <Button
        style={styles.buttonAdd}
        size="large"
        onPress={() => navigation.navigate('CreateTask')}>
        ADD TASK
      </Button>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    padding: 16,
    backgroundColor: '$background-basic-color-2',
    flex: 1,
  },
  list: {
    flex: 1,
    padding: 0,
    backgroundColor: 'transparent',
  },
  placeholder: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
    padding: 16,
  },
  image: {
    height: 200,
    width: 200,
    opacity: 0.15,
  },
  title: {
    textAlign: 'center',
    marginVertical: 32,
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
