import React from 'react';
import { Form } from 'semantic-ui-react';
import '../tools/date.format.js';

class InputModalContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      populate: null,
      input: {
        Name: '',
        Address: '',
        Price: '',
        //DateSold: '',
        CustomerId: '',
        ProductId: '',
        StoreId: '',
      },
      error: {},
    };
    this.populateDropdown = this.populateDropdown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
  }

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

  validate(target, name) {
    if (target.value.trim() === '') return name + ' is required';
  }

  handleChange({ target }, name) {
    const { error, input } = this.state;
    const { onValidationPassed } = this.props;
    const errorMessage = this.validate(target, name);

    if (errorMessage) error[name] = errorMessage;
    else delete error[name];

    input[name] = target.value;
    this.setState({ input, error });

    if (Object.keys(error).length === 0) onValidationPassed(true);
    else onValidationPassed(false);

  }

  componentDidMount() {
    const { head, inputValue, onValidationPassed } = this.props;

    if (head.type == 'dropdown') { this.populateDropdown(); }
    const input = this.state.input;

    if (inputValue === undefined) {
      input[head.name] = ''
      onValidationPassed(false);
    } else {
      input[head.name] = inputValue[head.name];
      onValidationPassed(true);
    }
    this.setState({ input });
  }

  render() {
    const { add, head, inputValue } = this.props;
    const { populate, error } = this.state;
    let defaultValue = "";

    switch (head.type) {

      case 'date':
        let date = new Date();
        if (!add) date = new Date(parseInt(inputValue[head.name].substr(6)));
        let newDate = date.format("yyyy-mm-dd");
        return (
          <React.Fragment>
            <h4>{head.name}</h4>
            <div>
              <input id={head.name} type="date" min="1900-01-01" defaultValue={newDate} />
            </div>
          </React.Fragment>
        );
        break;

      case 'dropdown':
        if (!populate) return <p>Loading...</p>;
        let headDisplayedName = head.name.slice(0, -2);

        populate[headDisplayedName].map(item => {
          if (!add) {
            if (item.Name == inputValue[headDisplayedName]) defaultValue = item.Id;
          } else defaultValue = 1;
        });
        return (
          <Form.Group>
            <Form.Field id={head.name} label={headDisplayedName} defaultValue={defaultValue} control="select" width="10"
              onChange={(e) => this.handleChange(e, head.name)}>
              {populate[headDisplayedName].map(item => <option key={item.Id} value={item.Id}>{item.Name}</option>)}
            </Form.Field>
          </Form.Group>
        );
        break;

      default:
        if (!add) defaultValue = inputValue[head.name];
        return (
          <React.Fragment>
            <h4>{head.name}</h4>
            <div className="ui fluid input">
              <input id={head.name} label={head.name} type={head.type}
                value={this.state.input[head.name]} onChange={(e) => this.handleChange(e, head.name)} />
            </div>
            {error[head.name] && <div>{error[head.name]}</div>}
          </React.Fragment>
        );
    };
  }
}

export default InputModalContent;