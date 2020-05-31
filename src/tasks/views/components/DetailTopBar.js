import {
  Divider,
  TopNavigation,
  TopNavigationAction,
  Text,
  useStyleSheet,
  StyleService,
} from '@ui-kitten/components';
import {ArrowIosBackIcon, TrashIcon} from '../../../views/components/Icons';
import React from 'react';

export default ({navigation, route, title, section}) => {
  const styles = useStyleSheet(themedStyles);
  const id = route.params?.id;
  title = id === '' ? 'Add Task' : 'Update Task';

  const goBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction
      style={styles.icon}
      icon={ArrowIosBackIcon}
      onPress={goBack}
    />
  );

  const MenuAction = () => {
    const showCreate = () => {
      navigation.navigate('CreateTask', {section: section});
    };

    return (
      <TopNavigationAction
        style={styles.icon}
        icon={id && TrashIcon}
        onPress={showCreate}
      />
    );
  };
  const Title = () => (
    <Text style={styles.title} category="h6">
      {title}
    </Text>
  );
  return (
    <>
      <TopNavigation
        title={Title}
        accessoryLeft={BackAction}
        accessoryRight={MenuAction}
        style={styles.topNav}
      />
      <Divider />
    </>
  );
};

const themedStyles = StyleService.create({
  topNav: {
    backgroundColor: '$color-primary-500',
    color: '#fff',
  },
  title: {
    paddingTop: 4,
    color: '#fff',
  },
  icon: {
    color: '#fff',
  },
});
