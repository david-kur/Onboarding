import React from 'react';
import ListingTable from './ListingTable';

class Products extends React.Component {
  render() {
    const columnHead = [
      { name: 'Name', type: 'text' },
      { name: 'Price', type: 'money' },
    ];
    const populateHead = null;
    const serviceName = "Product";
    return (
      <ListingTable serviceName={serviceName} columnHead={columnHead} populateHead={populateHead} />
    );
  }
}

export default Products;