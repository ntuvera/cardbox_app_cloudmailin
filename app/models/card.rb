class Card < ActiveRecord::Base
  belongs_to  :email
  belongs_to  :user
end
