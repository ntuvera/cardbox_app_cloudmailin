class CardsController < ApplicationController

  def index
    @cards = Card.all
  end

  def show
    @card = Card.find(params[:id])
  end

  def new
    @card = Card.new #form partial
    #show a form
  end

  def create
    @card = Card.create(card_params)
    redirect_to cards_path
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