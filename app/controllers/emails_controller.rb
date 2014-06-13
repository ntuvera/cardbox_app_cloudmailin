class EmailsController < ApplicationController
   skip_before_filter :verify_authenticity_token

  # def send_simple_message
  #   RestClient.post "https://api:key-0cj5pmudc3ubon34tf7a3mf5q35kubq6"\
  #   "@api.mailgun.net/v2/sandbox36af9174a23c495e930bc4c03e9f732d.mailgun.org/messages",
  #   :from => "Mailgun Sandbox <postmaster@sandbox36af9174a23c495e930bc4c03e9f732d.mailgun.org>",
  #   :to => "Andrea Trapp <andrea.trapp@gmail.com>",
  #   :subject => "test mailgun",
  #   :text => "HI, you just sent an email with Mailgun!  You are truly awesome!  You can see a record of this email in your logs: https://mailgun.com/cp/log .  You can send up to 300 emails/day from this sandbox server.  Next, you should add your own domain so you can send 10,000 emails/month for free."
  # end


  def receive    
    # process various message parameters:
    sender  = params['from']
    subject = params['subject']

    # get the "stripped" body of the message, i.e. without
    # the quoted part
    message = params["stripped-text"]

    # process all attachments:
    count = params['attachment-count'].to_i
    # count.times do |i|
      # stream = params["attachment-#{i+1}"]
      stream = params["attachment-1"]
      filename = stream.original_filename
      data = stream.read
    # end
     
    Email.create(sender: sender, subject: subject, message: message, attachment_name: filename)
    
    render :text => "OK"

  end



  def index
    @emails = Email.all
  end

  def show
    @email = Email.find(params[:id])
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
    redirect_to emails_path
  end

  def email_params
    params.require(:email).permit(:sender, :subject, :message)
  end

end

