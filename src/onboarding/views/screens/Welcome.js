import React from 'react';
import {SafeAreaView, Image} from 'react-native';
import {
  Button,
  Text,
  useStyleSheet,
  StyleService,
  Layout,
} from '@ui-kitten/components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHandSparkles} from '@fortawesome/free-solid-svg-icons';
import {faGithub} from '@fortawesome/free-brands-svg-icons';

export default ({navigation}) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.container} level="2">
        <Layout style={styles.headerContainer} level="2">
          <FontAwesomeIcon
            style={styles.image}
            icon={faHandSparkles}
            size={216}
          />
          <Text style={styles.text} category="h3">
            Welcome to WeAgenda
          </Text>
          <Text style={styles.text} category="s1">
            A fully customizable app built by Wepala and made better by you!
          </Text>
          <Text>
            <FontAwesomeIcon style={styles.license} icon={faGithub} size={50} />
            <Image
              style={styles.agpl}
              source={require('../../../../assets/images/agpl.png')}
            />
          </Text>
        </Layout>
        <Layout level="2" style={styles.buttonContainer}>
          <Button onPress={() => navigation.navigate('Connect')}>
            Continue
          </Button>
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  container: {
    height: '100%',
    padding: 16,
  },
  image: {
    color: 'color-primary-default',
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  text: {
    color: '$color-basic-700',
    textAlign: 'center',
  },
  license: {
    paddingRight: 100,
  },

  agpl: {
    height: 50,
    width: 120,
  },
  buttonGroup: {
    paddingVertical: 16,
  },
});
