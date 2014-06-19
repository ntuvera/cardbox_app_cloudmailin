require 'open-uri'

class UsersController < ApplicationController

  before_filter :require_login, :only => :profile

  def index

    @users = User.all
    respond_to do |format|
      format.json { render :json => @contacts.to_json }
      format.html
    end
  end

  def show
    @user = User.find(params[:id])
  end

  def new
    @user = User.new # form partial
    #show a form
  end

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to login_path
    else
      render :new
    end
  end

  def profile  
    @contact = Contact.new    
    if current_user.provider == "linkedin"  
      linkedin_client.authorize_from_access(current_user.linkedin_accesskey1, current_user.linkedin_accesskey2)    
      @connections = linkedin_client.connections 
    end
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    edited_user = User.find(params[:id])
    edited_user.update(user_params)
    render 'profile'
  end

  def destroy
    User.delete(params[:id])
    redirect_to login_path
  end

  private

  def linkedin_client    
    @client ||= LinkedIn::Client.new(ENV['LINKEDIN_ID'], ENV['LINKEDIN_SECRET'])
  end

  def user_params
    params.require(:user).permit(:email, :password)
  end

  def contact_params
    params.require(:contact).permit(:name, :email, :linkedin_id, :phone, :location, :note, :network, :card_image_url, :card_received_date, :user_id)
  end


end
