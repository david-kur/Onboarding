import React from 'react';
import { Table } from 'semantic-ui-react';
import TableItemRow from './TableItemRow';

class TableBody extends React.Component {

  onEditClick(item) {
    this.props.editButtonClicked(false, item);
  }

  onDeleteClick(item) {
    this.props.deleteButtonClicked(item);
  }

  render() {
    const { tableData, columnHead } = this.props;
    return (
      <Table.Body>
        {tableData.map(item => (
          <Table.Row key={item.Id}>
            <TableItemRow item={item} columns={columnHead} />
            <Table.Cell>
              <button className="ui yellow button" onClick={this.onEditClick.bind(this, item)}>
                <i className="write icon"></i>EDIT
            </button>
            </Table.Cell>
            <Table.Cell>
              <button className="ui red button" onClick={this.onDeleteClick.bind(this, item)}>
                <i className="trash icon"></i>DELETE
            </button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    );
  }
}

export default TableBody;