class AddQuickbooksToCertifications < ActiveRecord::Migration
  def change
    add_column :certifications, :qb_pl, :string
  end
end
