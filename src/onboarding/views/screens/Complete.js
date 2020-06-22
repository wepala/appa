import React from 'react';
import {ImageBackground, SafeAreaView} from 'react-native';
import {
  Button,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import background from '../../../../assets/images/brand/complete.png';

export default ({navigation, onComplete}) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.image} source={background}>
        <Layout style={styles.headerContainer}>
          <Text style={styles.text} category="h2">
            You're All Set!
          </Text>
          <Text style={styles.text} category="s1">
            Don't hesitate to reach out with your feedback
          </Text>
        </Layout>
        <Button
          style={styles.button}
          testID={'CompleteButton'}
          onPress={() => onComplete()}>
          Complete
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
    marginBottom: 16,
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
