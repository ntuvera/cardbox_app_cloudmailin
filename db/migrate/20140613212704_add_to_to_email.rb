class AddToToEmail < ActiveRecord::Migration
  def change
    add_column :emails, :to, :string
  end
end
