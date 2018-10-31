import React from 'react';
import { PaymentCategory } from 'resources';
import { Radio } from 'react-bootstrap';
import { Form, Field } from 'components/form';

const { func, number, oneOf, shape, string } = React.PropTypes;

class PaymentCategoryForm extends React.Component {

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
      <Form
        id={paymentCategory.id}
        data={{
          payment_category: {
            federation_id: federationId,
          },
        }}
        query={`
            payment_category {
              title
              minimum_donation
              expiration
            }
          `}
        action={PaymentCategory[action]}
        onSuccess={this.props.onSuccess}
        fieldsWrapper={fieldsWrapper}
      >
        <Field
          label="Category title"
          name="payment_category.title"
          defaultValue={paymentCategory.title}
          tabIndex={1}
          labelSize={4}
          autoFocus
        />

        <Field
          label="Minimum donation amount"
          name="payment_category.minimum_donation"
          hint="Leave blank for no minimum"
          defaultValue={paymentCategory.minimum_donation}
          tabIndex={2}
          labelSize={4}
          money
        />

        <Field
          label="Designation expiration"
          labelSize={4}
        >
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
