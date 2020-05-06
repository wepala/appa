import React, {useState} from 'react';
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
} from '@ui-kitten/components';
import {CalendarIcon, ClockIcon} from '../../../views/components/Icons';
import DetailTopBar from '../components/DetailTopBar';
import {SafeAreaView, KeyboardAvoidingView, ScrollView} from 'react-native';

export default ({navigation, route, getTask, onSave, section}) => {
  const styles = useStyleSheet(themedStyles);
  const id = route.params?.id;
  const task = getTask(id);
  const [title, setTitle] = useState(task.title);
  const [timeEstimate, setTimeEstimate] = useState('10');
  const [timeUnit, setTimeUnit] = useState(0);
  const [project, setProject] = useState('Test Project');
  const [description, setDescription] = useState(task.description);

  const [dueDate, setDueDate] = useState(task.dueDate);
  const [show, toggleShow] = useState(false);

  const onSubmit = () => {
    const section = route.params?.section;
    onSave(title, description, dueDate, section === 'agenda').then(() =>
      navigation.goBack(),
    );
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
              value={title}
              onChangeText={setTitle}
            />
            <Layout style={styles.row}>
              <Layout style={styles.column1}>
                <Input
                  style={styles.input}
                  label="Estimated Time"
                  placeholder="30"
                  onChangeText={setTimeEstimate}
                  keyboardType="numeric"
                  value={timeEstimate}
                />
              </Layout>
              <Layout style={styles.column2}>
                <Select
                  accessoryRight={ClockIcon}
                  label="  "
                  style={styles.input}
                  selectedIndex={timeUnit}
                  onSelect={setTimeUnit}>
                  <SelectItem title="Minutes" />
                  <SelectItem title="Hours" />
                </Select>
              </Layout>
            </Layout>
            <Input
              style={styles.input}
              multiline={true}
              placeholder=""
              label="Description"
              onChangeText={setDescription}
              value={description}
            />
            <Datepicker
              style={styles.input}
              accessoryRight={CalendarIcon}
              label="Due Date"
              date={dueDate}
              onSelect={date => {
                setDueDate(date);
                toggleShow(false);
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
