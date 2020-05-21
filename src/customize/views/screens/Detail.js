import React from 'react';
import {
  Button,
  Layout,
  StyleService,
  Input,
  Select,
  SelectItem,
  useStyleSheet,
  Text,
  IndexPath,
} from '@ui-kitten/components';
import {QuestionIcon, PaperPlaneIcon} from '../../../views/components/Icons';
import DetailTopBar from '../components/DetailTopBar';
import {SafeAreaView} from 'react-native';

export default ({navigation, route}) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <SafeAreaView style={styles.container}>
      <DetailTopBar title="Appa Modification Request" navigation={navigation} />
      <Layout style={styles.container}>
        <Layout style={styles.row}>
          <Layout style={styles.column}>
            <Input placeholder="Appa Lappa" label="Your name" />
          </Layout>
        </Layout>
        <Layout style={styles.row}>
          <Layout style={styles.column}>
            <Input placeholder="agenda@appa.com" label="Email Address" />
          </Layout>
        </Layout>
        <Layout style={styles.row}>
          <Layout style={styles.column}>
            <Select placeholder="Select reason" accessoryRight={QuestionIcon}>
              <SelectItem title="Bug" />
              <SelectItem title="Feature" />
            </Select>
          </Layout>
        </Layout>
        <Layout style={styles.row}>
          <Layout style={styles.column}>
            <Input
              placeholder="agenda@appa.com"
              label="Type your message"
              multiline={true}
              numberOfLines={10}
            />
          </Layout>
        </Layout>
        <Layout style={styles.row}>
          <Layout style={styles.column}>
            <Button status="success" accessoryRight={PaperPlaneIcon}>
              Send Request
            </Button>
          </Layout>
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: '$background-basic-color-1',
    padding: 16,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  column: {
    flexGrow: 1,
  },
  column2: {
    flexGrow: 0,
  },

  buttonGroup: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonCancel: {
    flexBasis: 'auto',
    flexShrink: 0,
    marginRight: 16,
  },
  buttonSubmit: {
    flexGrow: 1,
  },
});
