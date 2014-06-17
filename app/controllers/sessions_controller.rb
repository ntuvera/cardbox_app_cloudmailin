class SessionsController < ApplicationController

  def new
    # login form
  end

  def create 
    @user = login(params[:email], params[:password])       
    if @user
      session[:user_id] = @user.id
      redirect_to profile_path
    else
      #render :new  #login failed  
      redirect_to login_path, alert: 'Log-In Failed'     
    end    
  end

  def create_linkedin
    omniauth_hash = env["omniauth.auth"]
    @user = User.from_omniauth(omniauth_hash)
   
    @user[:consumer_key] = omniauth_hash["extra"]['access_token'].consumer.key
    @user[:consumer_secret] = omniauth_hash["extra"]['access_token'].consumer.secret    
    @user[:image_url] = omniauth_hash["info"]["image"]
    @user.save!       

    session[:user_id] = @user.id 
    redirect_to profile_path  
    
  end

  def destroy
    logout
    # redirect_to root_path
    redirect_to root_path, notice: "Logged-Out"
  end 

end
