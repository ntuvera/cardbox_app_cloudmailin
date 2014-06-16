class AddConsumerkeyAndConsumersecretToUser < ActiveRecord::Migration
  def change
    add_column :users, :consumer_key, :string
    add_column :users, :consumer_secret, :string
  end
end
