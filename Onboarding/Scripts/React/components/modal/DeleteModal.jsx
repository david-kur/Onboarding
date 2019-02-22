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

  show(data) { this.setState({ open: true, data }) }

  hide() { this.setState({ open: false }) }

  confirm() {
    this.props.onConfirm('Delete', this.state.data);
    this.hide();
  }

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