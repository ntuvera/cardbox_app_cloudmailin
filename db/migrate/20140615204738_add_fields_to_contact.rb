class AddFieldsToContact < ActiveRecord::Migration
  def change
    add_column :contacts, :location, :string
    add_column :contacts, :note, :string
    add_column :contacts, :network, :string
    add_column :contacts, :card_image_url, :string
    add_column :contacts, :card_received_date, :datetime
  end
end
