import React, {useState, useEffect, useContext} from 'react';
import {
  Layout,
  Text,
  List,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import BacklogItem from './BacklogItem';
import {SectionContext} from '../../context/section-context';

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
    messages[Math.floor(Math.random() * 2)],
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

  //method to render each item in the list
  const renderItem = ({index, item}) => (
    <BacklogItem
      item={item}
      index={index}
      onPress={onItemPress}
      addToAgenda={addToAgenda}
      navigation={navigation}
      onComplete={setTaskCompletion}
      timeSpentToday={timeTotals[index]}
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
    <Layout style={styles.placeholder}>
      <Text style={styles.title} category="h3" appearance="hint">
        {placeholder.title}
      </Text>
      <Text style={styles.subTitle} category="h6" appearance="hint">
        {placeholder.subTitle}
      </Text>
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
    justifyContent: 'center',
    backgroundColor: 'transparent',
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 32,
  },
  subTitle: {
    textAlign: 'center',
  },
});
