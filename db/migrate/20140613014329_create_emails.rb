class CreateEmails < ActiveRecord::Migration
  def change
    create_table :emails do |t|
      t.string :sender
      t.string :subject
      t.string :message

      t.timestamps
    end
  end
end
