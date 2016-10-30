class CreateFeeCategories < ActiveRecord::Migration
  def change
    create_table :fee_categories do |t|
      t.string :name
      t.text :description
      t.float :floor_fee
      t.string :fee_subtitle
      t.string :over500K

      t.timestamps
    end
  end
end
