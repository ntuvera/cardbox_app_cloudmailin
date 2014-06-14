Rails.application.routes.draw do

  root 'welcome#index'


  get '/messages/send' => 'emails#send_simple_message'
  post '/messages/receive' => 'emails#receive'

  post '/incoming_mails' => 'incoming_mails#create'


  resources :emails

  resources :users

  resources :cards

end
