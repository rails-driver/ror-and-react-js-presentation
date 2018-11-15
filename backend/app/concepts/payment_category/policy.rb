# Describes access to operations. Is used by base operation class.
class PaymentCategory::Policy < ApplicationPolicy

  def create?
    federation?
  end

end
