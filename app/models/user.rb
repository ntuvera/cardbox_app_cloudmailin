class User < ActiveRecord::Base
  authenticates_with_sorcery!
  has_many :cards

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
