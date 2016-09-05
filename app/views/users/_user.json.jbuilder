json.extract! user, :id, :institution_name, :email, :website, :rep_name, :rep_title, :address_st1, :address_st2, :address_city, :address_state, :address_zip, :created_at, :updated_at
json.url user_url(user, format: :json)
