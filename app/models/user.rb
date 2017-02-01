class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable

  validates :phone, format: { with: /\d{3}-\d{3}-\d{4}/, message: "555-555-5555" }, allow_blank: true
  # validates :website, format: { with: URI::regexp(%w(http https)), message: "http://example.org"}, allow_blank: true
  validates_numericality_of :address_zip, allow_blank: true

  has_many :certifications
  has_many :artist_payments, through: :certifications

end
