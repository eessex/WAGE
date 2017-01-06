class CertificationsController < ApplicationController
  helper HasSubmitted

  def index
    @certifications = Certification.all
    render component: 'Certifications', props: { certifications: @certifications }
  end

  def show
    @certification = Certification.find(params[:id])
    @user = User.find(@certification.user_id)
    @certifications = Certification.where(user_id: @user.id) || []
    @fee_categories = FeeCategory.all
    @artist_payments = @certification.artist_payments || []
    if @certification.status < 1
      # render component: 'CertificationShow', props: { certification: @certification, certifications: @certifications, artist_payments: @artist_payments, user: @user, fee_categories: @fee_categories }, class: "certification show"
    elsif @certification.status <= 2
      # render component: 'CertificationIsSubmitted', props: { certification: @certification, certifications: @certifications, artist_payments: @artist_payments, user: @user, fee_categories: @fee_categories }, class: "certification show"
      render component: 'CertificationView', props: {
          certification: @certification,
          certifications: @certifications,
          artist_payments: @artist_payments,
          user: @user,
          new_user: false,
          fee_categories: @fee_categories
        }, class: "certification certification--view"
    end
    # render component: 'CertificationView', props: { certification: @certification, certifications: @certifications, artist_payments: @artist_payments, user: @user, fee_categories: @fee_categories }, class: "certification show"
  end

  def create
    @certification = Certification.new(certification_params)
    respond_to do |format|
      format.json do
        if @certification.save
          render :json => @certification
        else
          render :json => { :errors => @certification.errors.messages }, :status => 422
        end
      end
    end
  end

  def update
    @certification = Certification.find(params[:id])
    @user = @certification.user
    submit = isSubmit(params, @certification)
    respond_to do |format|
      certification_params[:operating_expenses] = certification_params[:operating_expenses].gsub(",","")
      format.json do
        if @certification.update(certification_params)
          if submit == true
            WageMailer.submit_confirmation(@user, @certification).deliver_now
            render :json =>  { certification: @certification, notice: 'Your application has been successfully submitted, thank you.' }
          else
            render :json => @certification
          end
        else
          render :json => { :errors => @certification.errors.messages }, :status => 422
        end
      end
    end
  end

  def destroy
    Certification.find(params[:id]).destroy
    respond_to do |format|
      format.json { render :json => {}, :status => :no_content }
    end
  end


  private

  def isSubmit(params, certification)
    if params[:certification][:status] == "1" && certification.status < 1
      return true
    end
  end

  def certification_params
    params.require(:certification).permit(:id, :fiscal_start, :fiscal_end, :user_id, :status, :operating_expenses, :file_contract, :file_990, :qb_pl, :file_budget, :statement)
  end

  def fee_categories_list
    @fee_categories = []
    the_cats = FeeCategory.all.sort_by(&:id)
    the_cats.map do |category|
      @fee_categories << { name: category.name, floor_fee: category.floor_fee }
    end
    @fee_categories
  end

end