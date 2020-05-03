import {
  List,
  Layout,
  StyleService,
  useStyleSheet,
  Divider,
} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import AgendaItem from '../components/AgendaItem';
import CurrentTask from '../components/CurrentTask';

export default ({navigation, data, contentContainerStyle}) => {
  const styles = useStyleSheet(themedStyles);
  const onItemPress = index => {
    console.log(data, index);
    navigation.navigate('UpdateTask', {
      itemId: data[index].id,
    });
  };

  //method to render each item in the list
  const renderItem = ({index, item}) => (
    <AgendaItem item={item} index={index} onPress={() => onItemPress(index)} />
  );

  return (
    <Layout style={styles.container}>
      <CurrentTask item={{title: 'Lorem Ipsum'}} />
      <List
        style={[styles.list, contentContainerStyle]}
        numColumns={1}
        data={data}
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
