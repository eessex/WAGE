# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161025042107) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "artist_payments", force: :cascade do |t|
    t.string   "name"
    t.string   "artist_name"
    t.integer  "check_no"
    t.integer  "fee_category_id"
    t.integer  "certification_id"
    t.date     "date"
    t.float    "amount"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "certifications", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "status",             default: 0
    t.boolean  "approved",           default: false
    t.date     "fiscal_start"
    t.date     "fiscal_end"
    t.integer  "operating_expenses"
    t.string   "file_contract"
    t.string   "file_990"
    t.string   "file_budget"
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.string   "qb_pl"
    t.string   "statement"
  end

  create_table "fee_categories", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.float    "floor_fee"
    t.string   "fee_subtitle"
    t.string   "over500K"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.integer  "failed_attempts",        default: 0,     null: false
    t.string   "unlock_token"
    t.datetime "locked_at"
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.string   "institution_name"
    t.string   "website"
    t.string   "rep_name"
    t.string   "rep_title"
    t.string   "address_st1"
    t.string   "address_st2"
    t.string   "address_city"
    t.string   "address_state"
    t.string   "address_zip"
    t.text     "statement"
    t.boolean  "certified",              default: false
    t.boolean  "admin",                  default: false
    t.string   "phone"
    t.date     "fiscal_start"
    t.date     "fiscal_end"
    t.string   "file_501c3"
  end

  add_index "users", ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["unlock_token"], name: "index_users_on_unlock_token", unique: true, using: :btree

end
