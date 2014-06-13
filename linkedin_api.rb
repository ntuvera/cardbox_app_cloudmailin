require 'pry'

require 'oauth'

api_key = '77ryvgv640zxdw'
api_secret = 'tb0Sl4JEmTfG93vS'
user_token = '32a6f012-1243-49ba-95e7-d9386a1f1393'
user_secret = '64116f58-7d35-4291-af06-ce2ec6892cae'

configuration = { :site => 'https://api.linkedin.com' }
consumer = OAuth::Consumer.new(api_key, api_secret, configuration)
access_token = OAuth::AccessToken.new(consumer, user_token, user_secret)
response = access_token.get("http://api.linkedin.com/v1/people/~")

binding.pry

# response = access_token.get("http://api.linkedin.com/v1/people/~?format=json")
