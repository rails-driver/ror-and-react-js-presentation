class PaymentCategory::Policy < ApplicationPolicy

  def create?
    federation?
  end

end
