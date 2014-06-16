console.log('Stop Peeking...')

function Contact(contactJSON){
  this.sender         = contactJSON.sender;
  this.subject        = contactJSON.subject;
  this.message        = contactJSON.message;
  this.created_at     = contactJSON.created_at;
  this.updated_at     = contactJSON.updated_at; // do we really need this?
  this.attachment_url = contactJSON.attachment_url;
  this.id             = contactJSON.id;
}

function ContactView(model){
  this.model  = model;
  this.el     = undefined;
}

ContactView.prototype.render = function(){
  var newContactEl = $('<div>').attr('class', 'contact').html('test'); // will finish in a second
  this.el = newContactEl;
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

$('.show_contacts').on('click', function(e){
  clearAndDisplayContactsList();
})

$(function(){

  contactsCollection.fetch();

  $(contactsCollection).on('addFlare', function(){
    clearAndDisplayContactsList();
  })


})
