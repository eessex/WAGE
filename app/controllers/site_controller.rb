class SiteController < ApplicationController
  include HasSubmitted

  def index
    @user = current_user
    @path = ENV['HOST']
    @fee_categories = FeeCategory.order('id')
    if @user.admin
      @certifications = Certification.order('updated_at')
      @users = User.includes(:certifications)
      render component: 'AdminDashboard', props: {
        certifications: @certifications,
        users: @users,
        root: @path,
        path: @path,
        fee_categories: @fee_categories
      }, class: 'admin--dashboard'
    else
      @path = ENV['HOST']
      @fee_categories = FeeCategory.order('id')
      @certifications = current_user.certifications || []
      @certification = current_user.certifications.first || Certification.create(status: 0, user_id: @user.id, fiscal_start: new_dates[:s_d], fiscal_end: new_dates[:e_d])
      @artist_payments = @user.artist_payments || []
      if has_submitted(@certifications)
        @new_user = false
        render component: 'Dashboard', props: {
          certifications: @certifications,
          certification: @certification,
          artist_payments: @artist_payments,
          user: @user,
          fee_categories: @fee_categories
        }
      else
        @new_user = true
        @path = ENV['HOST']
        render component: 'CertificationView', props: {
            path: @path,
            certification: @certification,
            certifications: @certifications,
            artist_payments: @artist_payments,
            user: @user,
            new_user: @new_user,
            fee_categories: @fee_categories
          }, class: "certification certification--view"
      end
    end
  end

  def guidelines
    if current_user
      @path = ENV['HOST'] + '/guidelines'
      @certifications = current_user.certifications || []
    end
     render :template => 'site/_guidelines'
  end

  def fee_schedule
    @user = current_user
    @fee_categories = FeeCategory.order('id')
    @certifications = current_user.certifications || []
    @certification = current_user.certifications.first
    @path = ENV['HOST'] + '/fee-schedule'
    if !has_submitted(@certifications)
      @new_user = true
      render component: 'FeeScheduleRoot', props: {
        path: @path,
        certifications: @certifications,
        certification: @certification,
        new_user: @new_user,
        user: @user,
        fee_categories: @fee_categories
      }, class: 'fee_schedule fee_schedule--full_view'
    else
      render component: 'FeeScheduleShow', props: {
        path: @path,
        certifications: @certifications,
        certification: @certifications[0],
        new_user: @new_user,
        user: @user,
        fee_categories: @fee_categories
      }, class: 'fee-schedule--show'
    end
  end

  def error_404
    render :template => 'site/_404'
  end

  def new_dates
    y = Date.today.year
    s_d = Date.new(y, 1, 1)
    e_d = Date.new(y + 1, 12, 31)
    return {s_d: s_d, e_d: e_d}
  end

  helper_method :resource_name, :resource, :devise_mapping, :new_user, :has_submitted

  def new_user
    return @new_user
  end

  def resource_name
    :user
  end

  def resource
    @resource ||= User.new
  end

  def devise_mapping
    @devise_mapping ||= Devise.mappings[:user]
  end
end
