class AddCertifiedToUsers < ActiveRecord::Migration
  def change
    add_column :users, :admin, :boolean, :default => false
    add_column :users, :phone, :string
    add_column :users, :fiscal_start, :date
    add_column :users, :fiscal_end, :date
    add_column :users, :file_501c3, :string
    add_column :users, :file_contract, :string
  end
end
