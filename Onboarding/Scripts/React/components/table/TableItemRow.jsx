import React from 'react';
import { Table } from 'semantic-ui-react';
import '../tools/date.format.js';

const TableItemRow = props => {
  const { item, columns } = props;
  return columns.map(column => {
    switch (column.type) {
      case 'date':
        let date = new Date(parseInt(item[column.name].substr(6)));
        let newDate = date.format("dd mmm, yyyy");
        return <Table.Cell key={column.name}>{newDate}</Table.Cell>;
        break;
      case 'money':
        return <Table.Cell key={column.name}>${item[column.name]}</Table.Cell>;
        break;
      default:
        return <Table.Cell key={column.name}>{item[column.name]}</Table.Cell>;
    }
  });
}

export default TableItemRow;