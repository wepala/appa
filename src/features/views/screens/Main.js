import React from 'react';
import {SafeAreaView} from 'react-native';
import {useForm} from '../../../weosHelpers';
import {
  Button,
  Layout,
  Input,
  StyleService,
  useStyleSheet,
  Text,
} from '@ui-kitten/components';
import LinearGradient from 'react-native-linear-gradient';
import TopBar from '../components/TopBar';

export default ({navigation, route, status, addFeedback}) => {
  const [form, setForm] = useForm({
    title: 'New feedback',
    desc: 'Some great feedback',
  });

  const styles = useStyleSheet(themedStyles);
  return (
    <SafeAreaView style={styles.container}>
      <TopBar title="Request Features" navigation={navigation} route={route} />
      <LinearGradient
        colors={['#b0d9ff', '#eff9ff']}
        style={styles.linearGradient}>
        <Text category="h1" style={styles.title}>
          What should Appa do next?
        </Text>
        <Layout style={styles.content}>
          <Input
            testID="TaskDescription"
            style={styles.input}
            multiline={true}
            placeholder="Other"
            clearButtonMode="unless-editing"
            numberOfLines={3}
            maxLength={100}
            // value={form.description}
            // onChangeText={(val) => setForm(val.trimLeft(), 'description')}
          />
          <Layout style={styles.grid}>
            <Layout style={[styles.item, styles.itemRight]}>
              <Button style={styles.buttonOptions} status="basic">
                Feature
              </Button>
            </Layout>
            <Layout style={[styles.item, styles.itemLeft]}>
              <Button style={styles.buttonOptions} status="basic">
                Feature
              </Button>
            </Layout>
            <Layout style={[styles.item, styles.itemRight]}>
              <Button style={styles.buttonOptions} status="basic">
                Feature
              </Button>
            </Layout>
            <Layout style={[styles.item, styles.itemLeft]}>
              <Button style={styles.buttonOptions} status="basic">
                Feature
              </Button>
            </Layout>
          </Layout>
          <Button
            size="giant"
            style={styles.buttonSubmit}
            onPress={() => addFeedback(form)}>
            SUBMIT
          </Button>
          <Text category="c1">{status}</Text>
        </Layout>
      </LinearGradient>
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  },
  content: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start',
    padding: 16,
    backgroundColor: 'transparent',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'transparent',
    paddingBottom: 16,
  },

  item: {
    width: '50%',
    backgroundColor: 'transparent',
  },
  itemRight: {
    paddingRight: 4,
  },
  itemLeft: {
    paddingLeft: 4,
  },

  input: {
    width: '100%',
    marginBottom: 24,
  },
  title: {
    textAlign: 'center',
    marginTop: 32,
  },
  subTitle: {
    paddingBottom: 32,
  },
  description: {
    textAlign: 'center',
    paddingHorizontal: 32,
    paddingBottom: 32,
  },
  buttonOptions: {
    width: '100%',
    borderRadius: 50,
    marginBottom: 8,
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
  },
  buttonSubmit: {
    width: '100%',
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
  },
});
