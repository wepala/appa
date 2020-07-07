import React, {useState, useEffect} from 'react';
import {Platform, Linking} from 'react-native';
import {SafeAreaView, ScrollView} from 'react-native';
import {ThemeContext} from '../../../../theme.context';
import {
  Button,
  Divider,
  Layout,
  StyleService,
  Text,
  Toggle,
  useStyleSheet,
} from '@ui-kitten/components';
import TopBar from '../components/TopBar';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircle} from '@fortawesome/free-solid-svg-icons';
import Spinner from '../../../views/components/Spinner';

export default ({
  navigation,
  route,
  handleConnect,
  handleLogout,
  loading,
  componentState,
}) => {
  const themeContext = React.useContext(ThemeContext);
  const [checked, toggleCheck] = useState(themeContext.theme === 'dark');
  const [currentColour, setCurrentColour] = useState(themeContext.colour.name);
  const styles = useStyleSheet(themedStyles);
  const {user} = componentState;

  return (
    <SafeAreaView style={{flex: 1}} testID="ConnectSafeAreaView">
      <TopBar title="Settings" navigation={navigation} route={route} />
      <Layout style={styles.container}>
        <ScrollView>
          {!user && (
            <>
              <Button
                testID="WeOsConnectBtn"
                appearance="primary"
                size="giant"
                style={styles.buttonConnect}
                onPress={() => handleConnect('Settings')}>
                WeOS Connect
              </Button>
              <Divider style={styles.divider} />
            </>
          )}

          <Layout style={styles.row}>
            <Layout style={styles.column1}>
              {user && (
                <>
                  <Button
                    testID="LogoutBtn"
                    appearance="primary"
                    size="giant"
                    style={styles.buttonLogout}
                    onPress={handleLogout}>
                    Logout
                  </Button>
                  <Divider style={styles.divider} />
                  <Text category="h5">ACCOUNT</Text>
                  <Layout style={styles.row}>
                    <Text
                      category="s2"
                      style={{width: '100%'}}
                      testID="AccountEmail">
                      {user.sub.email}
                    </Text>
                  </Layout>
                </>
              )}
              <Text category="h5">PERSONALIZATION</Text>
              <Layout style={styles.row}>
                <Text category="s2" style={{width: '100%'}}>
                  Choose your Colour
                </Text>
              </Layout>
              <Layout style={styles.coloursRow}>
                <Button
                  style={styles.colour}
                  appearance={currentColour === 'default' ? 'outline' : 'ghost'}
                  onPress={() => {
                    themeContext.changeColour('default');
                    setCurrentColour('default');
                  }}>
                  <FontAwesomeIcon size={32} icon={faCircle} color="#4381FF" />
                </Button>
                <Button
                  style={styles.colour}
                  appearance={currentColour === 'violet' ? 'outline' : 'ghost'}
                  onPress={() => {
                    themeContext.changeColour('violet');
                    setCurrentColour('violet');
                  }}>
                  <FontAwesomeIcon size={32} icon={faCircle} color="#6633d4" />
                </Button>
                <Button
                  style={styles.colour}
                  appearance={currentColour === 'magenta' ? 'outline' : 'ghost'}
                  onPress={() => {
                    setCurrentColour('magenta');
                    themeContext.changeColour('magenta');
                  }}>
                  <FontAwesomeIcon size={32} icon={faCircle} color="#ba46d5" />
                </Button>
                <Button
                  style={styles.colour}
                  appearance={currentColour === 'red' ? 'outline' : 'ghost'}
                  onPress={() => {
                    setCurrentColour('red');
                    themeContext.changeColour('red');
                  }}>
                  <FontAwesomeIcon size={32} icon={faCircle} color="#df437a" />
                </Button>
                <Button
                  style={styles.colour}
                  appearance={currentColour === 'orange' ? 'outline' : 'ghost'}
                  onPress={() => {
                    setCurrentColour('orange');
                    themeContext.changeColour('orange');
                  }}>
                  <FontAwesomeIcon size={32} icon={faCircle} color="#fa7e4c" />
                </Button>
                <Button
                  style={styles.colour}
                  appearance={currentColour === 'yellow' ? 'outline' : 'ghost'}
                  onPress={() => {
                    setCurrentColour('yellow');
                    themeContext.changeColour('yellow');
                  }}>
                  <FontAwesomeIcon size={32} icon={faCircle} color="#fec63e" />
                </Button>
                <Button
                  style={styles.colour}
                  appearance={currentColour === 'green' ? 'outline' : 'ghost'}
                  onPress={() => {
                    setCurrentColour('green');
                    themeContext.changeColour('green');
                  }}>
                  <FontAwesomeIcon size={32} icon={faCircle} color="#8dd76e" />
                </Button>
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
          {/* To be implemented later */}
          {/* <Layout style={styles.row}>
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
        </Select> */}
        </ScrollView>
        {loading && <Spinner />}
      </Layout>
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: '$background-basic-color-2',
    padding: 16,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 24,
    paddingHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
  coloursRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  colour: {
    width: 'auto',
    marginVertical: 0,
    marginHorizontal: 0,
    paddingHorizontal: Platform.OS === 'ios' ? 1 : 0,
    paddingVertical: 9,
    paddingTop: Platform.OS === 'ios' ? 14 : 8,

    borderRadius: 200,
  },
  column1: {
    flexGrow: 1,
    backgroundColor: 'transparent',
  },
  column2: {
    flexGrow: 0,
    backgroundColor: 'transparent',
  },

  divider: {
    marginVertical: 16,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    elevation: 5,
  },
  buttonLogout: {
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
