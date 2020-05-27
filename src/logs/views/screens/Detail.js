import React from 'react';
import {useForm, useValidated} from '../../../weosHelpers';

import {
  Button,
  Divider,
  Input,
  Layout,
  StyleService,
  useStyleSheet,
  Select,
  SelectItem,
  IndexPath,
} from '@ui-kitten/components';
import {AlertIcon, ClockIcon} from '../../../views/components/Icons';
import DetailTopBar from '../components/DetailTopBar';
import {SafeAreaView, KeyboardAvoidingView, ScrollView} from 'react-native';

export default ({navigation, route}) => {
  const styles = useStyleSheet(themedStyles);
  const id = route.params?.id;

  const log = {};
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const timeOfDay = ['AM', 'PM'];
  const [form, setForm] = useForm({
    title: log.title,
    hour: log.hour,
    minute: log.minute,
    timeOfDay: new IndexPath(0),
  });
  const [valid, setValid, clearValid] = useValidated(form, {
    title: true,
    hour: true,
    minute: true,
    timeOfDay: true,
  });

  const onSubmit = () => {
    console.log('Submitting form', form);
    setValid(form, valid);

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
              clearButtonMode="unless-editing"
              onChangeText={(val) => {
                setForm(val.trimLeft(), 'title');
                clearValid();
              }}
              status={!valid.title && 'danger'}
              captionIcon={!valid.title && AlertIcon}
              caption={!valid.title && 'Title cannot be blank'}
            />
            <Layout style={styles.row}>
              <Layout style={[styles.column, styles.columnFirst]}>
                <Input
                  testID="LoggedHour"
                  style={styles.input}
                  label="Hour"
                  placeholder="12"
                  keyboardType="numeric"
                  maxLength={2}
                  clearButtonMode="unless-editing"
                />
              </Layout>
              <Layout style={[styles.column, styles.columnSecond]}>
                <Input
                  testID="LoggedMinute"
                  style={styles.input}
                  label="Minute"
                  placeholder="30"
                  keyboardType="numeric"
                  maxLength={2}
                  clearButtonMode="unless-editing"
                />
              </Layout>
              <Layout style={[styles.column, styles.columnThird]}>
                <Select
                  testID="LoggedAMPM"
                  style={styles.input}
                  label=" "
                  accessoryRight={ClockIcon}
                  value={timeOfDay[form.timeOfDay.row]}
                  selectedIndex={form.timeOfDay}
                  clearButtonMode="unless-editing"
                  onSelect={(index) => {
                    console.log(form.timeOfDay.row);
                    setForm(index, 'timeOfDay');
                  }}>
                  {timeOfDay.map((unit, index) => (
                    <SelectItem key={index + ''} title={unit} />
                  ))}
                </Select>
              </Layout>
            </Layout>
            <Divider />

            <Layout style={styles.buttonGroup}>
              <Button
                testID="CancelButton"
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
    width: '100%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  column: {
    flex: 1,
  },
  columnFirst: {
    marginRight: 8,
  },
  columnSecond: {
    marginLeft: 8,
    marginRight: 8,
  },
  columnThird: {
    marginLeft: 8,
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
