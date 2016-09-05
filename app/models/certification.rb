class Certification < ActiveRecord::Base
  belongs_to :user
  has_many :artist_payments
  validates :fiscal_start, uniqueness: { scope: :user_id }
  validates :fiscal_end, uniqueness: { scope: :user_id }


  def formatted_date_month
    if self.fiscal_start && self.fiscal_start.to_date.year == self.fiscal_end.to_date.year
      self.fiscal_start.to_date.strftime("%B") + " - " + self.fiscal_end.to_date.strftime("%B %Y")
    elsif self.fiscal_start
      self.fiscal_start.to_date.strftime("%B %Y") + " - " + self.fiscal_end.to_date.strftime("%B %Y")
    end
  end

  def formatted_date_month_short
    if self.fiscal_start && self.fiscal_start.to_date.year == self.fiscal_end.to_date.year
      self.fiscal_start.to_date.strftime("%b") + " - " + self.fiscal_end.to_date.strftime("%b %Y")
    elsif self.fiscal_start
      self.fiscal_start.to_date.strftime("%b %Y") + " - " + self.fiscal_end.to_date.strftime("%b %Y")
    end
  end

  # # validates :fiscal_start, :presence => true
  #
  # def formatted_date_year
  #   if self.fiscal_start && self.fiscal_start.to_date.year == self.fiscal_end.to_date.year
  #     self.fiscal_start.to_date.year.to_s
  #   elsif self.fiscal_start
  #     self.fiscal_start.to_date.year.to_s + " - " + self.fiscal_end.to_date.year.to_s
  #   end
  # end
  #
  # def formatted_operating_expenses
  #   if self.operating_expenses
  #     return number_to_currency(self.operating_expenses)
  #   end
  # end
  #
  # def formatted_date_month
  #   if self.fiscal_start && self.fiscal_start.to_date.year == self.fiscal_end.to_date.year
  #     self.fiscal_start.to_date.strftime("%B") + " - " + self.fiscal_end.to_date.strftime("%B %Y")
  #   elsif self.fiscal_start
  #     self.fiscal_start.to_date.strftime("%B %Y") + " - " + self.fiscal_end.to_date.strftime("%B %Y")
  #   end
  # end
  #
  # def has_file_990
  #   if self.file_990
  #     self.file_990
  #   else
  #     return "PDF Upload required."
  #   end
  # end
  #
  # def total_payments
  #   payments = []
  #   self.artist_payments.each do |payment|
  #     payments << payment.amount
  #   end
  #   payments.inject(0){|sum,x| sum + x }
  # end
  #
  # def total_programs
  #   payments = []
  #   self.artist_payments.each do |payment|
  #     payments << payment.name
  #   end
  #   payments.uniq.length
  # end
  #
  # def total_artists
  #   payments = []
  #   self.artist_payments.each do |payment|
  #     payments << payment.artist_name
  #   end
  #   payments.uniq.length
  # end
  #
  # def is_complete
  #   if self.artist_payments.length > 5
  #     if self.fiscal_start && self.fiscal_end
  #       if self.operating_expenses
  #         if self.user.statement != ""
  #           if self.file_990
  #             self.status = 1
  #             self.save
  #             return true
  #           end
  #           self.status = 0
  #           self.save
  #           return false
  #         end
  #       end
  #       self.status = 0
  #       self.save
  #       return false
  #     end
  #     self.status = 0
  #     self.save
  #     return false
  #   end
  #   self.status = 0
  #   self.save
  #   return false
  # end
  #
  # def formatted_status
  #   self.is_complete
  #   if self.status == 0
  #     "In Progress"
  #   elsif self.status == 1
  #     "Ready to Submit"
  #   elsif self.status == 2
  #     "Pending Approval"
  #   elsif self.status == 3
  #     "Approved"
  #   elsif self.status == 4
  #     "Rejected"
  #   end
  # end


end
