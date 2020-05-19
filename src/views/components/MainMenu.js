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
} from '@ui-kitten/components';
import {
  AssetCalendarIcon,
  ClockIcon,
  ProjectIcon,
  ReportIcon,
  SettingsIcon,
  SupportIcon,
} from './Icons';

export default ({navigation}) => {
  const onItemSelect = index => {
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
      case 2: {
        navigation.toggleDrawer();
        navigation.navigate('Support');
        return;
      }
    }
  };

  const renderHeader = () => (
    <Layout style={styles.header} level="2">
      <View style={styles.profileContainer}>
        <Avatar
          size="giant"
          source={require('../../../assets/images/we-logo-blue.png')}
        />
        <Text style={styles.profileName} category="h6">
          WeAgenda
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
        {/* <DrawerItem title={'Settings'} accessoryLeft={SettingsIcon} /> */}
        <DrawerItem title={'Support'} accessoryLeft={SupportIcon} />
      </Drawer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    height: 128,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    marginHorizontal: 16,
  },
});
