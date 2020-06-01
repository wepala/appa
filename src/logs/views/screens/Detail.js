import React, {useState} from 'react';
import moment from 'moment';
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

export default ({navigation, route, getTasks, onSave, getLog, onUpdate}) => {
  const styles = useStyleSheet(themedStyles);
  const logId = route.params?.id;
  const log = getLog(logId);
  const timeOfDay = ['AM', 'PM'];
  const today = moment();
  const currentTime = today.format('hh:mm:A').split(':');
  const timeOfDayIndex = timeOfDay.indexOf(currentTime[2]);
  const [form, setForm, setMultipleValues] = useForm({
    title: log.task.title,
    taskId: log.taskId,
    hours: log.hours || currentTime[0],
    minutes: log.minutes || currentTime[1],
    timeOfDay: new IndexPath(timeOfDayIndex),
  });
  const [valid, setValid, clearValid] = useValidated(form, {
    title: true,
    hours: true,
    minutes: true,
    timeOfDay: true,
    taskId: true,
  });

  const tasks = getTasks();
  const [data, setData] = useState(tasks);

  const onSubmit = () => {
    setValid(form, valid);
    if (!form.taskId || !form.title) {
      setValid(valid, {taskId: false});
      return;
    }

    form.hours = form.hours ? form.hours : today.hours();
    form.minutes = form.minutes ? form.minutes : today.minutes();
    let meridiem = form.timeOfDay.row ? 0 : 1;
    let startTime = moment(
      `${form.hours} ${form.minutes} ${timeOfDay[form.timeOfDay.row]}`,
      `h mm ${timeOfDay[meridiem]}`,
    );

    if (!startTime.isValid()) {
      setValid(valid, {hours: false, minutes: false});
      return;
    }

    startTime = startTime.format();

    if (log.id) {
      onUpdate(log.id, form.taskId, startTime).then(() => navigation.goBack());
    } else {
      onSave(form.taskId, startTime).then(() => navigation.goBack());
    }
  };

  const selectTask = (index) => {
    let task = tasks[index];
    setMultipleValues({
      taskId: task.id,
      title: task.title,
    });

    clearValid();
  };

  const renderTaskOption = (item, index) => (
    <AutocompleteItem key={index} title={item.title} />
  );

  const filter = (item, query) =>
    item.title.toLowerCase().includes(query.toLowerCase());

  const onBlurTask = () => {
    const title = form.title;

    if (!form.taskId) {
      let task = tasks.find((item) =>
        item.title.toLowerCase().includes(title.toLowerCase()),
      );

      if (task) {
        setMultipleValues({
          taskId: task.id,
          title: task.title,
        });
      }
    }
  };

  const onChangeTask = (query) => {
    setForm(query.trimLeft(), 'title');
    setData(tasks.filter((task) => filter(task, query)));
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
              style={styles.autocomplete}
              status={!valid.taskId && 'danger'}
              captionIcon={!valid.taskId && AlertIcon}
              caption={!valid.taskId && 'Provide a valid task'}
              onSelect={selectTask}
              onChangeText={onChangeTask}
              onBlur={onBlurTask}>
              {data.map(renderTaskOption)}
            </Autocomplete>
            <Layout style={styles.row}>
              <Layout style={[styles.column, styles.columnFirst]}>
                <Input
                  testID="LoggedHour"
                  style={styles.input}
                  label="Hour"
                  value={form.hours}
                  status={!valid.hours && 'danger'}
                  captionIcon={!valid.hours && AlertIcon}
                  caption={!valid.hours && 'Provide valid hour'}
                  placeholder="12"
                  keyboardType="numeric"
                  maxLength={2}
                  clearButtonMode="unless-editing"
                  onChangeText={(val) => setForm(val.trimLeft(), 'hours')}
                />
              </Layout>
              <Layout style={[styles.column, styles.columnSecond]}>
                <Input
                  testID="LoggedMinute"
                  style={styles.input}
                  label="Minute"
                  value={form.minutes}
                  status={!valid.minutes && 'danger'}
                  captionIcon={!valid.minutes && AlertIcon}
                  caption={!valid.minutes && 'Provide valid minutes'}
                  placeholder="30"
                  keyboardType="numeric"
                  maxLength={2}
                  clearButtonMode="unless-editing"
                  onChangeText={(val) => setForm(val.trimLeft(), 'minutes')}
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
  autocomplete: {
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
