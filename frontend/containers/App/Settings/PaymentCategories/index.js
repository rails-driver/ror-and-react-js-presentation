import React from 'react';
import { connect } from 'helpers';
import Container from 'container';
import { PaymentCategory } from 'resources';

import { FaButton } from 'components/utilities';
import Table, { Column } from 'components/table';
import { ConfirmModal, FormModal } from 'components/modals';

import { PaymentCategoryForm } from 'components/payment-categories';

class SettingsPaymentCategories extends Container {

  header = 'Payment Categories'
  sidebarItem = 'Settings'

  resources = {
    list: PaymentCategory,
  }

  listQuery = `
    payment_category {
      title
      minimum_donation
      expiration
      weight
    }
  `

  listScope = 'federation'

  headerActions = () => ([
    {
      message: 'Create category',
      icon: 'plus',
      modal: 'Form:create',
    },
  ])

  emptyState = () => ({
    message: 'No categories have been created yet',
    action: 'Create category',
    modal: 'Form:create',
  })

  sortListBy = ({ weight }) => weight

  mapListToModals = (category) => (
    <div key={category.id}>
      <FormModal
        id={category.id}
        form={PaymentCategoryForm}
        modalTitle="Update payment category"
        modalSubmitText="Update category"
        federationId={this.context.user.federation.id}
        paymentCategory={category}
        onSuccess={this.onCategoryUpdate}
        action="update"
      />

      <ConfirmModal
        id={category.id}
        prompt={`Are you sure you want to delete the ${category.title} category?`}
        yes="delete it"
        onConfirm={this.doCategoryArchive(category.id)}
      />
    </div>
  )

  onCategoryCreate = ({ data }) => {
    this.listAddAndNotify({
      data,
      message: `${data.title} has been added!`,
    });
  }

  onCategoryUpdate = ({ data }) => {
    this.listReplaceAndNotify({
      data,
      message: `${data.title} has been updated!`,
    });
  }

  renderObjectModals = () => {
    const { user } = this.context;

    return (
      <FormModal
        id="create"
        form={PaymentCategoryForm}
        modalTitle="New payment category"
        modalSubmitText="Create category"
        federationId={user.federation.id}
        onSuccess={this.onCategoryCreate}
        action="create"
      />
    );
  }

  renderTable = () => {
    const categories = this.getList();

    return (
      <Table
        csvName="PaymentCategories"
        data={categories}
      >

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
