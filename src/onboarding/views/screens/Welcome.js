import React from 'react';
import {ImageBackground, SafeAreaView} from 'react-native';
import {
  Button,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import background from '../../../../assets/images/brand/welcome.png';

export default ({navigation}) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={background} style={styles.image}>
        <Layout style={styles.headerContainer}>
          <Text style={styles.text} category="h5">
            Welcome to
          </Text>
          <Text style={[styles.text, styles.appa]} category="h1">
            Appa
          </Text>
        </Layout>
        <Button
          style={styles.button}
          onPress={() => navigation.navigate('Connect')}>
          Continue
        </Button>
      </ImageBackground>
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
  },
  headerContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingBottom: 16,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
  appa: {
    fontSize: 70,
  },
  button: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    elevation: 5,
  },
});
