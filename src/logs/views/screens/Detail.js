import React, {useState} from 'react';
import {SafeAreaView, KeyboardAvoidingView, ScrollView} from 'react-native';
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
  Autocomplete,
  AutocompleteItem,
} from '@ui-kitten/components';
import {useForm, useValidated} from '../../../weosHelpers';
import {AlertIcon, ClockIcon} from '../../../views/components/Icons';
import DetailTopBar from '../components/DetailTopBar';

export default ({navigation, route, getTasks}) => {
  const styles = useStyleSheet(themedStyles);

  const log = {};
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

  const tasks = getTasks();
  const [data, setData] = useState(tasks);

  const onSubmit = () => {
    console.log('Submitting form', form);
    setValid(form, valid);

    const section = route.params?.section;
    navigation.goBack();
  };

  const selectTask = index => {
    setForm(tasks[index].title, 'title');
    clearValid();
  };

  const renderTaskOption = (item, index) => (
    <AutocompleteItem key={index} title={item.title} />
  );

  const filter = (item, query) =>
    item.title.toLowerCase().includes(query.toLowerCase());

  const onChangeTask = query => {
    setForm(query.trimLeft(), 'title');
    clearValid();
    setData(tasks.filter(task => filter(task, query)));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <DetailTopBar navigation={navigation} title="Time Log" />
        <ScrollView>
          <Layout style={styles.form}>
            <Autocomplete
              testID="TaskTitle"
              label="Entry Title"
              value={form.title}
              placeholder="Enter text for entry here"
              style={styles.input}
              tatus={!valid.title && 'danger'}
              captionIcon={!valid.title && AlertIcon}
              caption={!valid.title && 'Title cannot be blank'}
              onSelect={selectTask}
              onChangeText={onChangeTask}>
              {data.map(renderTaskOption)}
            </Autocomplete>
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
                  onSelect={index => {
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
