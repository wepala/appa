import {
  Divider,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
  StyleService,
  Text,
} from '@ui-kitten/components';
import {ArrowIosBackIcon, CloseIcon} from '../../../views/components/Icons';
import React from 'react';

export default ({navigation, title}) => {
  const styles = useStyleSheet(themedStyles);
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

  const Title = () => (
    <Text style={styles.title} category="h6">
      {title}
    </Text>
  );

  return (
    <>
      <TopNavigation
        title={Title}
        accessoryLeft={BackAction}
        accessoryRight={MenuAction}
        style={styles.topNav}
      />
      <Divider />
    </>
  );
};

const themedStyles = StyleService.create({
  topNav: {
    backgroundColor: '$color-primary-500',
    color: '#fff',
  },
  title: {
    paddingTop: 4,
    color: '#fff',
  },
  icon: {
    color: '#fff',
  },
});
