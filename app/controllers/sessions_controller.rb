class SessionsController < ApplicationController

  def new
    # login form
  end

  def create    
      token = params[:oauth_token]

      if token   
       
        omniauth_hash = env["omniauth.auth"]
        @user = User.from_omniauth(omniauth_hash)



# current_user.create_linkedin_connection(
#     :token  => omniauth_hash["extra"]["access_token"].token,
#     :secret => omniauth_hash["extra"]["access_token"].secret,
#     :uid    => omniauth_hash["uid"]
#   )


consumer_key = omniauth_hash["extra"]['access_token'].consumer.key
consumer_secret = omniauth_hash["extra"]['access_token'].consumer.secret
client = LinkedIn::Client.new(consumer_key, consumer_secret)

# If you want to use one of the scopes from linkedin you have to pass it in at this point
# You can learn more about it here: http://developer.linkedin.com/documents/authentication
request_token = client.request_token({}, :scope => "r_network")

rtoken = request_token.token
rsecret = request_token.secret
 
# to test from your desktop, open the following url in your browser
# and record the pin it gives you
#request_token.authorize_url
# => "https://api.linkedin.com/uas/oauth/authorize?oauth_token=<generated_token>"
puts client.request_token.authorize_url
puts "Access this URL get the PIN and paste it here:"
pin = gets.strip

# then fetch your access keys
#client.authorize_from_request(rtoken, rsecret, 94804)
# => ["ee295a7d-9cb5-4f28-8e09-22d02f802619", "a4755da0-411a-4a61-89cc-56c510fc36eb"] # <= save these for future requests
puts client.authorize_from_request(rtoken, rsecret, pin)
# or authorize from previously fetched access keys
#client.authorize_from_access("ee295a7d-9cb5-4f28-8e09-22d02f802619", "a4755da0-411a-4a61-89cc-56c510fc36eb")


# you're now free to move about the cabin, call any API method

binding.pry



        @user[:image_url] = omniauth_hash["info"]["image"]
        @user.save!       

        session[:user_id] = @user.id 
        redirect_to profile_path
        
      else
        @user = login(params[:email], params[:password])       
        if @user
          session[:user_id] = @user.id
          redirect_to profile_path
        else
          #render :new  #login failed  
          redirect_to login_path, alert: 'Log-In Failed'     
        end
      end

    end





  # def create    
  #   token = params[:oauth_token]

  #   if token   
  #     @user = User.from_omniauth(env["omniauth.auth"])
  #     session[:user_id] = @user.id         
  #     redirect_to profile_path
  #   else
  #     @user = login(params[:email], params[:password])       
  #     if @user
  #       session[:user_id] = @user.id
  #       redirect_to profile_path
  #     else
  #       #render :new  #login failed  
  #       redirect_to login_path, alert: 'Log-In Failed'     
  #     end
  #   end

  # end

  def destroy
    logout
    # redirect_to root_path
    redirect_to login_path, notice: "Logged-Out"
  end 

end



# class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
 
#   def linkedin
#     omniauth_hash = env["omniauth.auth"]
#     current_user.create_linkedin_connection(
#       :token  => omniauth_hash["extra"]["access_token"].token,
#       :secret => omniauth_hash["extra"]["access_token"].secret,
#       :uid    => omniauth_hash["uid"]
#     )
#     redirect_to root_path, :notice => "You've successfully connected your LinkedIn account."
#   end
# end
