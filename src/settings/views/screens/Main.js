import React, {useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
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
  Divider,
} from '@ui-kitten/components';
import TopBar from '../components/TopBar';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircle} from '@fortawesome/free-solid-svg-icons';
import {useEffect} from 'react';

export default ({navigation, route}) => {
  const themeContext = React.useContext(ThemeContext);
  const [checked, toggleCheck] = useState(themeContext.theme === 'dark');
  const [currentColour, setCurrentColour] = useState(themeContext.colour.name);

  const styles = useStyleSheet(themedStyles);
  return (
    <SafeAreaView style={{flex: 1}}>
      <TopBar title="Settings" navigation={navigation} route={route} />
      <Layout style={styles.container}>
        <ScrollView>
          {/* <Button
            appearance="primary"
            size="giant"
            style={styles.buttonConnect}>
            WeOS Connect
          </Button> */}
          {/* <Divider style={styles.divider} /> */}
          <Layout style={styles.row}>
            <Layout style={styles.column1}>
              <Text category="h5">PERSONALIZATION</Text>
              <Layout style={styles.row}>
                <Text category="s2" style={{width: '100%'}}>
                  Choose your Colour {currentColour}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  colour: {
    width: 'auto',
    marginVertical: 0,
    marginHorizontal: 0,
    paddingHorizontal: 0,
    paddingVertical: 9,
    borderRadius: 200,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 7,
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
  buttonSubmit: {
    flexGrow: 1,
  },
});
