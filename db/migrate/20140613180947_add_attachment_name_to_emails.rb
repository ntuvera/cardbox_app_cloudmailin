class AddAttachmentNameToEmails < ActiveRecord::Migration
  def change
    add_column :emails, :attachment_name, :string
  end
end
