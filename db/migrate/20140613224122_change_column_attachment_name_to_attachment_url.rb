class ChangeColumnAttachmentNameToAttachmentUrl < ActiveRecord::Migration
  def change
  rename_column :emails, :attachment_name, :attachment_url
  end
end
