import React from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import InputModalContent from './InputModalContent';

class InputModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      add: true,
      inputHead: null,
      inputValue: null,
      disableConfirmButton: true,
      error: {},
    };
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.confirm = this.confirm.bind(this);
    this.handleInputChanged = this.handleInputChanged.bind(this);
  }


  // Validation on input change
  handleInputChanged(name, value) {
    const { inputHead, inputValue, error } = this.state;

    inputValue[name] = value;
    if (!value) error[name] = true;
    else error[name] = false;

    this.setState({ inputValue, error });

    let errorCount = 0;
    inputHead.map(head => {
      if (error[head.name] || error[head.name] === undefined) errorCount++;
    });

    if (errorCount == 0) this.setState({ disableConfirmButton: false });
    else this.setState({ disableConfirmButton: true });
  }


  // Show modal
  show(add, inputHead, inputValue) {
    this.setState({ isOpen: true, add, inputHead, inputValue });
    let input = {};
    const { error } = this.state;

    inputHead.map(head => {
      if (!add) error[head.name] = false;
      else input[head.name] = '';
    })
    if (add) this.setState({ inputValue: input });
    else this.setState({ disableConfirmButton: true });
  }


  // Hide modal
  hide() {
    this.setState({ disableConfirmButton: true });
    this.setState({ isOpen: false });
  }


  // Confirmation button clicked
  confirm() {
    const { add, inputHead, inputValue } = this.state;
    let data = {};
    let mode = 'Add';
    if (!add) {
      data.Id = inputValue.Id;
      mode = 'Update';
    }
    inputHead.map(head => data[head.name] = inputValue[head.name]);
    this.props.onConfirm(mode, data);
    this.setState({ disableConfirmButton: true });
    this.hide();
  }


  // Render function
  render() {
    const { serviceName } = this.props;
    let { add, isOpen, inputHead, inputValue, disableConfirmButton } = this.state;
    let modalHeaderName = "Create " + serviceName;
    let modalButtonConfirmName = "Create";
    if (!add) {
      modalHeaderName = "Edit " + serviceName;
      modalButtonConfirmName = "Edit";
    }
    if (!inputHead) return <p>Loading...</p>;

    return (
      <Modal dimmer='blurring' open={isOpen} size="tiny">
        <Modal.Header>{modalHeaderName}</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              {
                inputHead.map(head => (
                  <InputModalContent key={head.name} add={add} head={head} inputValue={inputValue}
                    onInputChanged={this.handleInputChanged} />
                ))
              }
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={this.hide}>Cancel</Button>
          <Button disabled={disableConfirmButton} onClick={this.confirm}
            positive icon="checkmark" labelPosition="right" content={modalButtonConfirmName} />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default InputModal;