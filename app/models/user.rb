class User < ActiveRecord::Base
  authenticates_with_sorcery!
  has_many :cards
  has_many :contacts

  #validates_presence_of :password, on: :create
  validates_presence_of :email, on: :create
  validates_uniqueness_of :email
  validates_presence_of :password, on: :create
  # validates :password, length: {within: 8..16, too_short: "too short. Your password needs mininum 8 characters.", too_long: "too long. Your password exceeds the maximum length of 16 characters."}
  # validates :email, presence: true, confirmation: true, uniqueness: true, email: true
  # validates :terms_of_service, acceptance: true
  # validates :password, length: {within: 8..16, too_short: "too short. Your password needs mininum 8 characters.", too_long: "too long. Your password exceeds the maximum length of 16 characters."}

  def self.from_omniauth(auth)
    where(auth.slice(:provider, :uid)).first_or_initialize.tap do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.name = auth.info.name
      user.oauth_token = auth.credentials.token
      # user.oauth_expires_at = Time.at(auth.credentials.expires_at)
      #binding.pry
      user.email = auth.info.email
      user.crypted_password = ENV["crypted_password"]
      user.salt = ENV["salt"]
      user.save!
    end
  end

end
