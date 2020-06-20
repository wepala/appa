import React, {useEffect, useState} from 'react';
import {Layout, List, StyleService, useStyleSheet} from '@ui-kitten/components';
import LogItem from '../components/LogItem';
import LogFilter from '../components/LogsFilter';
import TopBar from '../components/TopBar';

export default ({
  navigation,
  items,
  contentContainerStyle,
  tasks,
  setFilters,
}) => {
  const styles = useStyleSheet(themedStyles);
  const onItemPress = (index) => {
    navigation.navigate('UpdateLog', {
      id: items[index].id,
    });
  };

  //method to render each item in the list
  const renderItem = ({index, item}) => (
    <LogItem item={item} index={index} onPress={() => onItemPress(index)} />
  );

  let [logs, setLogs] = useState(items);

  useEffect(() => {
    setLogs(items);
  }, [items]);

  const onSetFilters = (startTime, endTime, taskId) => {
    setLogs(setFilters(startTime, endTime, taskId));
  };

  return (
    <>
      <TopBar navigation={navigation} title="Time Log" />
      <Layout style={styles.container}>
        <LogFilter
          tasks={tasks}
          setFilters={setFilters}
          onSetFilters={onSetFilters}
        />
        <List
          style={[styles.list, contentContainerStyle]}
          numColumns={1}
          data={logs}
          renderItem={renderItem}
        />
      </Layout>
    </>
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
