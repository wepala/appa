import React from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {
  Avatar,
  Divider,
  Drawer,
  DrawerElement,
  DrawerItem,
  Layout,
  MenuItemType,
  Text,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import {
  AssetCalendarIcon,
  ClockIcon,
  QuestionIcon,
  GridIcon,
  ReportIcon,
  SettingsIcon,
  SupportIcon,
} from './Icons';
import Profile from './Profile';

export default ({navigation}) => {
  const styles = useStyleSheet(themedStyles);
  const onItemSelect = (index) => {
    switch (index.row) {
      case 0: {
        navigation.toggleDrawer();
        navigation.navigate('Agenda');
        return;
      }
      case 1: {
        navigation.toggleDrawer();
        navigation.navigate('Logs');
        return;
      }
      case 3: {
        navigation.toggleDrawer();
        navigation.navigate('Settings');
        return;
      }
      // case 4: {
      //   navigation.toggleDrawer();
      //   navigation.navigate('Support');
      //   return;
      // }
      case 4: {
        navigation.toggleDrawer();
        navigation.navigate('Customize');
        return;
      }
      case 5: {
        navigation.toggleDrawer();
        navigation.navigate('About');
        return;
      }
    }
  };

  const renderHeader = () => (
    <Layout style={styles.header} level="2">
      <View style={styles.profileContainer}>
        <Avatar
          size="giant"
          shape="rounded"
          source={{
            uri: 'https://cdn.roadmap.space/logos/5ed5164b31d74e9553c4f5eb.png',
          }}
        />
        <Text style={styles.profileName} category="h6">
          Appa Does
        </Text>
      </View>

      <View style={styles.profile}>
        <Profile
          account={{
            emails: ['example@gmail.com', 'joe.doe@gmail.com'],
          }}
        />
      </View>
    </Layout>
  );

  const renderFooter = () => (
    <React.Fragment>
      <Divider />
      <DrawerItem disabled={true} description={'Version 0.0.1'} />
    </React.Fragment>
  );

  return (
    <SafeAreaView style={styles.safeArea} insets="top">
      <Drawer
        header={renderHeader}
        footer={renderFooter}
        onSelect={onItemSelect}>
        <DrawerItem title={'Agenda'} accessoryLeft={AssetCalendarIcon} />
        <DrawerItem title={'Time Log'} accessoryLeft={ClockIcon} />
        {/* <DrawerItem title={'Reports'} accessoryLeft={ReportIcon} /> */}
        <Divider />
        <DrawerItem title={'Settings'} accessoryLeft={SettingsIcon} />
        <DrawerItem title={'Customize'} accessoryLeft={GridIcon} />
        <DrawerItem title={'About'} accessoryLeft={QuestionIcon} />
      </Drawer>
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  safeArea: {
    flex: 1,
  },
  header: {
    paddingVertical: 22,
    paddingHorizontal: 16,
    justifyContent: 'center',
    // backgroundColor: '$color-primary-500',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    // color: '#fff',
    marginHorizontal: 16,
  },
  profile: {
    marginTop: 20,
  },
});
