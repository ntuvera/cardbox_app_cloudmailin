Rails.application.routes.draw do

  root 'welcome#index'


  get '/messages/send'     => 'emails#send_simple_message'
  post '/messages/receive' => 'emails#receive'

  post '/incoming_mails'   => 'incoming_mails#create'


  resources :emails

  get '/signup'   => 'users#new', as: 'signup'
  post '/users'   => 'users#create', as: 'users'
  get '/profile'  => 'users#profile', as: 'profile'

  get '/login'      => 'sessions#new', as: 'login'  # can refer to as login_path
  post '/sessions'  => 'sessions#create', as: 'session'
  delete '/logout'  => 'sessions#destroy', as: 'logout'  # can refer to as logout_path

  # in case a user profile is being deleted without destroy the corresponding session:
  get 'log_out' => 'sessions#destroy'

  #get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/linkedin/callback', to: 'sessions#create_linkedin'
  get 'auth/failure', to: 'welcome#index'
  get '/authorize', to: 'users#authorize_linkedin' # FOR THE 2ND AUTHORISATION TO GET MORE PERMISSIONS ...(NOT NEEDED ?)

  delete 'signout', to: 'sessions#destroy', as: 'signout'


  resources :cards
  resources :contacts
  resources :users

  get '/contacts/:id/find' => 'contacts#page_find'


end
