class CreateCertifications < ActiveRecord::Migration
  def change
    create_table :certifications do |t|
      t.integer :user_id
      t.integer :status, :default => 0
      t.boolean :approved, :default => false
      t.date   :fiscal_start
      t.date   :fiscal_end
      t.integer  :operating_expenses
      t.string  :file_contract
      t.string  :file_990
      t.string  :file_budget
      t.timestamps null: false
    end
  end
end
