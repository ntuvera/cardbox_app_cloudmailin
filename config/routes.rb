Rails.application.routes.draw do

  root 'people#index'

  resources :emails

  get '/messages/send' => 'emails#send_simple_message'
  post '/messages/receive' => 'emails#receive'

  post '/incoming_mails' => 'incoming_mails#create'


  resources :people
  post '/people' => 'people#create', as: 'create_person'

end
