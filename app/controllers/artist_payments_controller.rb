class ArtistPaymentsController < ApplicationController
  # def index
  #   @artist_payments = ArtistPayment.all
  #   render component: 'ArtistPayments', props: { artist_payments: @artist_payments }
  # end

  def create
    @artist_payment = ArtistPayment.new(artist_payment_params)
    respond_to do |format|
      format.json do
        if @artist_payment.save
          render :json => @artist_payment
        else
          render :json => { :errors => @artist_payment.errors.messages }, :status => 422
        end
      end
    end
  end

  def update
    @artist_payment = ArtistPayment.find(params[:id])
    respond_to do |format|
      format.json do
        if @artist_payment.update(artist_payment_params)
          render :json => @artist_payment
        else
          render :json => { :errors => @artist_payment.errors.messages }, :status => 422
        end
      end
    end
  end

  def destroy
    ArtistPayment.find(params[:id]).destroy
    respond_to do |format|
      format.json { render :json => {}, :status => :no_content }
    end
  end

  private

  def artist_payment_params
    params.require(:artist_payment).permit(:name, :email, :manager)
  end
end
