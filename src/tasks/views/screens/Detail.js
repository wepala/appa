import React, {createRef} from 'react';
import {useForm, useValidated} from '../../../weosHelpers';
import {
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

export default ({navigation, route, getTask, onSave, onUpdate}) => {
  const styles = useStyleSheet(themedStyles);
  const id = route.params?.id;
  const section = route.params?.section;
  const task = getTask(id);

  const timeUnits = ['minutes', 'hours'];
  // Convert estimated time from seconds to either minutes/hours
  let estimatedTime, timeUnit;
  if (id) {
    estimatedTime =
      task.estimatedTime % 3600 === 0
        ? parseInt(task.estimatedTime / 3600, 10)
        : parseInt(task.estimatedTime / 60, 10);
    timeUnit =
      task.estimatedTime % 3600 === 0 ? new IndexPath(1) : new IndexPath(0);
  }

  const [form, setForm] = useForm({
    title: task.title,
    timeEstimate: id ? estimatedTime : '',
    timeUnit: id ? timeUnit : new IndexPath(0),
    description: task.description,
    dueDate: task.dueDate,
  });
  const [valid, setValid, clearValid] = useValidated(form, {
    title: true,
    timeEstimate: true,
    description: true,
    dueDate: true,
  });

  const onSubmit = () => {
    setValid(form, valid);
    if (valid.title) {
      if (task.id) {
        let estimatedTime =
          timeUnits[form.timeUnit.row] === 'minutes'
            ? form.timeEstimate * 60
            : form.timeEstimate * 60 * 60;
        onUpdate(
          navigation,
          task,
          form.title,
          form.description,
          form.dueDate,
          estimatedTime,
          true, // Add to backlog or agendas
        );
      } else {
        onSave(
          form.title,
          form.description,
          form.dueDate,
          section === 'agenda',
          form.timeEstimate,
          timeUnits[form.timeUnit.row],
        ).then(() => navigation.goBack());
      }
    }
  };

  const datePicker = createRef();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <DetailTopBar navigation={navigation} route={route} section={section} />
        <ScrollView>
          <Layout style={styles.form}>
            <Input
              testID="TaskTitle"
              style={styles.input}
              label="Task Title"
              placeholder="Enter title here"
              clearButtonMode="unless-editing"
              value={form.title}
              onChangeText={val => {
                setForm(val.trimLeft(), 'title');
                clearValid();
              }}
              status={!valid.title && 'danger'}
              captionIcon={!valid.title && AlertIcon}
              caption={!valid.title && 'Title cannot be blank'}
            />
            <Layout style={styles.row}>
              <Layout style={styles.column1}>
                <Input
                  testID="TaskEstTime"
                  style={styles.input}
                  label="Estimated Time"
                  placeholder="30"
                  keyboardType="numeric"
                  value={`${form.timeEstimate}`}
                  onChangeText={val => {
                    setForm(val.trimLeft(), 'timeEstimate');
                    clearValid();
                  }}
                  status={!valid.timeEstimate && 'danger'}
                  captionIcon={!valid.timeEstimate && AlertIcon}
                  caption={
                    !valid.timeEstimate && 'Estimated time cannot be empty'
                  }
                />
              </Layout>
              <Layout style={styles.column2}>
                <Select
                  accessoryRight={ClockIcon}
                  label="  "
                  value={timeUnits[form.timeUnit.row]}
                  style={styles.input}
                  selectedIndex={form.timeUnit}
                  onSelect={index => {
                    console.log(form.timeUnit.row);
                    setForm(index, 'timeUnit');
                  }}>
                  {timeUnits.map((unit, index) => (
                    <SelectItem key={index + ''} title={unit} />
                  ))}
                </Select>
              </Layout>
            </Layout>
            <Input
              testID="TaskDescription"
              style={styles.input}
              multiline={true}
              placeholder=""
              label="Description"
              clearButtonMode="unless-editing"
              value={form.description}
              onChangeText={val => setForm(val.trimLeft(), 'description')}
            />
            <Datepicker
              testID="TaskDueDate"
              style={styles.input}
              accessoryRight={CalendarIcon}
              label="Due Date"
              clearButtonMode="unless-editing"
              date={form.dueDate}
              ref={datePicker}
              onSelect={val => {
                setForm(val, 'dueDate');
                datePicker.current.blur();
              }}
            />
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
