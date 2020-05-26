import React from 'react';
import {SafeAreaView, ImageBackground} from 'react-native';
import {
  Button,
  Text,
  useStyleSheet,
  StyleService,
  Layout,
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
        <Button testID={'CompleteButton'} onPress={() => onComplete()}>
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
  },
  buttonGroup: {
    paddingVertical: 16,
  },
  buttonConnct: {
    marginBottom: 16,
  },
});
