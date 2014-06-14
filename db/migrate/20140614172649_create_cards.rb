class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.references  :user   # t.integer   :user_id
      t.references  :email  # t.integer   :email_id
      
      t.timestamps
    end
  end
end
