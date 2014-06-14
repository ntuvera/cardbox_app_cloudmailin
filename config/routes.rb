Rails.application.routes.draw do

  root 'people#index'


  get '/messages/send' => 'emails#send_simple_message'
  post '/messages/receive' => 'emails#receive'

  post '/incoming_mails' => 'incoming_mails#create'
  

  resources :emails

  resources :people
  post '/people' => 'people#create', as: 'create_person'

  resources :users

  resources :cards

end
