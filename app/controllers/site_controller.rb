class SiteController < ApplicationController
  include HasSubmitted

  def index
    @user = current_user
    @path = ENV['HOST']
    @fee_categories = FeeCategory.all
    @certifications = current_user.certifications
    @certification = current_user.certifications.first || Certification.create(status: 0, user_id: @user.id, fiscal_start: new_dates[:s_d], fiscal_end: new_dates[:e_d])
    @artist_payments = @certification.artist_payments || []
    if has_submitted(@certifications)
      @new_user = false
      render component: 'Dashboard', props: {
        certifications: @certifications,
        user: @user,
        fee_categories: @fee_categories
      }, class: 'dashboard'
    else
      @new_user = true
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

  def guidelines
    @path = ENV['HOST'] + '/guidelines'
    if current_user
      @certifications = current_user.certifications || []
    end
    render :template => 'site/_guidelines'
  end

  def fee_schedule
    @user = current_user
    @fee_categories = FeeCategory.all
    @certifications = current_user.certifications || []
    @path = ENV['HOST'] + '/fee-schedule'
    if !has_submitted(@certifications)
      @new_user = true
    end
    render component: 'FeeScheduleRoot', props: {
        path: @path,
        certifications: @certifications,
        certification: @certifications.first,
        new_user: @new_user,
        user: @user, new_user: @new_user,
        fee_categories: @fee_categories
      }, class: 'fee_schedule fee_schedule--full_view'
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
