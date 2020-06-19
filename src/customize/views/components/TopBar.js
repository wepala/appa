import {
  Divider,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {CloseIcon, MenuIcon} from '../../../views/components/Icons';
import React from 'react';

export default ({navigation, title}) => {
  title = title === undefined ? 'WeAgenda' : title;

  const showMenu = () => {
    navigation.toggleDrawer();
  };

  const goBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={CloseIcon} onPress={goBack} />
  );

  const MenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={showMenu} />
  );

  return (
    <>
      <TopNavigation
        title={title}
        alignment="center"
        accessoryLeft={MenuAction}
        accessoryRight={BackAction}
      />
      <Divider />
    </>
  );
};
