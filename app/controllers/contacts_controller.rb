class ContactsController < ApplicationController


 def index
    # @user     = User.find(params[:id])
    @contacts = current_user.contacts
    respond_to do |format|
      format.json { render :json => @contacts.to_json }
      # format.html
    end
  end

  def show
    @contact = Contact.find(params[:id])
  end

  def new
    @contact = Contact.new #form partial
    #show a form
  end

  def create
    @contact = Contact.create(contact_params)
    respond_to do |format|
      format.json { render :json => @contacts.to_json }
      format.html
    end
    # if @contact(name: params[:name])           # need error render if contact already exists with same name

    redirect_to contacts_path
  end

  def edit
    @contact = Contact.find(params[:id])
  end

  def update
    edited_contact = Contact.find(params[:id])
    edited_contact.update(contact_params)
  end

  def destroy
    Contact.delete(params[:id])
    redirect_to contact_path
  end

private

  def contact_params
    params.require(:contact).permit(:name, :email, :linkedin_id, :phone, :location, :note, :network, :card_image_url, :card_received_date, :user_id)
  end

end

