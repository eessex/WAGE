class CertificationsController < ApplicationController
  def index
    @certifications = Certification.all
    render component: 'Certifications', props: { certifications: @certifications }
  end

  def create
    @certification = Certification.new(certification_params)
    @certification.user = current_user
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
    respond_to do |format|
      format.json do
        if @certification.update(certification_params)
          render :json => @certification
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

  def certification_params
    params.require(:certification).permit(:fiscal_start, :fiscal_end, :status)
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
