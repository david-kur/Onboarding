import React from 'react';
import { Menu } from 'semantic-ui-react';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: this.props.menuItems[0] };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
    this.props.onSelectedItem(name);
  }

  render() {
    return (
      <React.Fragment>
        <Menu inverted>
          <Menu.Item header><h2>{this.props.header}</h2></Menu.Item>
          {
            this.props.menuItems.map(item =>
              <Menu.Item key={item} name={item}
                active={this.state.activeItem === item} onClick={this.handleItemClick} />
            )
          }
        </Menu>
      </React.Fragment>
    );
  }
}

export default Navbar;