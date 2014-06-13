Rails.application.routes.draw do

 root 'people#index'

 get '/messages/send' => 'emails#send_simple_message'
 post '/messages/receive' => 'emails#receive'


 resources :people
 post '/people' => 'people#create', as: 'create_person'

end
