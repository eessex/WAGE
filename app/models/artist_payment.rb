class ArtistPayment < ActiveRecord::Base
  belongs_to :certification
  validates :date, :artist_name, :name, :fee_category_id, :amount, presence: true
  validates :check_no, uniqueness: { scope: :certification_id }, allow_blank: true
  validates :amount, :numericality => {:integer => true}
  validate :in_date_range

private
  def in_date_range
    if
      (self.certification.fiscal_start .. self.certification.fiscal_end).include?(self.date)
    elsif self.date
      error = "Must be between " + self.certification.fiscal_start.strftime("%-m/%-d/%y") + "-" + self.certification.fiscal_end.strftime("%-m/%-d/%y")
      errors.add(:date, error)
    end
  end

end