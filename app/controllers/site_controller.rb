class SiteController < ApplicationController
  # before_action :set_user, only: [:show, :edit, :update, :destroy]
  # before_action :set_s3_direct_post, only: [:edit, :update]

  def index
    @user = current_user
    @fee_categories = FeeCategory.all
    if current_user.certifications.length > 0
      @certifications = current_user.certifications
      @certification = current_user.certifications.first
      @artist_payments = []
      if has_submitted(@certifications)
        render component: 'Dashboard', props: { certifications: @certifications, user: @user, fee_categories: @fee_categories}, class: 'dashboard'
      else
        render component: 'newCertification', props: { certification: @certification, certifications: @certifications, artist_payments: @artist_payments, user: @user, fee_categories: @fee_categories }, class: 'new-user-dashboard'
      end
    else
      @certifications = []
      @certification = {status: 0, user_id: @user.id, fiscal_start: nil, fiscal_end: nil}
      render component: 'newCertification', props: { certification: @certification, certifications: @certifications, artist_payments: @artist_payments, user: @user, fee_categories: @fee_categories }, class: 'new-user-dashboard'
    end
  end

  def fee_schedule
    @user = current_user
    @fee_categories = FeeCategory.all
    render component: 'FeeSchedule', props: { certification: @certification, user: @user, fee_categories: @fee_categories, floor_categories: @fee_categories}, class: 'fee_schedule'
  end

  def has_submitted(certifications)
    certifications.each do |certification|
      if certification.status >= 2
        return true
      end
    end
    return false
  end

end
