import React from 'react';
import { modal } from 'helpers';

import { Row, Modal } from 'react-bootstrap';
import { SubmitButton } from 'components/form';

const { func, string } = React.PropTypes;

class FormModal extends React.Component {

  static propTypes = {
    form: func.isRequired,
    modalTitle: string.isRequired,
    modalSubmitText: string.isRequired,
  }

  renderFormModalBody = ({ children }) => {
    const { modalSubmitText, modalTitle } = this.props;

    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <hr className="spacer-xs" />

          {children}
        </Modal.Body>
        <Modal.Footer>
          <Row>
            <SubmitButton offset={5} tabIndex={3}>
              {modalSubmitText}
            </SubmitButton>
          </Row>
        </Modal.Footer>
      </div>
    );
  }

  render() {
    const { show, actions, form: Form } = this.props;
    const formOptions = _.omit(this.props, ['show', 'form', 'modalTitle', 'modalSubmitText']);

    return (
      <Modal show={show} onHide={actions.closeModal}>
        <Form {...formOptions} fieldsWrapper={this.renderFormModalBody} />
      </Modal>
    );
  }

}

export default modal('Form', FormModal);
