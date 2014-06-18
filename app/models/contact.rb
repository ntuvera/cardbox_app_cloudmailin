class Contact < ActiveRecord::Base
  validates_presence_of :name
  validates :email, uniqueness: true
  has_many :cards
  belongs_to :user


end
