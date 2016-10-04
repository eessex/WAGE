class AddFiscalDatesToUsers < ActiveRecord::Migration
  def change
    add_column :users, :fiscal_start, :integer, :default => 1
    add_column :users, :fiscal_end, :integer, :default => 12
  end
end
