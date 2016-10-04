class FeeCategoriesController < ApplicationController
  def index
    @fee_categories = FeeCategory.all
    if current_user
      @user = current_user
    end
    render component: 'FeeCategories', props: { fee_categories: @fee_categories, user: @user }
  end

  def create
    @fee_category = FeeCategory.new(fee_category_params)
    respond_to do |format|
      format.json do
        if @fee_category.save
          render :json => @fee_category
        else
          render :json => { :errors => @fee_category.errors.messages }, :status => 422
        end
      end
    end
  end

  def update
    @fee_category = FeeCategory.find(params[:id])
    respond_to do |format|
      format.json do
        if @fee_category.update(fee_category_params)
          render :json => @fee_category
        else
          render :json => { :errors => @fee_category.errors.messages }, :status => 422
        end
      end
    end
  end

  def destroy
    FeeCategory.find(params[:id]).destroy
    respond_to do |format|
      format.json { render :json => {}, :status => :no_content }
    end
  end

  private

  def fee_category_params
    params.require(:fee_category).permit(:name, :floor_fee, :description)
  end
end
