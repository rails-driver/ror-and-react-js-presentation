# All routine related with base CRUD are encapsulated in base class so not to be copy pasted.
# Operation classes can be the following way `PaymentCategory::Operation::Create.(params)`.
class PaymentCategory::Operation::Create < Operation::Create

  # Describes model field and validation
  property :title

  property :minimum_donation,
    validation: :positive_amount?,
    allow_nil: true

  property :expiration,
    validation: PaymentCategory::EXPIRATION_TYPES,
    allow_nil: true

  property :federation_id

  # Describes model for PaymentCategory::Policy class
  policy_model Federation

end
