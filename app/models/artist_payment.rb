class ArtistPayment < ActiveRecord::Base
  belongs_to :certification
  validates :date, :artist_name, :name, :fee_category_id, :amount, :check_no, presence: true
  validates :check_no, uniqueness: { scope: :certification_id }
  validates :check_no, :amount, :numericality => {:integer => true}
  # validates :date, inclusion: { in: (Date.new(2000,1,1)..Date(2020,1,1)) }
  validate :in_date_range

private
  def in_date_range
    if
      (self.certification.fiscal_start .. self.certification.fiscal_end).include?(self.date)
    else
      error = "Must be between " + self.certification.formatted_date_month_short
      errors.add(:date, error)
    end
  end
end
