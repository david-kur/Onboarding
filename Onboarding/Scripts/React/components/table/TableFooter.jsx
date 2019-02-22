import React from 'react';
import { Select, Pagination } from 'semantic-ui-react';

class TableFooter extends React.Component {
  constructor(props) {
    super(props);
    this.rowsPerPageChanged = this.rowsPerPageChanged.bind(this);
    this.pageChanged = this.pageChanged.bind(this);
  }

  rowsPerPageChanged(event, data) {
    this.props.onRowsPerPageChanged(data);
  }

  pageChanged(event, data) {
    this.props.onPageChanged(data);
  }

  render() {
    const { rowsDropdown, activePage, totalPages } = this.props;
    return (
      <React.Fragment>
        <div>
          <Select compact options={rowsDropdown} onChange={this.rowsPerPageChanged} defaultValue={rowsDropdown[0].value} />
        </div>

        <div className="ui right floated pagination menu">
          <Pagination
            activePage={activePage}
            boundaryRange={1}
            siblingRange={1}
            totalPages={totalPages}
            onPageChange={this.pageChanged}
            ellipsisItem={undefined}
            firstItem={null}
            lastItem={null}
            prevItem={null}
            nextItem={null}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default TableFooter;