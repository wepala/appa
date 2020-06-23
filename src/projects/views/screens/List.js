import React from 'react';
import {Layout, List, StyleService, useStyleSheet} from '@ui-kitten/components';
import ProjectItem from '../components/ProjectItem';

const data = new Array(8).fill({
  title: 'Item',
});

export default ({navigation}) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <Layout style={styles.container}>
      <Layout style={styles.contentContainer}>
        <List
          data={data}
          renderItem={({item, index}) => (
            <ProjectItem item={item} index={index} />
          )}
        />
      </Layout>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'background-basic-color-2',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: 'background-basic-color-2',
  },
});
