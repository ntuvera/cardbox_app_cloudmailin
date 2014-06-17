console.log('Stop Peeking...!')

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


  $('.show_contacts').on('click', function(){
    contactsCollection.fetch();
    clearAndDisplayContactsList();
    $('.contacts-container').load('/contacts').hide().fadeIn('slow');
  })


  $(contactsCollection).on('addFlare', function(){
    clearAndDisplayContactsList();
  })


  $('.show-contacts-on-map').on('click', function(){
    contactsCollection.fetch();
     
    for(idx in contactsCollection.models){       
      
      var contact = contactsCollection.models[idx];  

      // 1. get the location (address) of the contact 
      var location = contact.location;
      console.log(location);   
      
      // 2. initialize mapOptions
      var mapOptions = {
          zoom: 12,
          // center: myLatlng
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

      // 3. get the div to show the map   
      var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

      // 4. geocode address into latitude and longitude and drop a marker at that position
      var geocoder = new google.maps.Geocoder();
    
      geocoder.geocode( { 'address': location}, function(results, status) {

        // drop the marker (Callback function)  
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({  map: map,  position: results[0].geometry.location });
          } else { 
            alert("Geocode was not successful for the following reason: " + status);
          }
       });
     } // end for

  }) // end click


})
