import React, {useState} from 'react';
import moment from 'moment';
import {
  Layout,
  Select,
  SelectItem,
  RangeDatepicker,
  useStyleSheet,
  StyleService,
} from '@ui-kitten/components';
import {CalendarIcon, ArrowDownIcon} from '../../../views/components/Icons';

const LogsFilter = ({tasks, onSetFilters}) => {
  const [range, setRange] = useState({
    startDate: moment().toDate(),
    endDate: moment().toDate(),
  });

  const [selectedTaskIndex, setSelectedTaskIndex] = useState();

  const renderTaskOption = (task) => (
    <SelectItem key={task.id} title={task.title} />
  );

  const taskTitle =
    (tasks.length && selectedTaskIndex && tasks[selectedTaskIndex.row].title) ||
    '';

  const onSelectTask = (index) => {
    setSelectedTaskIndex(index);
    const startTime = moment(range.startDate).format('YYYY-MM-DD');
    const endTime = moment(range.endDate).format('YYYY-MM-DD');
    onSetFilters(startTime, endTime, tasks[index.row].id);
  };

  const setDateRange = (dateRange) => {
    setRange(dateRange);
    const startDate = moment(dateRange.startDate).format('YYYY-MM-DD');
    const endDate = moment(dateRange.endDate).format('YYYY-MM-DD');
    const taskId =
      selectedTaskIndex && tasks.length
        ? tasks[selectedTaskIndex.row].id
        : undefined;
    onSetFilters(startDate, endDate, taskId);
  };

  const styles = useStyleSheet(themedStyles);
  return (
    <Layout style={styles.container}>
      <Layout style={styles.row}>
        <Select
          testID={'SelectTask'}
          value={taskTitle}
          style={styles.tasksSelect}
          placeholder="All Tasks"
          onSelect={onSelectTask}
          accessoryRight={ArrowDownIcon}>
          {tasks.map(renderTaskOption)}
        </Select>
      </Layout>
      <Layout style={styles.row}>
        <RangeDatepicker
          testID="DateRange"
          style={styles.dateRange}
          placeholder="Date Range"
          range={range}
          onSelect={setDateRange}
          accessoryRight={CalendarIcon}
        />
      </Layout>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  row: {
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  tasksSelect: {
    width: '100%',
  },
  dateRange: {
    width: '100%',
  },
});

export default LogsFilter;
