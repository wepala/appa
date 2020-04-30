import React from 'react';
import {View} from 'react-native';
import {
  Button,
  Input,
  Layout,
  StyleService,
  Text,
  List,
  ListItem,
  useStyleSheet,
} from '@ui-kitten/components';
import {KeyboardAvoidingView} from '../../../views/components/KeyboardAvoidingView';
import ProjectItem from '../components/ProjectItem';

const data = new Array(8).fill({
  title: 'Item',
});

export default ({navigation}) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.headerContainer} />
      <View style={styles.contentContainer}>
        <List
          data={data}
          renderItem={({item, index}) => (
            <ProjectItem item={item} index={index} />
          )}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'background-basic-color-2',
  },

  contentContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: 'background-basic-color-2',
  },
});
