class AddCertifiedToUsers < ActiveRecord::Migration
  def change
    add_column :users, :certified, :boolean, :default => false
    add_column :users, :admin, :boolean, :default => false
    add_column :users, :phone, :string
  end
end
