class SiteController < ApplicationController
  # before_action :set_user, only: [:show, :edit, :update, :destroy]
  # before_action :set_s3_direct_post, only: [:edit, :update]

  def index
    @user = current_user
    @fee_categories = FeeCategory.all
    @certifications = current_user.certifications
    @certification = current_user.certifications.first || Certification.create(status: 0, user_id: @user.id, fiscal_start: new_dates[:s_d], fiscal_end: new_dates[:e_d])
    if has_submitted(@certifications)
      @new_user = false
      render component: 'Dashboard', props: { certifications: @certifications, user: @user, fee_categories: @fee_categories}, class: 'dashboard'
    else
      @new_user = true
      @artist_payments = []
      render component: 'CertificationView', props: {
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
    @certifications = current_user.certifications
    render :template => 'site/_guidelines'
  end

  def fee_schedule
    @user = current_user
    @fee_categories = FeeCategory.all
    @certifications = current_user.certifications
    if !has_submitted(@certifications)
      @new_user = true
    end
    render component: 'FeeScheduleRoot', props: { certifications: @certifications, certification: @certifications.first, user: @user, new_user: @new_user, fee_categories: @fee_categories}, class: 'fee_schedule fee_schedule--full_view'
  end

  def has_submitted(certifications)
    certifications.each do |certification|
      if certification.status >= 1
        return true
      end
    end
    return false
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
