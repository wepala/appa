import React from 'react';
import {Layout, Select, SelectItem} from '@ui-kitten/components';
import {FilterIcon} from '../../../views/components/Icons';

const LogsFilter = () => {
  return (
    <Layout>
      <Select
        selectedIndex={0}
        onSelect={index => console.log(index)}
        accessoryRight={FilterIcon}>
        <SelectItem title="Option 1" />
        <SelectItem title="Option 2" />
        <SelectItem title="Option 3" />
      </Select>
    </Layout>
  );
};

export default LogsFilter;
