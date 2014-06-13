class IncomingMailsController < ApplicationController
  def create
    Rails.logger.info params
    message = Message.new(
      :to => params[:envelope][:to],
      :from => params[:envelope][:from],
      :subject => params[:headers]['Subject'],
      :body => params[:plain]
    )
    if message.save
      render :text => 'Success', :status => 200
    else
      render :text => message.errors.full_messages, :status => 422, :content_type => Mime::TEXT.to_s
    end
  end
end

