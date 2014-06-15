class SessionsController < ApplicationController

  def new
    # login form
  end

  def create    
    token = params[:oauth_token]

    if token      
      @user = User.from_omniauth(env["omniauth.auth"])
      session[:user_id] = @user.id
      # self.current_user = @user
      redirect_to profile_path  # login page
    else      
      @user = login(params[:email], params[:password])       

      if @user
        session[:user_id] = @user.id
        redirect_to profile_path
      else
        render :new  #login failed
      end
    end

  end

  def destroy
    logout
    redirect_to root_path
  end 

  protected

  def auth_hash
    request.env['omniauth.auth']
  end

end
