class DeleteFieldsLatitudeAndLongitudeFromUsers < ActiveRecord::Migration
  def change
    remove_column :users, :latitude
    remove_column :users, :longitude
  end
end
