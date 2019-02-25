import React from 'react';
import { Form, Dropdown } from 'semantic-ui-react';
import '../tools/date.format.js';

class InputModalContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      populate: null,
      input: '',
      error: '',
    };
    this.populateDropdown = this.populateDropdown.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // Populate data for dropdown type input
  populateDropdown() {
    let Url = '/Sales/GetSalesPopulate';
    $.ajax({
      url: Url,
      method: 'GET',
      contentType: 'application/json',
      success: function (response) {
        this.setState({ populate: response });
      }.bind(this),
      error: function (error) {
        alert('ERROR!');
        console.log(error);
      }
    });
  }

  // Handle on input change for controlled element
  handleChange({ target }, dropdownValue) {
    const { head, onInputChanged } = this.props;
    let error = '';
    const inputName = head.type === 'dropdown' ? dropdownValue.name : target.name;
    let inputValue = head.type === 'dropdown' ? dropdownValue.value : target.value;

    if (inputValue == '') {
      error = inputName + ' is required';
      onInputChanged(inputName, null)
    }
    else onInputChanged(inputName, inputValue);

    this.setState({ input: inputValue, error });
  }


  // Component did mount
  componentDidMount() {
    const { head, inputValue } = this.props;
    if (head.type === 'dropdown') { this.populateDropdown(); }
    this.setState({ input : inputValue[head.name] });
  }


  // Render function
  render() {
    const { add, head, inputValue } = this.props;
    const { populate, error } = this.state;
    let defaultValue = "";

    switch (head.type) {

      // Date input type
      case 'date':
        let date = new Date();
        if (!add) date = new Date(parseInt(inputValue[head.name].substr(6)));
        else date = new Date();
        defaultValue = date.format("yyyy-mm-dd");

        return (
          <React.Fragment>
            <h4>{head.name}</h4>
            <div>
              <input name={head.name} type="date" min="1900-01-01"
                defaultValue={defaultValue}
                value={this.state.input[head.name]}
                onChange={this.handleChange} />
            </div>
          </React.Fragment>
        );
        break;

      // Dropdown input type
      case 'dropdown':
        if (!populate) return <p>Loading...</p>;
        let headDisplayedName = head.name.slice(0, -2);
        let defaultName = "";

        let options = populate[headDisplayedName].map(item => {
          if (!add && (item.Name == inputValue[headDisplayedName])) defaultName = item.Name;
          let opt = {};
          opt['key'] = item.Id;
          opt['value'] = item.Id;
          opt['text'] = item.Name;
          return opt;
        });

        return (
          <React.Fragment>
            <h4>{headDisplayedName}</h4>
            <Dropdown onChange={(e, { name, value }) => this.handleChange(e, { name, value })}
              options={options}
              placeholder={defaultName}
              selection
              value={this.state.input[head.name]}
              name={head.name}
            />
          </React.Fragment>
        );
        break;

      // Default or text input type
      default:
        if (!add) defaultValue = inputValue[head.name];
        else defaultValue = "";

        return (
          <React.Fragment>
            <h4>{head.name}</h4>
            <div className="ui fluid input">
              <input type={head.type} name={head.name} defaultValue={defaultValue}
                value={this.state.input[head.name]} onChange={this.handleChange} />
            </div>
            {error && <div className="ui pointing red basic label">{error}</div>}
          </React.Fragment>
        );
    };
  }
}

export default InputModalContent;