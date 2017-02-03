class UsersController < ApplicationController

	def show
		if current_user.admin
		  @user = User.find(params[:id])
          @path = ENV['HOST'] + '/users/' + @user.id.to_s
          @root = ENV['HOST']
		  @certifications = Certification.where(user_id: @user.id) || []
		  render component: 'AdminUserShow', props: {
		  	user: @user,
		  	certifications: @certifications,
            path: @path,
            root: @root
		  }, class: "admin-user admin-user--show"
		end

	   # @certification = Certification.find(params[:id])
    # @user = User.find(@certification.user_id)
    # @certifications = Certification.where(user_id: @user.id) || []
    # @fee_categories = FeeCategory.order('id')
    # @artist_payments = @certification.artist_payments || []
    # @path = ENV['HOST'] + '/certifications/' + @certification.id.to_s
    # if !current_user.admin
    #   render component: 'CertificationView', props: {
    #       path: @path,
    #       certification: @certification,
    #       certifications: @certifications,
    #       artist_payments: @artist_payments,
    #       user: @user,
    #       new_user: false,
    #       fee_categories: @fee_categories
    #     }, class: "certification certification--view"
    #   else
    #     render component: 'AdminCertificationShow', props: {
    #       certification: @certification,
    #       certifications: @certifications,
    #       artist_payments: @artist_payments,
    #       user: @user,
    #       fee_categories: @fee_categories
    #     }, class: "admin-certification admin-certification--show"
    # end
	end

end