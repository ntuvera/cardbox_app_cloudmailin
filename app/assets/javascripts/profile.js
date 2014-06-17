console.log('Stop Peeking...!')

// Cards Show Button //
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

function CardView(model){
  this.model    = model;
  this.el       = undefined;
}

CardView.prototype.render = function(){
  var newCardEl = $('<div>').html('card append test');
  this.el       = newCardEl;
  return this;
}

function CardsCollection(){
  this.models = {};
}

CardsCollection.prototype.add = function(cardJSON){
  var newCard = new Card(cardJSON);
  this.models[cardJSON.id] = newCard;
  $(this).trigger('addCardFlare');
  return this;
}

CardsCollection.prototype.create = function(paramObject){
  var that = this;
  $.ajax({
    url: '/emails',
    method: 'post',
    dataType: 'json',
    data: {card: paramObject},
    success: function(data){
      that.add(data);
    }
  })
}

CardsCollection.prototype.delete = function(){
  var that = this;
  $.ajax({
    url: '/emails',
    method: 'delete',
    dataType: 'json',
    success: function(){
    }
  })
}

CardsCollection.prototype.fetch = function(){
  var that = this;
  $.ajax({
    url: '/emails',
    dataType: 'json',
    success: function(data){
      for (idx in data){
        that.add(data[idx]);
      }
    }
  })
}

function clearAndDisplayCardsList(){

  $('.cards-container').html('');

  for(idx in cardsCollection.models){
    var card      = cardsCollection.models[idx];
    var cardView  = new CardView(card);
    $('.cards-container').append(cardView.render().el);
  }
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
  var  $card      = $('<div>').attr('class','contact');
  var  $front     = $('<div>').attr('class', 'front');
  var  $aimage    = $('<a>').attr('href', '/').append(($('<img>').attr('src', this.model.card_image_url)));
  var  $back      = $('<div>').attr('class', 'back');
  var  $name      = $('<h5>').attr('class','contact-name').html(this.model.name);
  var  $email     = $('<p>').attr('class','contact-email').html(this.model.email);
  var  $phone     = $('<p>').attr('class','contact-phone').html(this.model.phone);
  var  $linkedinid= $('<p>').attr('class','contact-linkedinid').html(this.model.linkedinid);
  var  $location  = $('<p>').attr('class','contact-location').html(this.model.location);
  var  $delButton = $('<button>').attr('class', 'delete-contact').html('delete');
  ($card).append(($front).append($aimage)).append(($back)
    .append($name).append($email).append($phone).append($linkedinid).append($location).append($delButton));

  this.el = $card;
  return this;
}

function ContactsCollection(){
  this.models = {};
}



ContactsCollection.prototype.create = function(paramObject){
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

ContactsCollection.prototype.delete = function(){
  var that = this;
  $.ajax({
    url: '/contacts',
    method: 'post',
    dataType: 'json',
    type: 'delete',
    success: function(){
    }
  });
  event.preventDefault();
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
  $('#contacts-container').html('').fadeOut('slow');
  for(idx in contactsCollection.models){
    var contact     = contactsCollection.models[idx];
    var contactView = new ContactView(contact);
    $('#contacts-container').append(contactView.render().el).hide().show('slow')
  }
}

function showContactsOnMap() {
   // 1. initialize mapOptions
    var mapOptions = {
          zoom: 4,
          // center: myLatlng
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }


    // 2. get the div to show the map

    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    // 3. geocode address into latitude and longitude and drop a marker at that position
    var geocoder = new google.maps.Geocoder();


    // 4. loop through all the contacts
    for(idx in contactsCollection.models){

      var contact = contactsCollection.models[idx];

      var contactLocation = contact.location;
      // console.log("contact location: ", contactLocation);


      // self calling function, that takes all the parameters for the marker/infowindow
      // !!!
      (function(contactLocation, contactName, contactEmail, contactCardImageUrl, contactPhone){
        geocoder.geocode( {'address': contactLocation}, function(results, status) {


        // drop the marker (Callback function)
        if (status == google.maps.GeocoderStatus.OK) {

            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location,
              animation: google.maps.Animation.DROP,
              title: contactName
            });

            var contentString = '<div id="content">'+
              '<div id="siteNotice">'+
              '</div>'+
              '<h1 id="firstHeading" class="firstHeading">'+contactName+'</h1>'+
              '<div id="bodyContent">'+
              '<p>email: <a href="mailto:'+contactEmail+'" target="_top">'+contactEmail+'</a></p>'+
              '<p>location: '+contactPhone+'</p>'+
              '<p>location: '+contactLocation+'</p>'+
              '<p><a href="'+contactCardImageUrl+'" target="_bank"><img style="width:80px;"src='+contactCardImageUrl+' alt="Business Card" /></a></p>'+

              '</div>'+
              '</div>';

            marker.info = new google.maps.InfoWindow({
              content:'<div style="width:320px; height:260px">'+contentString+'</div>'
            });

            google.maps.event.addListener(marker, 'click', function() {
              marker.info.open(map,marker);
            });

          } else {
            alert("Geocode was not successful for the following reason: " + status);
          }

        });

      })(contact.location, contact.name, contact.email, contact.card_image_url, contact.phone); // end self calling function

     } // end for
}



var contactsCollection = new ContactsCollection();
var cardsCollection    = new CardsCollection();



$(function(){


  contactsCollection.fetch();

  $('.show-contacts').on('click', function(){
    clearAndDisplayContactsList();
  })

  $('.hide-contacts').on('click', function(){
    $('#contacts-container').fadeOut('fast');
  })

  $('.show-cards').on('click', function(){
    $('#cards-container').load('/cards').hide().fadeIn('slow');
  });

  $('.hide-cards').on('click', function(){
    $('#cards-container').fadeOut('fast');

  })

  $('.show-contacts-on-map').on('click', function(){
    showContactsOnMap();
  })

  $('.delete-contact').on('click', function(){
    console.log('delete-contact button clicked');
  })

})

