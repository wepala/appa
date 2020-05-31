import React from 'react';
import {
  Divider,
  TopNavigation,
  TopNavigationAction,
  Text,
} from '@ui-kitten/components';
import {MenuIcon, PlusIcon} from '../../../views/components/Icons';

export default ({navigation, title}) => {
  title = title === undefined ? 'WeAgenda' : title;

  const showMenu = () => {
    navigation.toggleDrawer();
  };

  const MenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={showMenu} />
  );

  const CreateAction = () => {
    const showCreate = () => {
      navigation.navigate('CreateTask');
    };

    return <TopNavigationAction icon={PlusIcon} onPress={showCreate} />;
  };
  const Title = () => <Text category="h6">{title}</Text>;

  return (
    <>
      <TopNavigation
        title={Title}
        alignment="center"
        accessoryLeft={MenuAction}
        accessoryRight={CreateAction}
      />
      <Divider />
    </>
  );
};
