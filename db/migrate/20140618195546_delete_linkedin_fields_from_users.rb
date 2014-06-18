class DeleteLinkedinFieldsFromUsers < ActiveRecord::Migration
  def change
      remove_column :users, :consumer_key
      remove_column :users, :consumer_secret
      remove_column :users, :pin      
  end
end
