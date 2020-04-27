import {
  Card,
  Divider,
  List,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {MenuIcon, PlusIcon} from '../../../views/components/Icons';
import TopBar from '../components/TopBar';

export default props => {
  const {contentContainerStyle, onItemPress, navigation, ...listProps} = props;
  //method to render each item in the list
  const renderItem = info => (
    <Card style={styles.item} onPress={() => props.onItemPress(info.index)}>
      <Text style={styles.itemTitle} category="s2">
        {info.item.title}
      </Text>
    </Card>
  );

  //setup tabs for current task list and backlog
  const Tabs = createMaterialTopTabNavigator();

  const TabNavigation = () => (
    <Tabs.Navigator screenOptions={{gestureEnabled: false}}>
      <Tabs.Screen name="Today" component={TodayList} />
      <Tabs.Screen name="Backlog" component={Backlog} />
    </Tabs.Navigator>
  );

  const TodayList = () => (
    <List
      {...listProps}
      contentContainerStyle={[styles.container, contentContainerStyle]}
      numColumns={2}
      renderItem={renderItem}
    />
  );

  const Backlog = () => (
    <List
      {...listProps}
      contentContainerStyle={[styles.container, contentContainerStyle]}
      numColumns={2}
      renderItem={renderItem}
    />
  );

  return (
    <>
      <TopBar navigation={navigation} />
      <TabNavigation />
    </>
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
