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

const LogsFilter = () => {
  const [range, setRange] = useState({
    startDate: moment().toDate(),
    endDate: moment().toDate(),
  });

  const styles = useStyleSheet(themedStyles);
  return (
    <Layout>
      <Layout style={styles.row}>
        <Layout style={[styles.column, styles.firstColumn]}>
          <Select
            placeholder="All Projects"
            selectedIndex={0}
            onSelect={index => console.log(index)}
            accessoryRight={ArrowDownIcon}>
            <SelectItem title="Option 1" />
            <SelectItem title="Option 2" />
            <SelectItem title="Option 3" />
          </Select>
        </Layout>
        <Layout style={[styles.column, styles.secondColumn]}>
          <Select
            placeholder="All Tasks"
            selectedIndex={0}
            onSelect={index => console.log(index)}
            accessoryRight={ArrowDownIcon}>
            <SelectItem title="Option 1" />
            <SelectItem title="Option 2" />
            <SelectItem title="Option 3" />
          </Select>
        </Layout>
      </Layout>
      <Layout style={styles.row}>
        <RangeDatepicker
          style={styles.dateRange}
          placeholder="Date Range"
          range={range}
          onSelect={nextRange => setRange(nextRange)}
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
  column: {
    width: '50%',
  },
  firstColumn: {
    paddingRight: 8,
  },
  secondColumn: {
    paddingLeft: 8,
  },
  dateRange: {
    width: '100%',
  },
});

export default LogsFilter;
