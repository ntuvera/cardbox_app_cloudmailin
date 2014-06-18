class ChangeColumnAttachmentNameToAttachmentUrl < ActiveRecord::Migration
  def change
  add_column :emails, :attachment_url, :string
  end
end
