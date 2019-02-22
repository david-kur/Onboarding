import React from 'react';
import { Table } from 'semantic-ui-react';

class TableHeader extends React.Component {
  constructor(props) {
    super(props);
    this.sortHeader = this.sortHeader.bind(this);
    this.showSortIcon = this.showSortIcon.bind(this);
  }

  sortHeader(clickedColumn) {
    const { sortBy, onSort } = this.props;
    if (sortBy.column === clickedColumn)
      sortBy.order = (sortBy.order === 'asc') ? 'desc' : 'asc';
    else {
      sortBy.column = clickedColumn;
      sortBy.order = 'asc';
    }
    onSort(sortBy);
  }

  showSortIcon(header) {
    const { sortBy } = this.props;
    if (header !== sortBy.column ) return <i className="disabled sort icon"></i>
    if (sortBy.order === 'asc') return <i className="sort up icon"></i>;
    return <i className="sort down icon"></i>;
  }

  render() {
    return (
      <Table.Header>
        <Table.Row>
          {this.props.headersDisplayed.map(header =>
            <Table.HeaderCell key={header} onClick={this.sortHeader.bind(this, header)}>
              {header} {this.showSortIcon(header)}
            </Table.HeaderCell>
          )}
          <Table.HeaderCell>
            Actions
          </Table.HeaderCell>
          <Table.HeaderCell>
            Actions
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    );
  }
}

export default TableHeader;