import React, {useState} from 'react';
import moment from 'moment';
import {
  Layout,
  Select,
  SelectItem,
  RangeDatepicker,
  useStyleSheet,
  StyleService,
  IndexPath,
} from '@ui-kitten/components';
import {CalendarIcon, ArrowDownIcon} from '../../../views/components/Icons';

const LogsFilter = ({tasks, setFilters}) => {
  const [range, setRange] = useState({
    startDate: moment(),
    endDate: moment(),
  });

  const [selectedTaskIndex, setSelectedTaskIndex] = useState(new IndexPath(0));

  const renderTaskOption = (task) => (
    <SelectItem key={task.id} title={task.title} />
  );

  const filter = {
    task: tasks[selectedTaskIndex.row],
  };

  const onSelectTask = (index) => {
    setSelectedTaskIndex(index);
    const startTime = range.startDate//.format('YYYY-MM-DD');
    const endTime = range.startDate//.format('YYYY-MM-DD');
    setFilters(startTime, endTime, tasks[index.row].id);
  };

  const styles = useStyleSheet(themedStyles);
  return (
    <Layout>
      <Layout style={styles.row}>
        <Select
          testID={'SelectTask'}
          value={filter.task.title}
          style={styles.tasksSelect}
          placeholder="All Tasks"
          selectedIndex={0}
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
          onSelect={(nextRange) => setRange(nextRange)}
          accessoryRight={CalendarIcon}
        />
      </Layout>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  row: {
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tasksSelect: {
    width: '100%',
  },
  dateRange: {
    width: '100%',
  },
});

export default LogsFilter;
