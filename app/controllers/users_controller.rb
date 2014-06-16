class UsersController < ApplicationController

  before_filter :require_login, :only => :profile

  def index
    @users = User.all
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
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    edited_user = User.find(params[:id])
    edited_user.update(user_params)
  end

  def destroy
    User.delete(params[:id])
    redirect_to login_path
  end

private

  def user_params
    params.require(:user).permit(:email, :password)
  end

end
