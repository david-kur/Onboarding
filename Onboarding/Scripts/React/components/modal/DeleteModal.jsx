import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

class DeleteModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false, data: null };
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  // Show modal
  show(data) { this.setState({ open: true, data }) }

  // Hide modal
  hide() { this.setState({ open: false }) }

  // Confirmation button clicked
  confirm() {
    this.props.onConfirm('Delete', this.state.data);
    this.hide();
  }

  // Render function
  render() {
    const { serviceName } = this.props;
    const modalHeaderName = "Delete " + serviceName;
    const modalDescriptionText = "Are you sure?";

    return (
      <React.Fragment>
        <Modal dimmer='blurring' open={this.state.open} size="tiny">
          <Modal.Header>{modalHeaderName}</Modal.Header>
          <Modal.Content>{modalDescriptionText}</Modal.Content>
          <Modal.Actions>
            <Button color="black" onClick={this.hide} content="Cancel" />
            <Button color="red" onClick={this.confirm} content="Delete" icon="x" labelPosition="right" />
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    )
  }
}

export default DeleteModal;