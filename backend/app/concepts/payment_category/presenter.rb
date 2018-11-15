# Describes serialization for model. Is used by GraphQL parser.
class PaymentCategory::Presenter < ApplicationPresenter

  # Allows to serialize +title+ field from model
  field :title

  field :minimum_donation

  field :expiration

end
