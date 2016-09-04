class AddFieldsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :institution_name, :string
    add_column :users, :website, :string
    add_column :users, :rep_name, :string
    add_column :users, :rep_title, :string
    add_column :users, :address_st1, :string
    add_column :users, :address_st2, :string
    add_column :users, :address_city, :string
    add_column :users, :address_state, :string
    add_column :users, :address_zip, :string
    add_column :users, :statement, :text
  end
end
