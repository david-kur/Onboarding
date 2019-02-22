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
    };
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.confirm = this.confirm.bind(this);
    this.handleValidationPassed = this.handleValidationPassed.bind(this);
  }

  handleValidationPassed(status) {
    if (status) this.setState({ disableConfirmButton: false })
    else this.setState({ disableConfirmButton: true })
  }

  show(add, inputHead, inputValue) {
    this.setState({ isOpen: true, add, inputHead, inputValue });
  }

  hide() { this.setState({ isOpen: false }); }

  confirm() {
    const { inputHead, inputValue } = this.state;
    let data = {};
    let mode = 'Add';
    if (!this.state.add) {
      data.Id = inputValue.Id;
      mode = 'Update';
    }
    inputHead.map(head => {
      let selector = '#' + head.name;
      data[head.name] = $(selector).val();
    });
    this.props.onConfirm(mode, data);
    this.hide();
  }

  render() {
    const { serviceName } = this.props;
    let { add, isOpen, inputHead, inputValue, disableConfirmButton } = this.state;
    let modalHeaderName = "Create " + serviceName;
    let modalButtonConfirmName = "Create";
    if (!add) {
      modalHeaderName = "Edit " + serviceName;
      modalButtonConfirmName = "Edit";
    }
    if (!inputHead) return <p></p>;

    return (
      <Modal dimmer='blurring' open={isOpen} size="tiny">
        <Modal.Header>{modalHeaderName}</Modal.Header>
        <Modal.Content>
          <Form>
            {
              inputHead.map(head => (
                <InputModalContent key={head.name} add={add} head={head} inputValue={inputValue}
                  onValidationPassed={this.handleValidationPassed} />
              ))
            }
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