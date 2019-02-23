import React from 'react';
import { Menu } from 'semantic-ui-react';
import ListingTable from './components/ListingTable';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      activeItem: 'Customers',
      serviceName: 'Customer',
      columnHead: [
        { name: 'Name', type: 'text' },
        { name: 'Address', type: 'text' },
      ],
      populateHead: null,
    };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, { name }) {
    let columnHead = null;
    let populateHead = null;
    let serviceName= "";
    switch (name) {
      case 'Products':
        columnHead = [
          { name: 'Name', type: 'text' },
          { name: 'Price', type: 'money' },
        ];
        populateHead = null;
        serviceName = "Product";
        break;
      case 'Stores':
        columnHead = [
          { name: 'Name', type: 'text' },
          { name: 'Address', type: 'text' },
        ];
        populateHead = null;
        serviceName = "Store";
        break;
      case 'Sales':
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
        serviceName = "Sales";
        break;
      default:
        columnHead = [
          { name: 'Name', type: 'text' },
          { name: 'Address', type: 'text' },
        ];
        populateHead = null;
        serviceName = "Customer";
    }
    this.setState({ activeItem: name, serviceName, columnHead, populateHead });
  }

  render() {
    const { activeItem, serviceName, columnHead, populateHead } = this.state;
    return (
      <React.Fragment>
          <Menu inverted>
            <Menu.Item header><h2>React</h2></Menu.Item>

            <Menu.Item name='Customers'
              active={activeItem === 'Customers'}
              onClick={this.handleItemClick}
            />
            <Menu.Item name='Products'
              active={activeItem === 'Products'}
              onClick={this.handleItemClick}
            />
            <Menu.Item name='Stores'
              active={activeItem === 'Stores'}
              onClick={this.handleItemClick}
            />
            <Menu.Item name='Sales'
              active={activeItem === 'Sales'}
              onClick={this.handleItemClick}
            />
          </Menu>

        <ListingTable serviceName={serviceName} columnHead={columnHead} populateHead={populateHead} />
      </React.Fragment >
    )
  }
}

export default App;
