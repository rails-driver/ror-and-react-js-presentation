import React from 'react';
import { PaymentCategory } from 'resources';
import { Radio } from 'react-bootstrap';
import { Form, Field } from 'components/form';

const { func, number, oneOf, shape, string } = React.PropTypes;

class PaymentCategoryForm extends React.Component {

  // props validation helps to find errors during developing
  static propTypes = {
    federationId: number.isRequired,
    onSuccess: func.isRequired,
    fieldsWrapper: func,
    paymentCategory: shape({
      id: number,
      title: string,
      minimum_donation: number,
    }),
    action: oneOf(['create', 'update']).isRequired,
  }

  render() {
    const { federationId, action, fieldsWrapper } = this.props;
    const paymentCategory = this.props.paymentCategory || {};

    return (
      // props validation helps to find errors during developing
      <Form
        // Resource id is needed to generate query to the backend
        id={paymentCategory.id}
        // Extra payload to be sent on the backend, it will be merged with data from inputs
        data={{
          payment_category: {
            federation_id: federationId,
          },
        }}
        // Retrieve only data which are needed using GraphQL query
        query={`
            payment_category {
              title
              minimum_donation
              expiration
            }
          `}
        // All API calls are encapsulated in resource helpers
        action={PaymentCategory[action]}
        // Bumble success event up to parent component
        onSuccess={this.props.onSuccess}
        // Wrap form fields into a React component. Is needed to reuse form on regular page and on modal window.
        // Modal window has few sections "header", "body" and "footer" and without wrapper it's impossible to render
        // form fields in "body" section and form submit button in "footer" section.
        fieldsWrapper={fieldsWrapper}
      >
        {/* Is a helper to render input tag with label */}
        <Field
          // Input label text
          label="Category title"
          // Input field name
          name="payment_category.title"
          defaultValue={paymentCategory.title}
          // Set order for TAB click
          tabIndex={1}
          // Set custom size in bootstrap cols for label
          labelSize={4}
          // Focuses on this input on component render
          autoFocus
        />

        <Field
          label="Minimum donation amount"
          name="payment_category.minimum_donation"
          // A hint for showing on mouse over
          hint="Leave blank for no minimum"
          defaultValue={paymentCategory.minimum_donation}
          tabIndex={2}
          labelSize={4}
          // Render input styled for money
          money
        />

        <Field
          label="Designation expiration"
          labelSize={4}
        >
          {/* Helper from bootstrap-react */}
          <Radio
            name="payment_category.expiration"
            value=""
            defaultChecked={!paymentCategory.expiration}
          >
            There is no expiration date, or this donation category isn't a designation.
          </Radio>
          <Radio
            name="payment_category.expiration"
            value="1mo"
            defaultChecked={paymentCategory.expiration === '1mo'}
          >
            1 month
          </Radio>
          <Radio
            name="payment_category.expiration"
            value="1yr"
            defaultChecked={paymentCategory.expiration === '1yr'}
          >
            1 year
          </Radio>
          <Radio
            name="payment_category.expiration"
            value="5yr"
            defaultChecked={paymentCategory.expiration === '5yr'}
          >
            5 years
          </Radio>
        </Field>
      </Form>
    );
  }
}

export default PaymentCategoryForm;
