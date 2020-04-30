import {Card, Text} from '@ui-kitten/components';
import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';

export default ({index, item, onPress}) => {
  return (
    <Card style={styles.item} onPress={onPress}>
      <Text style={styles.itemTitle} category="s2">
        {item.title}
      </Text>
    </Card>
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
