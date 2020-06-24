import React, {useState} from 'react';
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
import Profile from './Profile';
import logo from '../../../assets/images/brand/logo.png';
import Spinner from '../components/Spinner';

export default ({navigation, token, logout, setUserInfo, user}) => {
  const styles = useStyleSheet(themedStyles);
  const [loading, setLoading] = useState(false);
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

      {token && (
        <View style={styles.profile}>
          <Profile
            user={user}
            token={token}
            logout={logout}
            setUserInfo={setUserInfo}
            setLoading={setLoading}
          />
        </View>
      )}
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
      {loading && <Spinner />}
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
    backgroundColor: '$background-basic-color-2',
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
