class RegistrationsController < Devise::RegistrationsController

  before_action :configure_permitted_parameters, if: :devise_controller?

  respond_to :json
  # def update
    # @user = User.create(user_params)
    # if @user.save
    #   respond_to do |format|
    #     format.json {
    #       @user.save ? (render :json => {:state => {:code => 0}, :data => @user }) : render (:json => {:state => {:code => 1, :messages => @user.errors.full_messages} })
    #     }
    #   end
    # end
  # end

  protected

  def configure_permitted_parameters
      # Fields for sign up
      devise_parameter_sanitizer.permit(:sign_up, keys: [:institution_name, :email, :password])
      # Fields for editing an existing account
      devise_parameter_sanitizer.permit(:account_update, keys: [:institution_name, :email, :website, :password, :rep_name, :rep_title, :phone, :address_st1, :address_st2, :address_city, :address_state, :address_zip, :statement])
  end

  def update_resource(resource, params)
    resource.update_without_password(params)
  end
end
