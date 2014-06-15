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
