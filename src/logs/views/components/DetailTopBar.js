import {
  Divider,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {ArrowIosBackIcon, TrashIcon} from '../../../views/components/Icons';
import React from 'react';

export default ({navigation, title, section}) => {
  title = title === undefined ? 'Create Log' : title;

  const goBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={goBack} />
  );

  const MenuAction = () => {
    const showCreate = () => {
      navigation.navigate('CreateLog', {section: section});
    };

    return <TopNavigationAction icon={TrashIcon} onPress={showCreate} />;
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
