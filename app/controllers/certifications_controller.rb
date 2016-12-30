class CertificationsController < ApplicationController
  def index
    @certifications = Certification.all
    render component: 'Certifications', props: { certifications: @certifications }
  end

  def show
    @certification = Certification.find(params[:id])
    @user = User.find(@certification.user_id)
    @certifications = Certification.where(user_id: @user.id)
    @fee_categories = FeeCategory.all
    @artist_payments = @certification.artist_payments || []
    if @certification.status < 1
      render component: 'CertificationShow', props: { certification: @certification, certifications: @certifications, artist_payments: @artist_payments, user: @user, fee_categories: @fee_categories }, class: "certification show"
    elsif @certification.status <= 2
      render component: 'CertificationIsSubmitted', props: { certification: @certification, certifications: @certifications, artist_payments: @artist_payments, user: @user, fee_categories: @fee_categories }, class: "certification show"
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




  # before_action :set_certification, only: [:show, :edit, :update, :destroy]
  # # GET /certifications
  # # GET /certifications.json
  # def index
  #   if current_user != nil
  #     @user = current_user
  #     if @user.admin
  #       @certifications = Certification.all
  #     else
  #       @certifications = @user.certifications
  #     end
  #   else
  #     redirect_to root_path
  #   end
  # end
  #
  # # GET /certifications/1
  # # GET /certifications/1.json
  # def show
  #   if current_user != nil
  #     @artist_payments = @certification.artist_payments
  #     @artist_payment = ArtistPayment.new
  #     @fee_categories = FeeCategory.all
  #     # render component: 'Certification', props: { certification: @certification  }
  #   else
  #     redirect_to root_path
  #   end
  # end
  #
  # # GET /certifications/new
  # def new
  #   if current_user != nil
  #     @user = current_user
  #     @certification ||= Certification.new
  #   else
  #     redirect_to root_path
  #   end
  # end
  #
  # # GET /certifications/1/edit
  # def edit
  #   unless current_user != nil && current_user.id == @certification.user.id
  #     redirect_to root_path
  #   end
  # end
  #
  # # POST /certifications
  # # POST /certifications.json
  # def create
  #   @certification = Certification.new(certification_params)
  #   if current_user != nil
  #     @certification.user = current_user
  #     fiscal_start = certification_params[:fiscal_start].to_s + "-" + "01"
  #     @certification.fiscal_start = fiscal_start
  #     fiscal_end = certification_params[:fiscal_end].to_s + "-" + "30"
  #     @certification.fiscal_end = fiscal_end
  #   end
  #   respond_to do |format|
  #     if @certification.save
  #       @certification.save
  #       format.html { redirect_to @certification, notice: '* New application was successfully created.' }
  #       format.json { render :show, status: :created, location: @certification }
  #     else
  #       format.html { render :new }
  #       format.json { render json: @certification.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end
  #
  # # PATCH/PUT /certifications/1
  # # PATCH/PUT /certifications/1.json
  # def update
  #   respond_to do |format|
  #     if @certification.update(certification_params)
  #       fiscal_start = certification_params[:fiscal_start].to_s + "-" + "01"
  #       @certification.fiscal_start = fiscal_start
  #       fiscal_end = certification_params[:fiscal_end].to_s + "-" + "30"
  #       @certification.fiscal_end = fiscal_end
  #       @certification.operating_expenses = certification_params["operating_expenses"].gsub(",","")
  #       @certification.save
  #       format.html { redirect_to @certification, notice: '* Financial details were successfully updated.' }
  #       format.json { render :show, status: :ok, location: @certification,  notice: '* Financial details were successfully updated.' }
  #     else
  #       format.html { render :edit }
  #       format.json { render json: @certification.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end
  #
  # # DELETE /certifications/1
  # # DELETE /certifications/1.json
  # def destroy
  #   @certification.destroy
  #   respond_to do |format|
  #     format.html { redirect_to root_path, notice: '* Application was successfully deleted.' }
  #     format.json { head :no_content }
  #   end
  # end
  #
  # private
  #   # Use callbacks to share common setup or constraints between actions.
  #   def set_certification
  #     @certification = Certification.find(params[:id])
  #   end
  #
  #   # Never trust parameters from the scary internet, only allow the white list through.
  #   def certification_params
  #     params.require(:certification).permit(:status, :operating_expenses, :fiscal_start, :fiscal_end, :file_990, :user_id)
  #   end
# end
