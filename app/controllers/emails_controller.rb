class EmailsController < ApplicationController

  def index
    @emails = Email.all
    respond_to do |format|
      format.json { render :json => @emails.to_json }
      format.html
    end
  end

  def show
    @email = Email.find(params[:id])
    respond_to do |format|
      format.json { render :json => @email.to_json }
      format.html
    end
  end

  def new
    @email = Email.new #form partial
    #show a form
  end

  def create
    @email = Email.create(email_params)
    redirect_to emails_path
  end

  def edit
    @email = Email.find(params[:id])
  end

  def update
    edited_email = Email.find(params[:id])
    edited_email.update(email_params)
  end

  def destroy
    Email.delete(params[:id])
      respond_to do |format|
        format.json { render :json => @emails.to_json }
        format.html
      end
  end

private

  def email_params
    params.require(:email).permit(:sender, :subject, :message, :attachment_url, :to)
  end




end

