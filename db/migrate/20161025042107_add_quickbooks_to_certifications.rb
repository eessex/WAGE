class AddQuickbooksToCertifications < ActiveRecord::Migration
  def change
    add_column :certifications, :qb_pl, :string
    add_column :certifications, :statement, :string
  end
end
