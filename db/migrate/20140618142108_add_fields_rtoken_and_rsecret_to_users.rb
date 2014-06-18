class AddFieldsRtokenAndRsecretToUsers < ActiveRecord::Migration
  def change
    add_column :users, :rtoken, :string
    add_column :users, :rsecret, :string
  end
end
