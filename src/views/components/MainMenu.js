import React from 'react';
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
  StarIcon,
  SettingsIcon,
  SupportIcon,
} from './Icons';
import Profile from './Profile';
import ConnectHOC from '../../onboarding/controllers/ConnectHOC';
import logo from '../../../assets/images/brand/logo.png';

export default ({navigation, user, setLoading}) => {
  const styles = useStyleSheet(themedStyles);
  const WrappedProfile = ConnectHOC(Profile);
  const onItemSelect = (index) => {
    switch (index.row) {
      case 0: {
        navigation.closeDrawer();
        navigation.navigate('Agenda');
        return;
      }
      case 1: {
        navigation.closeDrawer();
        navigation.navigate('Logs');
        return;
      }
      case 3: {
        navigation.closeDrawer();
        navigation.navigate('Settings');
        return;
      }
      case 4: {
        navigation.closeDrawer();
        navigation.navigate('Customize');
        return;
      }
      case 5: {
        navigation.closeDrawer();
        navigation.navigate('Feedback');
        return;
      }
      case 6: {
        navigation.closeDrawer();
        navigation.navigate('About');
        return;
      }
      default: {
        navigation.closeDrawer();
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

      {user && (
        <View style={styles.profile}>
          <WrappedProfile setLoading={setLoading} />
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
        <DrawerItem title={'Customize'} accessoryLeft={EditIcon} />
        <DrawerItem title={'Feedback'} accessoryLeft={StarIcon} />
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
