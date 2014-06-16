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
    # @authorize_url = linkedin_client.request_token.authorize_url
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    edited_user = User.find(params[:id])
    edited_user.update(user_params)
    # this may break something
    render 'profile'
  end

  def destroy
    User.delete(params[:id])
    redirect_to login_path
  end


  def authorize_linkedin

client = linkedin_client

# If you want to use one of the scopes from linkedin you have to pass it in at this point
# You can learn more about it here: http://developer.linkedin.com/documents/authentication
binding.pry
request_token = client.request_token({}, :scope => "r_network")

rtoken = request_token.token
rsecret = request_token.secret
 
# to test from your desktop, open the following url in your browser
# and record the pin it gives you
#request_token.authorize_url
# => "https://api.linkedin.com/uas/oauth/authorize?oauth_token=<generated_token>"



redirect_to client.request_token.authorize_url
# binding.pry

# puts "Access this URL get the PIN and paste it here:"
# pin = gets.strip


# then fetch your access keys
# puts client.authorize_from_request(rtoken, rsecret, pin)
# => ["ee295a7d-9cb5-4f28-8e09-22d02f802619", "a4755da0-411a-4a61-89cc-56c510fc36eb"] # <= save these for future requests
# accesskey1 = client.authorize_from_request(rtoken, rsecret, 94804)[0]
# accesskey2 = client.authorize_from_request(rtoken, rsecret, 94804)[1]
# or authorize from previously fetched access keys
#client.authorize_from_access("ee295a7d-9cb5-4f28-8e09-22d02f802619", "a4755da0-411a-4a61-89cc-56c510fc36eb")


# you're now free to move about the cabin, call any API method
  
    
# client.connections
# binding.pry

  end



private
  def linkedin_client
    consumer_key = current_user.consumer_key
    consumer_secret = current_user.consumer_secret  
    LinkedIn::Client.new(consumer_key, consumer_secret)
  end


  def user_params
    params.require(:user).permit(:email, :password, :pin)
  end

end
