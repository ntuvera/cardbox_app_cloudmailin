class IncomingMailsController < ApplicationController
  skip_before_action :verify_authenticity_token
  def create
    Rails.logger.info params
    
    if User.find_by(email: params[:envelope][:from]) 

      message = Email.new(
        :to => params[:envelope][:to],
        :sender => params[:envelope][:from],
        :subject => params[:headers]['Subject'],
        :message => params[:plain],
        :attachment_url => params["attachments"]["0"]["url"]
      )

      if message.save       

        card = Card.new(
          :user_id => User.find_by(email: params[:envelope][:from]).id,
          :email_id => message.id
          )
        
        if card.save
          render :text => 'Success', :status => 200
        else
          render :text => "error while trying to save the card", :status => 422, :content_type => Mime::TEXT.to_s
        end

      else
        render :text => message.errors.full_messages, :status => 422, :content_type => Mime::TEXT.to_s
      end

    else
      render :text => "No User", :status => 422, :content_type => Mime::TEXT.to_s
    end

  end
end

