console.log('Stop Peeking...')

function Card(cardJSON){
  this.name               = cardJSON.name;
  this.email              = cardJSON.email;
  this.linkedin_id        = cardJSON.linkedin_id;
  this.phone              = cardJSON.phone;
  this.location           = cardJSON.location; // do we really need this?
  this.network            = cardJSON.network;
  this.card_image_url     = cardJSON.card_image_url;
  this.card_received_date = cardJSON.card_received_date;
  this.id                 = cardJSON.id;
}

// Contacts Show Button //

function Contact(contactJSON){
  this.name               = contactJSON.name;
  this.email              = contactJSON.email;
  this.linkedin_id        = contactJSON.linkedin_id;
  this.phone              = contactJSON.phone;
  this.location           = contactJSON.location; // do we really need this?
  this.network            = contactJSON.network;
  this.card_image_url     = contactJSON.card_image_url;
  this.card_received_date = contactJSON.card_received_date;
  this.id                 = contactJSON.id;
}

function ContactView(model){
  this.model  = model;
  this.el     = undefined;
}

ContactView.prototype.render = function(){

  var newElement = $('<div>').attr('class', 'contact-card');
  this.el = newElement;
  return this;
}

function ContactsCollection(){
  this.models = {};
}

ContactsCollection.prototype.add = function(contactJSON){
  var newContact = new Contact(contactJSON);
  this.models[contactJSON.id] = newContact;
  $(this).trigger('addFlare');
  return this;
}

ContactsCollection.prototype.create = function (paramObject){
  var that = this;
  $.ajax({
    url: '/contacts',
    method: 'post',
    dataType: 'json',
    data: {contact: paramObject},
    success: function(data){
      that.add(data);
    }
  })
}

ContactsCollection.prototype.fetch = function(){
  var that = this;
  $.ajax({
    url: '/contacts',
    dataType: 'json',
    success: function(data){
      for (idx in data){
        that.add(data[idx]);
      }
    }
  })
}
//incorporate delete ajax call with animate shrink for cards & contacts?

function clearAndDisplayContactsList(){

  $('.contacts-container').html('');

  for(idx in contactsCollection.models){
    var contact     = contactsCollection.models[idx];
    var contactView = new ContactView(contact);
    $('.contacts-container').append(contactView.render().el);
  }

}
// show contacts button method?


var contactsCollection = new ContactsCollection();

$(function(){

  $('.show-contacts').on('click', function(){
    contactsCollection.fetch();
    clearAndDisplayContactsList();

    $('.contacts-container').load('/contacts').hide().fadeIn('slow');
  })


  $(contactsCollection).on('addFlare', function(){
    clearAndDisplayContactsList();
  })
})



