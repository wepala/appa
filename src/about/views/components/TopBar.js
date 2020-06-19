import {
  Divider,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {ArrowIosBackIcon, CloseIcon} from '../../../views/components/Icons';
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
    return <TopNavigationAction icon={CloseIcon} onPress={goBack} />;
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
