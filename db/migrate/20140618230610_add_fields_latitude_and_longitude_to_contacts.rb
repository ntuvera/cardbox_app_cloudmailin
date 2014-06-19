class AddFieldsLatitudeAndLongitudeToContacts < ActiveRecord::Migration
  def change
    add_column :contacts, :latitude, :string
    add_column :contacts, :longitude, :string
  end
end
