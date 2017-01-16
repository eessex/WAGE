class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  respond_to :html, :json

  helper HasSubmitted

	# unless  ActionController::Base.consider_all_requests_local
	  # rescue_from Exception, :with => :render_404
	# end

private

  def render_404
    render :template => 'site/404', :layout => false, :status => :not_found
  end

end
