import React, {useContext} from 'react';
import {ThemeContext} from '../../../../theme.context';
import {SafeAreaView, KeyboardAvoidingView, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Button,
  Card,
  Input,
  Layout,
  Modal,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import DetailTopBar from '../components/DetailTopBar';
import {useForm} from '../../../weos/helpers';

export default ({navigation, route, status, makeRequest}) => {
  const themeContext = useContext(ThemeContext);
  const styles = useStyleSheet(themedStyles);

  const [form, setForm] = useForm({
    name: '',
    email: '',
    details: '',
    reason: 'temp',
  });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <DetailTopBar
          title="Appa Modification Request"
          navigation={navigation}
        />
        <LinearGradient
          colors={
            themeContext.theme === 'dark'
              ? ['#222B45', '#101426']
              : ['#b0d9ff', '#eff9ff']
          }
          style={styles.linearGradient}>
          <ScrollView>
            <Text category="h1" style={styles.title}>
              Appa Modification Request
            </Text>
            <Layout style={styles.row}>
              <Layout style={styles.column}>
                <Input
                  style={styles.paddingBottom}
                  size="large"
                  placeholder="Your name"
                  onChangeText={(val) => {
                    setForm(val.trimLeft(), 'name');
                  }}
                />
                <Input
                  size="large"
                  style={styles.paddingBottom}
                  placeholder="Email Address"
                  keyboardType="email-address"
                  onChangeText={(val) => {
                    setForm(val.trimLeft(), 'email');
                  }}
                />
                <Input
                  style={styles.paddingBottom}
                  size="large"
                  placeholder="Type your message"
                  multiline={true}
                  numberOfLines={5}
                  onChangeText={(val) => {
                    setForm(val.trimLeft(), 'details');
                  }}
                />
                <Button
                  disabled={
                    form.name === '' ||
                    form.email === '' ||
                    form.details === '' ||
                    status === 'success'
                  }
                  size="large"
                  style={styles.buttonSend}
                  onPress={() => {
                    let data = {
                      ...form,
                    };
                    makeRequest(data);
                  }}>
                  {status === 'pending' ? 'SENDING...' : 'SEND REQUEST'}
                </Button>
                <Layout />
              </Layout>
            </Layout>
            <Modal
              visible={status !== 'init'}
              style={styles.container}
              backdropStyle={styles.backdrop}>
              {status === 'error' ? (
                <Card disabled={true}>
                  <Text category="h3">Failed to Send</Text>
                  <Button onPress={() => navigation.goBack()}>DISMISS</Button>
                </Card>
              ) : status === 'success' ? (
                <Card disabled={true}>
                  <Text category="h3">Request Sent!</Text>
                  <Button onPress={() => navigation.goBack()}>DISMISS</Button>
                </Card>
              ) : null}
            </Modal>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    display: 'flex',
    flex: 1,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  row: {
    display: 'flex',
    justifyContent: 'flex-start',
    padding: 16,
    backgroundColor: 'transparent',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'transparent',
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
  select: {
    width: '100%',
  },
  buttonSend: {
    width: '100%',
  },
  paddingBottom: {
    paddingBottom: 16,
  },
});
