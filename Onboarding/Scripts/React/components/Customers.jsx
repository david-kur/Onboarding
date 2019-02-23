import React from 'react';
import ListingTable from './ListingTable';

class Customers extends React.Component {
  render() {
    const columnHead = [
      { name: 'Name', type: 'text' },
      { name: 'Address', type: 'text' },
    ];
    const populateHead = null;
    const serviceName = "Customer";
    return (
      <ListingTable serviceName={serviceName} columnHead={columnHead} populateHead={populateHead} />
    );
  }
}

export default Customers;