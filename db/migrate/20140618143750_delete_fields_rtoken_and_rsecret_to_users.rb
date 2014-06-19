class DeleteFieldsRtokenAndRsecretToUsers < ActiveRecord::Migration
  def change
    remove_column :users, :rtoken
    remove_column :users, :rsecret
  end
end
