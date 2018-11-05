# Ruby on Rail and React.js presentation

Code presentation of "Payment categories" feature.

Please start exploring by entering [frontend/containers/App/Settings/PaymentCategories/index.js](https://github.com/rails-driver/ror-and-react-js-presentation/blob/master/frontend/containers/App/Settings/PaymentCategories/index.js).

## Frontend

##### [SettingsPaymentCategories](https://github.com/rails-driver/ror-and-react-js-presentation/blob/master/frontend/containers/App/Settings/PaymentCategories/index.js)

All root pages on the projects extend `Container` base class. That's done to encapsulate base project UI structure and reuse code.

`Container` works using IoC (Inversion of Control) approach. It renders the code inside project default template, but also allows to override some parts (like breadcrumbs, wrapper class etc.).

##### [PaymentCategoryForm](https://github.com/rails-driver/ror-and-react-js-presentation/blob/master/frontend/components/payment-categories/payment-category-form.js)

Reusable component with form for creating and updating payment category.

##### [FormModal](https://github.com/rails-driver/ror-and-react-js-presentation/blob/master/frontend/components/modals/form.js)

Component which shows project forms in a modal window. Locate form in modal body and submit button in modal footer.


## Backend

##### [PaymentCategory::Operation::Create](https://github.com/rails-driver/ror-and-react-js-presentation/blob/master/backend/app/concepts/payment_category/operation/create.rb)

All actions in the project are written in operation classes. All routine CRUD are encapsulated in base operation classes.

`PaymentCategory::Operation::Create` describes fields which are handled by a base operation which creates new payment category in database.

##### [PaymentCategory::Policy](https://github.com/rails-driver/ror-and-react-js-presentation/blob/master/backend/app/concepts/payment_category/policy.rb)

Access permissions for operations are described in `Policy` classes when operation is needed to be forbidden for some reasons.

##### [PaymentCategory::Presenter](https://github.com/rails-driver/ror-and-react-js-presentation/blob/master/backend/app/concepts/payment_category/presenter.rb)

Describes how `PaymentCategory` model should be represented in response JSON.
