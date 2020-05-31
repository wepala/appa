import React from 'react';
import {
  Divider,
  TopNavigation,
  TopNavigationAction,
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

  return (
    <>
      <TopNavigation
        title={title}
        alignment="center"
        accessoryLeft={MenuAction}
        accessoryRight={CreateAction}
      />
      <Divider />
    </>
  );
};
