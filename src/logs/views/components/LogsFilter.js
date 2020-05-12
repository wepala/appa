import React from 'react';
import {
  Layout,
  Select,
  SelectItem,
  Datepicker,
  useStyleSheet,
  StyleService,
} from '@ui-kitten/components';
import {CalendarIcon, ArrowDownIcon} from '../../../views/components/Icons';

const LogsFilter = () => {
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
        <Layout style={[styles.column, styles.firstColumn]}>
          <Datepicker placeholder="Start Date" accessoryRight={CalendarIcon} />
        </Layout>
        <Layout style={[styles.column, styles.secondColumn]}>
          <Datepicker placeholder="End Date" accessoryRight={CalendarIcon} />
        </Layout>
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
});

export default LogsFilter;
