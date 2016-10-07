class AddFiscalDatesToUsers < ActiveRecord::Migration
  def change
    add_column :users, :fiscal_start, :date
    add_column :users, :fiscal_end, :date
    add_column :users, :file_501c3, :string
  end
end
