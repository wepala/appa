import React, {useState} from 'react';
import {
  Button,
  Layout,
  StyleService,
  Select,
  SelectItem,
  useStyleSheet,
  Text,
  Toggle,
} from '@ui-kitten/components';
import {FlashIcon, InfoIcon, ClockIcon} from '../../../views/components/Icons';
import TopBar from '../components/TopBar';
import {SafeAreaView} from 'react-native';

export default ({navigation, route, toggleTheme, currentTheme}) => {
  const [checked, toggleCheck] = useState(currentTheme);
  const styles = useStyleSheet(themedStyles);
  return (
    <SafeAreaView style={styles.container}>
      <TopBar title="Settings" navigation={navigation} route={route} />
      <Layout style={styles.container}>
        <Button appearance="primary" accessoryRight={FlashIcon}>
          WeOS Connect
        </Button>
        <Layout style={styles.row}>
          <Layout style={styles.column1}>
            <Text category="h5">Personalization</Text>
            <Text category="s2">Choose you Colour</Text>
          </Layout>
          <Layout style={styles.column2}>
            <Button size="small" appearance="ghost" accessoryRight={InfoIcon} />
          </Layout>
        </Layout>
        <Layout style={styles.row}>
          <Toggle
            checked={checked}
            onChange={isChecked => {
              toggleCheck(isChecked);
              toggleTheme(isChecked);
            }}>
            {checked ? 'Dark' : 'Light'}
          </Toggle>
        </Layout>
        <Layout style={styles.row}>
          <Layout style={styles.column1}>
            <Text category="h5">Timeout Settings</Text>
            <Text category="s2">
              Time before the timer is automatically stopped
            </Text>
          </Layout>
          <Layout style={styles.column2}>
            <Button size="small" appearance="ghost" accessoryRight={InfoIcon} />
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
    paddingVertical: 16,
    alignItems: 'center',
  },
  column1: {
    flexGrow: 1,
    marginRight: 16,
    justifyContent: 'flex-start',
  },
  column2: {
    flexGrow: 0,
  },

  buttonGroup: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonCancel: {
    flexBasis: 'auto',
    flexShrink: 0,
    marginRight: 16,
  },
  buttonSubmit: {
    flexGrow: 1,
  },
});
