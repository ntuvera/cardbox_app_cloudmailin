class CardsController < ApplicationController

  def index
    @cards = current_user.cards
    respond_to do |format|
      format.json { render :json => @cards.to_json }
      format.html
    end
  end

  def show
    @card = Card.find(params[:id])
    respond_to do |format|
      format.json { render :json => @card.to_json }
      format.html
    end
  end

  def new
    @card = Card.new #form partial
    #show a form
  end

  def create
    @card = Card.create(card_params)
    render :json => @cards.to_json
  end

  def edit
    @card = Card.find(params[:id])
  end

  def update
    edited_card = Card.find(params[:id])
    edited_card.update(card_params)
  end

  def destroy
    Card.delete(params[:id])
    redirect_to card_path
  end

private

  def card_params
    params.require(:card).permit(:sender, :subject, :message, :attachment_url, :to)
  end

end
