import {
  Divider,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {ArrowIosBackIcon, TrashIcon} from '../../../views/components/Icons';
import React from 'react';
import {Alert} from 'react-native';

export default ({navigation, title, route, onRemove}) => {
  title = title === undefined ? 'Create Log' : title;
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
        'Delete Log',
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
              return onRemove(id)
                .then(() => navigation.navigate('LogList'))
                .catch((error) => console.log('An error occured', error));
            },
          },
        ],
        {cancelable: false},
      );
    };

    return <TopNavigationAction icon={TrashIcon} onPress={showDelete} />;
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
