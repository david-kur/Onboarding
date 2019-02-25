import React from 'react';
import Navbar from './Navbar';
import ListingTable from './ListingTable';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      serviceName: 'Customer',
      columnHead: [
        { name: 'Name', type: 'text' },
        { name: 'Address', type: 'text' },
      ],
      populateHead: null,
    };
    this.selectedService = this.selectedService.bind(this);
    this.menuItems = ['Customers', 'Products', 'Stores', 'Sales'];
  }

  selectedService(name) {
    let columnHead, populateHead, serviceName = null;
    switch (name) {
      case 'Products':
        serviceName = "Product";
        columnHead = [
          { name: 'Name', type: 'text' },
          { name: 'Price', type: 'money' },
        ];
        break;
      case 'Stores':
        serviceName = "Store";
        columnHead = [
          { name: 'Name', type: 'text' },
          { name: 'Address', type: 'text' },
        ];
        break;
      case 'Sales':
        serviceName = "Sales";
        columnHead = [
          { name: 'Customer', type: 'text' },
          { name: 'Product', type: 'text' },
          { name: 'Store', type: 'text' },
          { name: 'DateSold', type: 'date' },
        ];
        populateHead = [
          { name: 'DateSold', type: 'date' },
          { name: 'CustomerId', type: 'dropdown' },
          { name: 'ProductId', type: 'dropdown' },
          { name: 'StoreId', type: 'dropdown' },
        ];
        break;
      default:
        serviceName = "Customer";
        columnHead = [
          { name: 'Name', type: 'text' },
          { name: 'Address', type: 'text' },
        ];
    }
    this.setState({ serviceName, columnHead, populateHead });
  }

  render() {
    const { serviceName, columnHead, populateHead } = this.state;
    return (
      <React.Fragment>

        <Navbar
          header="React"
          onSelectedItem={this.selectedService}
          menuItems={this.menuItems}
        />

        <ListingTable
          serviceName={serviceName}
          columnHead={columnHead}
          populateHead={populateHead}
        />

      </React.Fragment >
    )
  }
}

export default App;
