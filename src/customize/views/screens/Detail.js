import React, {useContext, useState} from 'react';
import {ThemeContext} from '../../../../theme.context';
import {SafeAreaView, KeyboardAvoidingView, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Button,
  Layout,
  StyleService,
  Input,
  Select,
  SelectItem,
  useStyleSheet,
  Text,
  Modal,
  Card,
  IndexPath,
} from '@ui-kitten/components';
import {ArrowDownIcon} from '../../../views/components/Icons';
import DetailTopBar from '../components/DetailTopBar';
import {useForm} from '../../../weosHelpers';

export default ({navigation, route, status, makeRequest}) => {
  const themeContext = useContext(ThemeContext);

  const reasons = ['Bug', 'Feature'];

  const [form, setForm] = useForm({
    name: '',
    email: '',
    reason: new IndexPath(0),
    details: '',
  });
  const styles = useStyleSheet(themedStyles);
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
                  placeholder="Your name"
                  onChangeText={(val) => {
                    setForm(val.trimLeft(), 'name');
                  }}
                />
                <Input
                  style={styles.paddingBottom}
                  placeholder="Email Address"
                  keyboardType="email-address"
                  onChangeText={(val) => {
                    setForm(val.trimLeft(), 'email');
                  }}
                />
                <Select
                  style={[styles.select, styles.paddingBottom]}
                  placeholder="Select reason"
                  accessoryRight={ArrowDownIcon}
                  value={reasons[form.reason.row]}
                  selectedIndex={form.reason}
                  onSelect={(index) => {
                    console.log(index);
                    setForm(index, 'reason');
                  }}>
                  {reasons.map((reason, index) => (
                    <SelectItem key={index + ''} title={reason} />
                  ))}
                </Select>
                <Input
                  style={styles.paddingBottom}
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
                      reason: reasons[form.reason.row],
                    };
                    console.log('Sending', data);
                    makeRequest(data);
                  }}>
                  {status === 'pending' ? 'SENDING...' : 'SEND REQUEST'}
                </Button>
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
            </Layout>
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
