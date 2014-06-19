Rails.application.config.middleware.use OmniAuth::Builder do
  provider :linkedin, ENV['LINKEDIN_ID'], ENV['LINKEDIN_SECRET'], :scope => "r_emailaddress r_network w_messages rw_nus"
end
