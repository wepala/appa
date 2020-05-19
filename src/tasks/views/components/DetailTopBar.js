import {
  Divider,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {ArrowIosBackIcon, TrashIcon} from '../../../views/components/Icons';
import React from 'react';

export default ({navigation, route, title, section}) => {
  console.log('Detailtopbar', section);
  title = title === undefined ? 'WeAgenda' : title;
  const id = route.params?.id;

  const goBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={goBack} />
  );

  const MenuAction = () => {
    const showCreate = () => {
      navigation.navigate('CreateTask', {section: section});
    };

    return <TopNavigationAction icon={id && TrashIcon} onPress={showCreate} />;
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
