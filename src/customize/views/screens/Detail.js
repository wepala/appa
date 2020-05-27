import React, {useContext, useState} from 'react';
import {SafeAreaView} from 'react-native';
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
} from '@ui-kitten/components';
import {ArrowDownIcon} from '../../../views/components/Icons';
import DetailTopBar from '../components/DetailTopBar';
import {RequestContext} from '../../../weosHelpers';

export default ({navigation, route}) => {
  const {status, makeRequest} = useContext(RequestContext);
  const [form, setForm] = useState({
    name: '',
    email: '',
    reason: '',
    details: '',
  });
  const styles = useStyleSheet(themedStyles);
  return (
    <SafeAreaView style={styles.container}>
      <DetailTopBar title="Appa Modification Request" navigation={navigation} />
      <LinearGradient
        colors={['#b0d9ff', '#eff9ff']}
        style={styles.linearGradient}>
        <Text category="h1" style={styles.title}>
          Appa Modification Request
        </Text>
        <Layout style={styles.row}>
          <Layout style={styles.column}>
            <Input style={styles.paddingBottom} placeholder="Your name" />
            <Input style={styles.paddingBottom} placeholder="Email Address" />
            <Select
              style={[styles.select, styles.paddingBottom]}
              placeholder="Select reason"
              accessoryRight={ArrowDownIcon}>
              <SelectItem title="Bug" />
              <SelectItem title="Feature" />
            </Select>
            <Input
              style={styles.paddingBottom}
              placeholder="Type your message"
              multiline={true}
              numberOfLines={10}
            />
            <Button
              size="large"
              style={styles.buttonSend}
              onPress={() => makeRequest(form)}>
              SEND REQUEST
            </Button>
          </Layout>
        </Layout>
      </LinearGradient>
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  row: {
    display: 'flex',
    flex: 1,
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
