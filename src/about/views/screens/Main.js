import React from 'react';
import {ImageBackground, ScrollView} from 'react-native';
import {
  Layout,
  StyleService,
  useStyleSheet,
  Text,
  Card,
} from '@ui-kitten/components';
import TopBar from '../components/TopBar';
import {SafeAreaView} from 'react-native';
import background from '../../../../assets/images/brand/about.png';

export default ({navigation, route}) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <SafeAreaView style={styles.container}>
      <TopBar title="About Us" navigation={navigation} route={route} />
      <ImageBackground source={background} style={styles.image}>
        <ScrollView style={styles.container}>
          <Layout style={styles.container}>
            <Layout style={styles.row}>
              <Layout style={styles.column}>
                <Text category="s1">Version</Text>
                <Card disabled style={styles.card}>
                  <Text category="s1">WeAgenda beta 1.2</Text>
                </Card>
              </Layout>
            </Layout>
            <Layout style={styles.row}>
              <Layout style={styles.column}>
                <Text category="s1">Pipeline</Text>
                <Card disabled style={styles.card}>
                  <Text category="s1">
                    See what features are coming next update
                  </Text>
                </Card>
              </Layout>
            </Layout>
            <Layout style={styles.row}>
              <Layout style={styles.column}>
                <Text category="s1">Licence</Text>
                <Card disabled style={styles.card}>
                  <Text category="s1">Free as in Freedom</Text>
                </Card>
              </Layout>
            </Layout>
            <Layout style={styles.row}>
              <Layout style={styles.column}>
                <Text category="s1">Wepala</Text>
                <Card disabled style={styles.card}>
                  <Text category="s1">The company behind the cApps</Text>
                </Card>
              </Layout>
            </Layout>
          </Layout>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    backgroundColor: '#444',
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  column: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  card: {
    marginTop: 8,
  },
});
