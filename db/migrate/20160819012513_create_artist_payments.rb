class CreateArtistPayments < ActiveRecord::Migration
  def change
    create_table :artist_payments do |t|
      t.string :name
      t.string :artist_name
      t.string :notes
      t.integer :check_no
      t.integer :fee_category_id
      t.integer :certification_id
      t.date :date
      t.float :amount

      t.timestamps
    end
  end
end
