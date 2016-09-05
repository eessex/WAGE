class ArtistPayment < ActiveRecord::Base
  belongs_to :certification
  # validates :name, :email, :presence => true, :uniqueness => true
  # validates_format_of :email, :with => /@/
end
