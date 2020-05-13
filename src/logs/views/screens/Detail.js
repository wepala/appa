import React, {createRef} from 'react';
import {useForm, useValidated} from '../../../weosHelpers';
import {
  Text,
  Button,
  Datepicker,
  Divider,
  Input,
  Layout,
  StyleService,
  Select,
  SelectItem,
  useStyleSheet,
  IndexPath,
} from '@ui-kitten/components';
import {
  AlertIcon,
  CalendarIcon,
  ClockIcon,
} from '../../../views/components/Icons';
import DetailTopBar from '../components/DetailTopBar';
import {SafeAreaView, KeyboardAvoidingView, ScrollView} from 'react-native';

export default ({navigation, route}) => {
  const styles = useStyleSheet(themedStyles);
  const id = route.params?.id;

  const onSubmit = () => {
    const section = route.params?.section;
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <DetailTopBar navigation={navigation} />
        <ScrollView>
          <Layout style={styles.form}>
            <Input
              testID="TaskTitle"
              style={styles.input}
              label="Task Title"
              placeholder="Enter title here"
            />
            <Layout style={styles.row}>
              <Layout style={styles.column1}>
                <Input
                  testID="TaskEstTime"
                  style={styles.input}
                  label="Estimated Time"
                  placeholder="30"
                  keyboardType="numeric"
                />
              </Layout>
              <Layout style={styles.column2} />
            </Layout>
            <Divider />

            <Layout style={styles.buttonGroup}>
              <Button
                status="basic"
                style={styles.buttonCancel}
                size="giant"
                Cancel
                onPress={() => navigation.goBack()}>
                Cancel
              </Button>
              <Button
                testID="SubmitButton"
                style={styles.buttonSubmit}
                size="giant"
                onPress={onSubmit}>
                Submit
              </Button>
            </Layout>
          </Layout>

          <Layout />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: '$background-basic-color-1',
  },
  form: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  column1: {
    flexShrink: 0,
    width: '30%',
    flexBasis: 'auto',
    marginRight: 16,
  },
  column2: {
    flexGrow: 1,
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
