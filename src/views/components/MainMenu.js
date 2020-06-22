import React from 'react';
import logo from '../../../assets/images/brand/appaIcon.png';
import {SafeAreaView, View} from 'react-native';
import {
  Avatar,
  Divider,
  Drawer,
  DrawerItem,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import {
  AssetCalendarIcon,
  ClockIcon,
  EditIcon,
  InfoIcon,
  SettingsIcon,
  SupportIcon,
} from './Icons';

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
      case 4: {
        navigation.toggleDrawer();
        navigation.navigate('Support');
        return;
      }
      case 5: {
        navigation.toggleDrawer();
        navigation.navigate('Customize');
        return;
      }
      case 6: {
        navigation.toggleDrawer();
        navigation.navigate('About');
        return;
      }
    }
  };

  const renderHeader = () => (
    <Layout style={styles.header} level="2">
      <View style={styles.profileContainer}>
        <Avatar size="giant" shape="rounded" source={logo} />
        <Text style={styles.profileName} category="h6">
          Appa Does
        </Text>
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
        <DrawerItem title={'Support'} accessoryLeft={SupportIcon} />
        <DrawerItem title={'Customize'} accessoryLeft={EditIcon} />
        <DrawerItem title={'About'} accessoryLeft={InfoIcon} />
      </Drawer>
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  safeArea: {
    flex: 1,
  },
  header: {
    paddingVertical: 32,
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
});
