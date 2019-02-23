import React from 'react';
import _ from 'lodash';
import { Table } from 'semantic-ui-react';
import TableHeader from './table/TableHeader';
import TableBody from './table/TableBody';
import TableFooter from './table/TableFooter';
import InputModal from './modal/InputModal';
import DeleteModal from './modal/DeleteModal';
import { paginate } from './tools/paginate';

class ListingTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceList: null,
      serviceName: null,
      columnHead: null,
      populateHead: null,
      rowsPerPage: 5,
      activePage: 1,
      sortBy: { column: 'Id', order: 'asc' }
    };

    this.rowsDropdown = [
      { value: 5, text: '5' },
      { value: 10, text: '10' },
      { value: 20, text: '20' },
    ];

    this.loadData = this.loadData.bind(this);
    this.submitData = this.submitData.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handlePageChanged = this.handlePageChanged.bind(this);
    this.handleRowsPerPageChanged = this.handleRowsPerPageChanged.bind(this);
    this.handleNewButtonClicked = this.handleNewButtonClicked.bind(this);
    this.handleEditButtonClicked = this.handleEditButtonClicked.bind(this);
    this.handleDeleteButtonClicked = this.handleDeleteButtonClicked.bind(this);
    this.InputModalRef = this.InputModalRef.bind(this);
    this.DeleteModalRef = this.DeleteModalRef.bind(this);
  }

  loadData() {
    const { serviceName, columnHead, populateHead } = this.props;
    let Url = '/' + serviceName + '/Get' + serviceName;
    $.ajax({
      url: Url,
      method: 'GET',
      contentType: 'application/json',
      success: function (response) {
        this.setState({
          serviceList: response, activePage: 1,
          sortBy: { column: 'Id', order: 'asc' },
          serviceName, columnHead, populateHead,
        });
      }.bind(this),
      error: function (err) {
        alert('ERROR!');
        console.log(err);
      }
    });
  }

  submitData(mode, data) {
    const { serviceName } = this.state;
    let Url = '/' + serviceName + '/' + mode + serviceName;
    $.ajax({
      url: Url,
      method: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: function (response) {
        alert('SUCCESS');
        this.loadData();
      }.bind(this),
      error: function (err) {
        alert('ERROR!');
        console.log(err);
      }
    });
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.serviceName !== this.props.serviceName) {
      this.loadData();
    }
  }

  InputModalRef({ show }) {
    this.showInputModal = show;
  }

  handleNewButtonClicked(add) {
    const { columnHead, populateHead } = this.state;
    if (!populateHead) {
      this.showInputModal(add, columnHead);
    } else this.showInputModal(add, populateHead);
  }

  handleEditButtonClicked(add, data) {
    const { columnHead, populateHead } = this.state;
    if (!populateHead) {
      this.showInputModal(add, columnHead, data);
    } else this.showInputModal(add, populateHead, data);
  }

  DeleteModalRef({ show }) {
    this.showDeleteModal = show;
  }
  handleDeleteButtonClicked(data) {
    this.showDeleteModal(data);
  }

  handleSort(sortBy) {
    this.setState({ sortBy });
  }

  handlePageChanged(data) {
    this.setState({ activePage: data.activePage });
  }

  handleRowsPerPageChanged(data) {
    this.setState({ rowsPerPage: data.value, activePage: 1 });
  }

  render() {
    const { serviceList, serviceName, columnHead, rowsPerPage, activePage, sortBy } = this.state;

    if (!serviceList) return <p>Loading...</p>;
    const count = serviceList.length;
    if (count === 0) return <p>There are no data</p>;

    let headers = "";
    for (let i = 0; i < count; i++) {
      headers = Object.keys(serviceList[i]);
    }

    const headersDisplayed = headers.filter(h => h.indexOf('Id') == -1);
    const totalPages = Math.ceil(count / rowsPerPage);

    const sorted = _.orderBy(serviceList, [sortBy.column], [sortBy.order]);
    const tableData = paginate(sorted, activePage, rowsPerPage);

    return (
      <React.Fragment>
        <div>
          <button className="ui primary button" onClick={this.handleNewButtonClicked.bind(this, true)}>
            {`New ${serviceName}`}
          </button>
        </div>

        <InputModal ref={this.InputModalRef} onConfirm={this.submitData} serviceName={serviceName} />
          <DeleteModal ref={this.DeleteModalRef} onConfirm={this.submitData} serviceName={serviceName} />

        <div className="ui basic segment">
          <Table sortable celled striped fixed>

            <TableHeader headersDisplayed={headersDisplayed} onSort={this.handleSort} sortBy={sortBy} />

            <TableBody
              columnHead={columnHead}
              tableData={tableData}
              editButtonClicked={this.handleEditButtonClicked}
              deleteButtonClicked={this.handleDeleteButtonClicked}
            />

          </Table>

          <TableFooter
            rowsDropdown={this.rowsDropdown}
            activePage={activePage}
            totalPages={totalPages}
            onPageChanged={this.handlePageChanged}
            onRowsPerPageChanged={this.handleRowsPerPageChanged}
          />

        </div>
      </React.Fragment>
    );
  }
};

export default ListingTable;