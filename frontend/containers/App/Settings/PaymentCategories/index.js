import React from 'react';
import { connect } from 'helpers';
import Container from 'container';
import { PaymentCategory } from 'resources';

import { FaButton } from 'components/utilities';
import Table, { Column } from 'components/table';
import { ConfirmModal, FormModal } from 'components/modals';

import { PaymentCategoryForm } from 'components/payment-categories';

// Render algorithm is encapsulated in Container class.
// Children classes can override only some parts of rendering keeping all routine in base class.
class SettingsPaymentCategories extends Container {

  // Set title for page header
  header = 'Payment Categories'

  // Set sidebar item to render as active
  sidebarItem = 'Settings'

  // Register resource so base class can build query, retrieve data and set them in into resource list
  resources = {
    list: PaymentCategory,
  }

  // GraphQL query needed to retrieve only required for current page data
  listQuery = `
    payment_category {
      title
      minimum_donation
      expiration
      weight
    }
  `

  // Authorization scope for resource query. Container class build auth scope for query using this property
  listScope = 'federation'

  // Makes the base class render some action buttons on the top of the page
  headerActions = () => ([
    {
      message: 'Create category',
      icon: 'plus',
      modal: 'Form:create',
    },
  ])

  // Describes messages to show when resource query return empty list
  emptyState = () => ({
    message: 'No categories have been created yet',
    action: 'Create category',
    modal: 'Form:create',
  })

  // Commands how to sort resource query result
  sortListBy = ({ weight }) => weight

  // Renders modal windows for each item from resource query result
  mapListToModals = (category) => (
    <div key={category.id}>
      {/* Render modal for category editing */}
      <FormModal
        id={category.id}
        // Specify form to be wrapped by FormModal component
        form={PaymentCategoryForm}
        modalTitle="Update payment category"
        modalSubmitText="Update category"
        // Some extra props which will be redirected to PaymentCategoryForm component
        federationId={this.context.user.federation.id}
        paymentCategory={category}
        onSuccess={this.onCategoryUpdate}
        action="update"
      />

      {/* Render model to delete category using reusable ConfirmModal component */}
      <ConfirmModal
        id={category.id}
        prompt={`Are you sure you want to delete the ${category.title} category?`}
        yes="delete it"
        onConfirm={this.doCategoryArchive(category.id)}
      />
    </div>
  )

  onCategoryCreate = ({ data }) => {
    // Merges created category with resource list and showing success message
    this.listAddAndNotify({
      data,
      message: `${data.title} has been added!`,
    });
  }

  onCategoryUpdate = ({ data }) => {
    // Replaces old category with new in resource list and showing success message
    this.listReplaceAndNotify({
      data,
      message: `${data.title} has been updated!`,
    });
  }

  // Renders common for all page modals in the right place on the page. Handled by Container class
  renderObjectModals = () => {
    const { user } = this.context;

    return (
      // Renders modal for category creating
      <FormModal
        id="create"
        // Specifies a form to be wrapped by FormModal component
        form={PaymentCategoryForm}
        modalTitle="New payment category"
        modalSubmitText="Create category"
        // Some extra props which will be redirected to PaymentCategoryForm component
        federationId={user.federation.id}
        onSuccess={this.onCategoryCreate}
        action="create"
      />
    );
  }

  // Renders the table with resource list in the right place on the page. Handled by Container class
  renderTable = () => {
    const categories = this.getList();

    return (
      // A helper to render the table
      <Table
        // Name of csv file resource list will be exported in
        csvName="PaymentCategories"
        // Sets data to be rendered in table
        data={categories}
      >

        {/* A helper for describing table structure */}
        <Column
          width={30}
          value="title"
        >
          Category title
        </Column>

        <Column
          width={20}
          actions
        >
          <FaButton
            icon="pencil"
            bsSize="sm"
            onClick={this.openModal('Form')}
          />

          <FaButton
            icon="trash"
            bsSize="sm"
            onClick={this.openModal('Confirm')}
          />

        </Column>

      </Table>
    );
  }
}

export default connect(SettingsPaymentCategories);
