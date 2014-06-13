class PeopleController < ApplicationController
  
  def index
    @people = Person.all
  end

  def show
    @person = Person.find(params[:id])
  end

  def new
    @person = Person.new #form partial
    #show a form
  end

  def create
    @person = Person.create(person_params)
    redirect_to people_path
  end

  def edit
    @person = Person.find(params[:id])
  end

  def update
    edited_person = Person.find(params[:id])
    edited_person.update(person_params)
  end

  def destroy
    Person.delete(params[:id])
    redirect_to people_path
  end

  def person_params
    params.require(:person).permit(:name, :jobtitle)
  end
end
