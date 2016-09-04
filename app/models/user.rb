class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :certifications
  # has_many :artist_payments, through: :certifications
  #
  # def member_since
  #   self.created_at.strftime("%B %Y")
  # end
  #
  # def get_address_1
  #   if self.address_st1
  #     if self.address_st2 && self.address_st2.length > 0
  #       self.address_st1 + ", " + self.address_st2
  #     else
  #       self.address_st1
  #     end
  #   else
  #     false
  #   end
  # end
  #
  # def get_address_2
  #   if self.address_city
  #     self.address_city + ", " + self.address_state + " " + self.address_zip
  #   else
  #   '<span class="empty">Please complete your address<i class="fa fa-certificate true" aria-hidden="true"></i></span>'
  #   end
  # end
  #
  # def has_address
  #   if get_address_1
  #     divider = '<br />'
  #     address = get_address_1.html_safe + divider.html_safe + get_address_2.html_safe
  #     return address.html_safe
  #   else
  #     get_address_2.html_safe
  #   end
  # end
  #
  # def has_representative
  #   if self.rep_name && self.rep_name.length > 0
  #     name = self.rep_name
  #     if self.rep_title && self.rep_title.length > 0
  #       title = ", " + self.rep_title
  #     end
  #   else
  #     if self.rep_title && self.rep_title.length > 0
  #       name = '<span class="empty">Name<i class="fa fa-certificate true" aria-hidden="true"></i></span>'
  #       title = ", " + self.rep_title
  #     else
  #       name = '<span class="empty">Name</span>'
  #       title = '<span class="empty">, Title<i class="fa fa-certificate true" aria-hidden="true"></i></span>'
  #     end
  #   end
  #   formatted = name + title
  #   return formatted.html_safe
  # end
  #
  # def has_phone
  #   if self.phone && self.phone.length > 0
  #     return self.phone
  #   else
  #     return '<span class="empty">Phone<i class="fa fa-certificate true" aria-hidden="true"></i></span>'.html_safe
  #   end
  # end
  #
  # def has_website
  #   if self.website && self.website.length > 0
  #     website = '<a href="'+ self.website + '" target="_blank">' + self.website + '</a>'
  #   else
  #     website = '<span class="empty">http://example.org<i class="fa fa-certificate true" aria-hidden="true"></i></span>'
  #   end
  #   return website.html_safe
  # end
  #
  #   def status_contact
  #     if self.rep_name != "" && self.rep_name != nil && self.rep_title != "" && self.phone != "" && self.website != "" && self.address_st1 != "" && self.address_city != "" && self.address_state != "" && self.address_zip != ""
  #       return '<i class="fa fa-circle true" aria-hidden="true"></i>'.html_safe
  #     else
  #       return '<i class="fa fa-circle" aria-hidden="true"></i>'.html_safe
  #     end
  #   end
  #
  # def status_applications
  #   if self.certifications && self.has_completed_applications && self.status_contact
  #     return '<i class="fa fa-circle true" aria-hidden="true"></i>'.html_safe
  #   else
  #     return '<i class="fa fa-circle" aria-hidden="true"></i>'.html_safe
  #   end
  # end
  #
  # def status_statement
  #   if self.statement && self.statement.length > 300
  #     return '<i class="fa fa-circle true" aria-hidden="true"></i>'.html_safe
  #   elsif self.statement && self.statement.length > 0
  #     return '<i class="fa fa-circle progress" aria-hidden="true"></i>'.html_safe
  #   else
  #     return '<i class="fa fa-circle" aria-hidden="true"></i>'.html_safe
  #   end
  # end
  #
  # def has_completed_applications
  #   valid = []
  #   self.certifications.map do |certification|
  #     if certification.status > 0
  #       valid << certification
  #     end
  #   end
  #   if valid.length > 0
  #     return valid
  #   end
  # end

end
