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
  Text,
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
  const [form, setForm] = useForm({
    title: task.title,
    timeEstimate: parseInt(task.estimatedTime / 60, 10) || '',
    timeUnit: new IndexPath(0),
    description: task.description,
    dueDate: new Date(task.dueDate),
  });
  const [valid, setValid, clearValid] = useValidated(form, {
    title: true,
    timeEstimate: true,
    description: true,
    dueDate: true,
  });

  const onSubmit = () => {
    const section = route.params?.section;
    setValid(form, valid);
    console.log('Submitting', form);
    if (valid.title) {
      console.log('UPDATING\n\n');
      if (task.id) {
        onUpdate(
          navigation,
          task,
          form.title,
          form.description,
          form.dueDate,
          task.agendas,
        ).then(() => navigation.goBack());
      } else {
        console.log('NEW TASK\n\n');

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
              onChangeText={(val) => {
                setForm(val.trimLeft(), 'title');
                clearValid();
              }}
              status={!valid.title && 'danger'}
              caption={!valid.title && 'Please enter task title'}
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
                  onChangeText={(val) => {
                    setForm(val.trimLeft(), 'timeEstimate');
                    clearValid();
                  }}
                />
              </Layout>
              <Layout style={styles.column2}>
                <Select
                  accessoryRight={ClockIcon}
                  label="  "
                  value={timeUnits[form.timeUnit.row]}
                  style={styles.input}
                  selectedIndex={form.timeUnit}
                  onSelect={(index) => {
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
              onChangeText={(val) => setForm(val.trimLeft(), 'description')}
            />
            <Datepicker
              testID="TaskDueDate"
              style={styles.input}
              accessoryRight={CalendarIcon}
              label="Due Date"
              clearButtonMode="unless-editing"
              date={form.dueDate}
              ref={datePicker}
              onSelect={(val) => {
                setForm(val, 'dueDate');
                datePicker.current.blur();
              }}
            />

            <Layout style={styles.buttonGroup}>
              <Button
                status="basic"
                appearance="outline"
                style={styles.buttonCancel}
                size="giant"
                onPress={() => navigation.goBack()}>
                CANCEL
              </Button>
              <Button
                testID="SubmitButton"
                style={styles.buttonSubmit}
                size="giant"
                onPress={onSubmit}>
                OK
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
    backgroundColor: '#edf8ff',
  },
  form: {
    flex: 1,
    padding: 16,
    backgroundColor: 'transparent',
  },
  input: {
    marginBottom: 24,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  column1: {
    flexShrink: 0,
    width: '30%',
    flexBasis: 'auto',
    marginRight: 16,
    backgroundColor: 'transparent',
  },
  column2: {
    flexGrow: 1,
    backgroundColor: 'transparent',
  },

  buttonGroup: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  buttonCancel: {
    paddingTop: 10,
    paddingBottom: 6,
    paddingHorizontal: 4,
    width: '40%',
    marginRight: 16,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  buttonSubmit: {
    paddingTop: 10,
    paddingBottom: 6,
    paddingHorizontal: 4,
    flexGrow: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    elevation: 5,
  },
});
