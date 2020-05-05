import React, {useState} from 'react';
import {useForm} from '../../model/hooks';
import {
  Button,
  Datepicker,
  Divider,
  Input,
  Layout,
  StyleService,
  View,
  Select,
  SelectItem,
  useStyleSheet,
  IndexPath,
} from '@ui-kitten/components';
import {CalendarIcon, ClockIcon} from '../../../views/components/Icons';
import DetailTopBar from '../components/DetailTopBar';
import {SafeAreaView, KeyboardAvoidingView, ScrollView} from 'react-native';

export default ({navigation, route, tasks, onCreate, onUpdate}) => {
  const {itemId} = route.params;
  const task =
    tasks[itemId] !== undefined
      ? tasks[itemId]
      : {
          title: '',
          description: '',
          dueDate: '',
        };

  const styles = useStyleSheet(themedStyles);

  const [title, setTitle] = useState(task.title);
  const [timeEstimate, setTimeEstimate] = useState('10');
  const [timeUnit, setTimeUnit] = useState(0);
  const [project, setProject] = useState('Test Project');
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);

  const timeUnits = ['Minutes', 'Hours'];
  const [form, setForm] = useForm({
    title: '',
    timeEstimate: '15',
    timeUnit: new IndexPath(0),
    project: 'Project X',
    description: 'A great task!',
    dueDate: '',
  });

  const [show, toggleShow] = useState(false);

  const onSubmit = () => {
    if (task.id === undefined) {
      onCreate(navigation, title, description, dueDate);
    } else {
      onUpdate(navigation, task.id, title, description, dueDate);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <DetailTopBar navigation={navigation} />
        <ScrollView>
          <Layout style={styles.form}>
            <Input
              style={styles.input}
              label="Task Title"
              placeholder="Enter title here"
              value={form.title}
              onChangeText={val => setForm(val, 'title')}
            />
            <Layout style={styles.row}>
              <Layout style={styles.column1}>
                <Input
                  style={styles.input}
                  label="Estimated Time"
                  placeholder="30"
                  keyboardType="numeric"
                  value={form.timeEstimate}
                  onChangeText={val => setForm(val, 'timeEstimate')}
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
                  {timeUnits.map(unit => (
                    <SelectItem title={unit} />
                  ))}
                </Select>
              </Layout>
            </Layout>
            <Input
              style={styles.input}
              multiline={true}
              placeholder=""
              label="Description"
              value={form.description}
              onChangeText={val => setForm(val, 'description')}
            />
            <Datepicker
              style={styles.input}
              accessoryRight={CalendarIcon}
              label="Due Date"
              date={form.dueDate}
              onSelect={val => {
                setForm(val, 'dueDate');
              }}
            />
            <Divider />

            <Layout style={styles.buttonGroup}>
              <Button
                status="basic"
                style={styles.buttonCancel}
                size="giant"
                Cancel
                onPress={() => console.log('Cancelled')}>
                Cancel
              </Button>
              <Button
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
