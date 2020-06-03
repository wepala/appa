import React, {useState} from 'react';
import {ThemeContext} from '../../../../theme.context';
import {
  Button,
  Layout,
  StyleService,
  Select,
  SelectItem,
  useStyleSheet,
  Text,
  Toggle,
  Icon,
} from '@ui-kitten/components';
import {FlashIcon, InfoIcon, ClockIcon} from '../../../views/components/Icons';
import TopBar from '../components/TopBar';
import {SafeAreaView} from 'react-native';

export default ({navigation, route}) => {
  const themeContext = React.useContext(ThemeContext);
  const [checked, toggleCheck] = useState(themeContext.theme === 'dark');
  const styles = useStyleSheet(themedStyles);
  return (
    <SafeAreaView style={{flex: 1}}>
      <TopBar title="Settings" navigation={navigation} route={route} />
      <Layout style={styles.container}>
        <Button appearance="primary" size="giant" style={styles.buttonConnect}>
          WeOS Connect
        </Button>
        <Layout style={styles.row}>
          <Layout style={styles.column1}>
            <Text category="h5">PERSONALIZATION</Text>
            <Layout style={styles.row}>
              <Text category="s2">Choose your Colour</Text>
              <Icon style={styles.icon} name="info-outline" />
            </Layout>
          </Layout>
        </Layout>
        <Layout style={styles.row}>
          <Layout style={styles.column1}>
            <Text category="h5">THEME</Text>
          </Layout>
          <Layout style={styles.column2}>
            <Toggle
              checked={checked}
              onChange={(isChecked) => {
                toggleCheck(isChecked);
                themeContext.toggleTheme();
              }}>
              {checked ? 'Dark' : 'Light'}
            </Toggle>
          </Layout>
        </Layout>
        <Layout style={styles.row}>
          <Layout style={styles.column1}>
            <Text category="h5">TIMEOUT SETTINGS</Text>
            <Text category="s2">
              Time before the timer is automatically stopped
            </Text>
          </Layout>
        </Layout>
        <Select accessoryRight={ClockIcon}>
          <SelectItem title="1 hour" />
          <SelectItem title="2 hour" />
          <SelectItem title="3 hour" />
        </Select>
      </Layout>
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: '$background-basic-color-1',
    padding: 16,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
  column1: {
    flexGrow: 1,
    marginRight: 16,
    backgroundColor: 'transparent',
  },
  column2: {
    flexGrow: 0,
    backgroundColor: 'transparent',
  },

  icon: {
    width: 16,
    height: 16,
    marginLeft: 8,
    color: '$color-basic-700',
  },

  buttonGroup: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonConnect: {
    marginTop: 32,
    paddingTop: 10,
    paddingBottom: 6,
    paddingHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    elevation: 5,
  },
  buttonSubmit: {
    flexGrow: 1,
  },
});
