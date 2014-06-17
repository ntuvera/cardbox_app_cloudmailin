console.log('Stop Peeking...')

// // Cards Show Button //
// function Card(cardJSON){
//   this.name               = cardJSON.name;
//   this.email              = cardJSON.email;
//   this.linkedin_id        = cardJSON.linkedin_id;
//   this.phone              = cardJSON.phone;
//   this.location           = cardJSON.location; // do we really need this?
//   this.network            = cardJSON.network;
//   this.card_image_url     = cardJSON.card_image_url;
//   this.card_received_date = cardJSON.card_received_date;
//   this.id                 = cardJSON.id;
// }

// function CardView(model){
//   this.model    = model;
//   this.el       = undefined;
// }

// CardView.prototype.render = function(){
//   var newCardEl = $('<div>').html('card append test');
//   this.el       = newCardEl;
//   return this;
// }

// function CardsCollection(){
//   this.models = {};
// }

// CardsCollection.prototype.add = function(cardJSON){
//   var newCard = new Card(cardJSON);
//   this.models[cardJSON.id] = newCard;
//   $(this).trigger('addCardFlare');
//   return this;
// }

// CardsCollection.prototype.create = function(paramObject){
//   var that = this;
//   $.ajax({
//     url: '/emails',
//     method: 'post',
//     dataType: 'json',
//     data: {card: paramObject},
//     success: function(data){
//       that.add(data);
//     }
//   })
// }

// CardsCollection.prototype.fetch = function(){
//   var that = this;
//   $.ajax({
//     url: '/emails',
//     dataType: 'json',
//     success: function(data){
//       for (idx in data){
//         that.add(data[idx]);
//       }
//     }
//   })
// }

// function clearAndDisplayCardsList(){

//   $('.cards-container').html('');

//   for(idx in cardsCollection.models){
//     var card      = cardsCollection.models[idx];
//     var cardView  = new CardView(card);
//     $('.cards-container').append(cardView.render().el);
//   }
// }

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
  var  $card      = $('<div>').attr('class','contact');
  var  $front     = $('<div>').attr('class', 'front');
  var  $aimage    = $('<a>').attr('href', '/').append(($('<img>').attr('src', this.model.card_image_url)));
  var  $back      = $('<div>').attr('class', 'back');
  var  $name      = $('<h5>').attr('class','contact-name').html(this.model.name);
  var  $email     = $('<p>').attr('class','contact-email').html(this.model.email);
  var  $phone     = $('<p>').attr('class','contact-phone').html(this.model.phone);
  var  $linkedinid= $('<p>').attr('class','contact-linkedinid').html(this.model.linkedinid);
  var  $location  = $('<p>').attr('class','contact-location').html(this.model.location);
  ($card).append(($front).append($aimage)).append(($back)
    .append($name).append($email).append($phone).append($linkedinid).append($location))

  this.el = $card;
  return this;
}

function ContactsCollection(){
  this.models = {};
}



ContactsCollection.prototype.create = function (paramObject){
  var that = this;
  $.ajax({
    url: '/contacts',
    method: 'post',
    dataType: 'json',
    data: {contact: paramObject},
    success: function(data){
      var contact = new Contact(data);
      that.models[contact.id] = contact;
    }
  })
}

ContactsCollection.prototype.add = function(contactJSON){
  var newContact = new Contact(contactJSON);
  this.models[contactJSON.id] = newContact;
  $(this).trigger('addFlare');
  return this;
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
};

//incorporate delete ajax call with animate shrink for cards & contacts?

function clearAndDisplayContactsList(){
  $('.contacts-container').html('').fadeOut('slow');
  for(idx in contactsCollection.models){
    var contact     = contactsCollection.models[idx];
    var contactView = new ContactView(contact);
    $('#contacts-container').append(contactView.render().el).hide().show('slow')
  }
}
// show contacts button method?

var contactsCollection = new ContactsCollection();
var cardsCollection    = new CardsCollection();

$(function(){

  contactsCollection.fetch();

  $('.show-contacts').on('click', function(){
    clearAndDisplayContactsList();
  })

  $('.hide-contacts').click(function(){
    $('#contacts-container').toggle();
  });

  $('.show-cards').on('click', function(){
    $('#cards-container').load('/cards').hide().fadeIn('slow');
  });
  $('.hide-cards').click(function(){
    $('#cards-container').toggle();
  })
})

