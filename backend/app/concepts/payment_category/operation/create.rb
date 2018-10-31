class PaymentCategory::Operation::Create < Operation::Create

  property :title

  property :minimum_donation,
    validation: :positive_amount?,
    allow_nil: true

  property :expiration,
    validation: PaymentCategory::EXPIRATION_TYPES,
    allow_nil: true

  property :federation_id

  policy_model Federation

end
