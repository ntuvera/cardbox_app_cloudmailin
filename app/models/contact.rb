class Contact < ActiveRecord::Base
  validates :email, uniqueness: true
  has_many :cards
  belongs_to :user
end
