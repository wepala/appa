import {
  Divider,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {MenuIcon, PlusIcon} from '../../../views/components/Icons';
import React from 'react';

export default ({navigation, title}) => {
  title = title === undefined ? 'Logs' : title;

  const showMenu = () => {
    navigation.toggleDrawer();
  };

  const MenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={showMenu} />
  );

  const CreateAction = () => {
    const showCreate = () => {
      navigation.navigate('CreateLog');
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
