class SiteController < ApplicationController
  # before_action :set_user, only: [:show, :edit, :update, :destroy]
  # before_action :set_s3_direct_post, only: [:edit, :update]

  def index
    @user = current_user
    @fee_categories = FeeCategory.all
    if current_user.certifications.length > 0
      @certifications = current_user.certifications
      @certification = current_user.certifications[0]
      if @certification.status > 0
        render component: 'Dashboard', props: { certifications: @certifications, user: @user, fee_categories: @fee_categories}, class: 'dashboard'
      else
        render component: 'NewUserDashboard', props: { certifications: @certifications, user: @user, fee_categories: @fee_categories, newUser: true }, class: 'new-user-dashboard'
      end
    else
      @certifications = []
      render component: 'NewUserDashboard', props: { certifications: @certifications, user: @user, fee_categories: @fee_categories}, class: 'new-user-dashboard'
    end
  end

  # def create
  #   @certification = Certification.new(certification_params)
  #   respond_to do |format|
  #     format.json do
  #       if @certification.save
  #         render :json => @certification
  #       else
  #         render :json => { :errors => @certification.errors.messages }, :status => 422
  #       end
  #     end
  #   end
  # end
  #
  # def update
  #   @certification = Certification.find(params[:id])
  #   respond_to do |format|
  #     format.json do
  #       if @certification.update(certification_params)
  #         render :json => @certification
  #       else
  #         render :json => { :errors => @certification.errors.messages }, :status => 422
  #       end
  #     end
  #   end
  # end

#   def destroy
#     Certification.find(params[:id]).destroy
#     respond_to do |format|
#       format.json { render :json => {}, :status => :no_content }
#     end
#   end
#
#   private
#
#   def certification_params
#     params.require(:certification).permit(:fiscal_start, :fiscal_end, :status)
#   end
end
