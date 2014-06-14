class UsersController < ApplicationController

  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end

  def new
    @user = User.new #form partial
    #show a form
  end

  def create
    @user = User.create(user_params)
    redirect_to users_path
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
    redirect_to users_path
  end
private
  def user_params
    params.require(:user).permit(:email)
  end
end
