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

ActiveRecord::Schema.define(version: 20140616202751) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cards", force: true do |t|
    t.integer  "user_id"
    t.integer  "email_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "contacts", force: true do |t|
    t.string   "name"
    t.string   "email"
    t.string   "linkedin_id"
    t.string   "phone"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "location"
    t.string   "note"
    t.string   "network"
    t.string   "card_image_url"
    t.datetime "card_received_date"
  end

  create_table "emails", force: true do |t|
    t.string   "sender"
    t.string   "subject"
    t.string   "message"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "attachment_url"
    t.string   "to"
  end

  create_table "users", force: true do |t|
    t.string   "email",            null: false
    t.string   "crypted_password", null: false
    t.string   "salt",             null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "user"
    t.string   "provider"
    t.string   "uid"
    t.string   "name"
    t.string   "oauth_token"
    t.datetime "oauth_expires_at"
    t.string   "image_url"
    t.string   "consumer_key"
    t.string   "consumer_secret"
    t.string   "pin"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree

end
