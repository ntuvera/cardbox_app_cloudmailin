class IncomingMailsController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def create
    Rails.logger.log params[:envelope][:to] # print the to field to the logs
    Rails.logger.log params[:subject] # print the subject to the logs
    Rails.logger.log params[:plain] # print the decoded body plain to the logs if present
    Rails.logger.log params[:html] # print the html decoded body to the logs if present
    Rails.logger.log params[:attachments][0] if params[:attachments] # A tempfile attachment if attachments is populated

    # if User.all.map(&:email).include? params[:from] # check if user is registered
    #   @email = email.new
    #   @email.body = params[:plain].split("\n").first
    #   @email.user = User.where(:email => params[:from])
    #   @email.date = DateTime.now
    # end

      if @email.save
        render :text => 'Success', :status => 200
      else
        render :text => 'Internal failure', :status => 501
      end
    else
      render :text => 'Unknown user', :status => 404 # 404 would reject the mail
    end
  end
end
