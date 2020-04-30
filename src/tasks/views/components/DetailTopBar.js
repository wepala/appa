import {
  Divider,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {ArrowIosBackIcon, PlusIcon} from '../../../views/components/Icons';
import React from 'react';

export default ({navigation, title}) => {
  title = title === undefined ? 'WeAgenda' : title;

  const goBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={goBack} />
  );

  const MenuAction = () => {
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
        accessoryLeft={BackAction}
        accessoryRight={MenuAction}
      />
      <Divider />
    </>
  );
};
