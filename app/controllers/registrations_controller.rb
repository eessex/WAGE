class RegistrationsController < Devise::RegistrationsController
  before_action :configure_permitted_parameters, if: :devise_controller?
  respond_to :json

  protected

  def configure_permitted_parameters
      # Fields for sign up
      devise_parameter_sanitizer.permit(:sign_up, keys: [:institution_name, :email, :password])
      # Fields for editing an existing account
      devise_parameter_sanitizer.permit(:account_update, keys: [:admin, :fiscal_start, :fiscal_end, :institution_name, :email, :website, :password, :rep_name, :rep_title, :phone, :address_st1, :address_st2, :address_city, :address_state, :address_zip, :statement, :file_501c3])
  end

  def update_resource(resource, params)
    resource.update_without_password(params)
  end

  def after_sign_up_path_for(resource)
    :root_path # Or :prefix_to_your_route
  end
end
