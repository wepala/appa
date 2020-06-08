import {
  Divider,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {ArrowIosBackIcon, TrashIcon} from '../../../views/components/Icons';
import React from 'react';
import {Alert} from 'react-native';

export default ({navigation, route, title, section, onRemove}) => {
  title = title === undefined ? 'WeAgenda' : title;
  const id = route.params?.id;

  const goBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={goBack} />
  );

  const MenuAction = () => {
    const showDelete = () => {
      Alert.alert(
        'Delete Task',
        'Are you sure ?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Confirm',
            onPress: () => {
              const screen = section === 'agenda' ? 'Today' : 'Backlog';
              return onRemove(id).then(() => navigation.navigate(screen));
            },
          },
        ],
        {cancelable: false},
      );
    };

    return <TopNavigationAction icon={id && TrashIcon} onPress={showDelete} />;
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
