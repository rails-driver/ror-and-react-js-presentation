import React from 'react';
import { modal } from 'helpers';

import { Row, Modal } from 'react-bootstrap';
import { SubmitButton } from 'components/form';

const { func, string } = React.PropTypes;

// FormModal shows forms in a modal window. Contains form is a modal body and submit button in modal footer.
// This component is needed to render form fields in modal body but form submit button in modal footer
class FormModal extends React.Component {

  // props validation helps to find errors during developing
  static propTypes = {
    form: func.isRequired,
    modalTitle: string.isRequired,
    modalSubmitText: string.isRequired,
  }

  // Render header, body and footer using bootstrap helpers. All resulting content will be wrapped into form tag
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
    // All options not needed for FormModal component will be redirected to Form component
    const formOptions = _.omit(this.props, ['show', 'form', 'modalTitle', 'modalSubmitText']);

    return (
      <Modal show={show} onHide={actions.closeModal}>
        <Form {...formOptions} fieldsWrapper={this.renderFormModalBody} />
      </Modal>
    );
  }

}

export default modal('Form', FormModal);
