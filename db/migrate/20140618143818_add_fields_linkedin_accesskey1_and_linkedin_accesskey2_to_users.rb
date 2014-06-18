class AddFieldsLinkedinAccesskey1AndLinkedinAccesskey2ToUsers < ActiveRecord::Migration
  def change
    add_column :users, :linkedin_accesskey1, :string
    add_column :users, :linkedin_accesskey2, :string
  end
end
