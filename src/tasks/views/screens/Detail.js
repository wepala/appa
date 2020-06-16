import React, {createRef, useContext, useState} from 'react';
import moment from 'moment';
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
import {SectionContext} from '../../context/section-context';

export default ({navigation, route, getTask, onSave, onUpdate, onRemove}) => {
  const styles = useStyleSheet(themedStyles);
  const id = route.params?.id;
  const section = useContext(SectionContext).section;
  const [submitStatus, setSubmitStatus] = useState(false);

  let task = getTask(id) || {
    title: '',
    description: '',
    dueDate: moment().toDate(),
    completed: true,
    agendas: [],
  };

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
    dueDate: new Date(task.dueDate),
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

      setSubmitStatus(true);
    }
  };

  const datePicker = createRef();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <DetailTopBar
          navigation={navigation}
          route={route}
          section={section}
          onRemove={onRemove}
        />
        <ScrollView>
          <Layout style={styles.form}>
            <Input
              testID="TaskTitle"
              size="large"
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
                  size="large"
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
                  size="large"
                  style={[styles.input, styles.unit]}
                  status="basic"
                  accessoryRight={ClockIcon}
                  label="  "
                  value={timeUnits[form.timeUnit.row]}
                  selectedIndex={form.timeUnit}
                  onSelect={(index) => {
                    setForm(index, 'timeUnit');
                  }}>
                  {timeUnits.map((unit, index) => (
                    <SelectItem size="large" key={index + ''} title={unit} />
                  ))}
                </Select>
              </Layout>
            </Layout>
            <Input
              size="large"
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
              size="large"
              status="basic"
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
                disabled={submitStatus}
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
    backgroundColor: '$background-basic-color-2',
  },
  form: {
    flex: 1,
    padding: 16,
    backgroundColor: 'transparent',
  },
  input: {
    marginBottom: 24,
  },
  unit: {},
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
    width: '40%',
    marginRight: 16,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  buttonSubmit: {
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
