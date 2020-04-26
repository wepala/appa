import {
  Card,
  List,
  ListItemElement,
  ListProps,
  Text,
} from '@ui-kitten/components';
import React from 'react';
import {Dimensions, ListRenderItemInfo, StyleSheet} from 'react-native';
import type {Task} from '../../model/Task';

export default props => {
  const {contentContainerStyle, onItemPress, ...listProps} = props;
  const renderItem = (info: ListRenderItemInfo<Task>): ListItemElement => (
    <Card style={styles.item} onPress={() => props.onItemPress(info.index)}>
      <Text style={styles.itemTitle} category="s2">
        {info.item.title}
      </Text>
    </Card>
  );

  return (
    <List
      {...listProps}
      contentContainerStyle={[styles.container, contentContainerStyle]}
      numColumns={2}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    aspectRatio: 1.0,
    margin: 8,
    maxWidth: Dimensions.get('window').width / 2 - 24,
  },
  itemImage: {
    alignSelf: 'center',
    width: 64,
    height: 64,
  },
  itemTitle: {
    alignSelf: 'center',
    marginTop: 8,
  },
});
