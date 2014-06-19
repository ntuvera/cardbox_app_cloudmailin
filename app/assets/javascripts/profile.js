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


CardsCollection.prototype.delete = function(email){

  var that = this;
  $.ajax({
    url: '/emails/' + email,
    method: 'DELETE',
    dataType: 'json',
    success: function(){
      alert('card deleted');
    },
    error: function(){
      alert('card delete failed');
    }
  });
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
  var  $card      = $('<div>').attr('class','contact '+this.model.id);
  var  $front     = $('<div>').attr('class', 'front');
  var  $aimage    = $('<a>').attr('href', '/').append(($('<img>').attr('src', this.model.card_image_url)));
  var  $back      = $('<div>').attr('class', 'back');
  var  $name      = $('<h>').attr('class','contact-name').html(this.model.name);
  var  $email     = $('<p>').attr('class','contact-email').html(this.model.email);
  var  $phone     = $('<p>').attr('class','contact-phone').html(this.model.phone);
  var  $linkedinid= $('<p>').attr('class','contact-linkedinid').html(this.model.linkedinid);
  var  $location  = $('<p>').attr('class','contact-location').html(this.model.location);
  var  $delButton = $('<button>').attr('class', 'delete-contact '+this.model.id).html('delete');

  var $profilesButton = $('<button>').attr('class', 'find-contact '+this.model.id).html('find on Linkedin');


  ($card).append(($front).append($aimage)).append(($back)
    .append($name).append($email).append($phone).append($linkedinid).append($location).append($delButton).append($profilesButton));

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


ContactsCollection.prototype.delete = function(contact){

  var that = this;
  console.log(that)
  $.ajax({
    url: '/contacts/' + contact,
    method: 'DELETE',
    dataType: 'json',
    success: function(){
      $('.contact.' + contact ).fadeOut('slow');
      contactsCollection.models = {};
    },

    error: function(){
      alert('delete failed');
    }
  });
}

ContactsCollection.prototype.add = function(contactJSON){
  var newContact = new Contact(contactJSON);
  this.models[contactJSON.id] = newContact;  
  return this;
};


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

function LinkedInResultView(data){
  this.name = data.name;
  this.link = data.page_url;
  this.image = data.image;e
  this.location = data.location;
  this.job = data.job_title;
  // that = this;
  this.el = undefined;
}

LinkedInResultView.prototype.render = function(){
  var $li = $('<li>').addClass('linked-item');
  var $nameSpan = $('<p>').addClass('name-span listed').text(this.name);
  var $image = $('<div>').addClass('linked-img listed').html("<img src='"+this.image+"' alt=''>");
  var $linkSpan = $('<p>').addClass('link-span listed').html("<a href='"+this.link+"' target='_blank'> profile </a>");
  var $locationSpan = $('<p>').addClass('location-span listed').text(this.location);
  var $jobTitleSpan = $('<p>').addClass('job-span listed').text(this.job);

  // $li.append('<hr/>')
  $li.append($image);
  $li.append($nameSpan);
  $li.append($linkSpan);
  $li.append($locationSpan);
  $li.append($jobTitleSpan);
  this.el = $li
  return this;
}

ContactsCollection.prototype.findOnLinkedIn = function(contact){

  var that = this;
  //needs to select the right contact
  $.ajax({
    url: '/contacts/'+ contact + '/find',
    method: 'GET',
    dataType: 'json',
    success: function(data){

    var $div = $('<div>').addClass('linked-profiles');
    var $ul = $('<ul>').addClass('linked-results');
    $div.append($ul);
    // $('body').append($div);
    $('#linkedin-search-container').append($div);
      for ( idx in data){
        console.log(data[idx])
        // $('body').append($('<li>').html(data[idx].name))

         var newPerson = new LinkedInResultView(data[idx]);

        $('.linked-results').append(newPerson.render().el)
        $('.linked-results').append('<hr/>')
      }
    },
    error: function(){

    }
  });
}


function LinkedInConnectionsView(data){
  this.firstname = data.first_name;
  this.lastname = data.last_name;
  this.link = data.site_standard_profile_request.url;
  this.image = data.picture_url;
  this.location = data.location.name;  
  // that = this;
  this.el = undefined;
}

LinkedInConnectionsView.prototype.render = function(){
  var $li = $('<li>').addClass('linked-item');
  var $nameSpan = $('<p>').addClass('name-span listed').text(this.firstname + " " + this.lastname); 
  var $image = $('<div>').addClass('linked-img listed').html("<img src='"+this.image+"' alt=''>");
  var $linkSpan = $('<p>').addClass('link-span listed').html("<a href='"+this.link+"' target='_blank'> profile </a>");
  var $locationSpan = $('<p>').addClass('location-span listed').text(this.location);  
  var $a = $('<a>').attr('href',this.link).attr('target', '_blank');
  var $img = $('<img>').attr('src',this.image)
  
  $li.append($a);
  $a.append($img);
  $li.append($nameSpan)
  $li.append($locationSpan);  
  this.el = $li
  return this;
}


ContactsCollection.prototype.showLinkedInNetwork = function(contact){

  var that = this;
  
  $.ajax({
    url: '/profile',
    method: 'GET',
    dataType: 'json',
    success: function(data){
     
    var $div = $('<div>').addClass('linked-profiles');
    var $ul = $('<ul>').addClass('linked-results');
    $div.append($ul);
 
    $('#linkedin-network-container').append($div);

    for(idx in data.all){
        console.log(data.all[idx]);       
        var newPerson = new LinkedInConnectionsView(data.all[idx]);

        $('.linked-results').append(newPerson.render().el)
        $('.linked-results').append('<hr/>')
      }
    },
    error: function(){

    }
  });

}


ContactsCollection.prototype.showLinkedInNetworkOnMap = function(contact){

  var that = this;
  
  $.ajax({
    url: '/profile',
    method: 'GET',
    dataType: 'json',
    success: function(data){
      // console.log("inside the fetchLinkedInNetwork callback function");
      // for ( idx in data){
      //     console.log(data[idx])
      // };
      showLinkedinNetworkOnMap(data);  
    },
    error: function(){

    }
  });
}


function clearAndDisplayContactsList(){
  $('#contacts-container').html('').fadeOut('slow');
  contactsCollection.fetch();
  for(idx in contactsCollection.models){
    var contact     = contactsCollection.models[idx];
    var contactView = new ContactView(contact);
    $('#contacts-container').append(contactView.render().el).show('slow')
  }
}



function showContactsOnMap() {

    // 1. initialize mapOptions
    var mapOptions = {
          zoom: 3,
          center: new google.maps.LatLng(39.809734, -98.555620), // Lebanon, Kansas (center of the USA)
          mapTypeId: google.maps.MapTypeId.ROADMAP          
        }   


    // 2. get the div to show the map
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    // 3. geocode address into latitude and longitude and drop a marker at that position
    var geocoder = new google.maps.Geocoder();


    // 4. loop through all the contacts  // ===>>  NOT MORE THAN 10, BECAUSE OF GOOGLE'S LIMITATIONS
    for(idx in contactsCollection.models){ //===>> LATER: get all Linkedin contacts, store latitude and longitude in database 

      var contact = contactsCollection.models[idx];

      var contactLocation = contact.location;
      // console.log("contact location: ", contactLocation);

      // self calling function, that takes all the parameters for the marker/infowindow
      // !!!
      (function(contactLocation, contactName, contactEmail, contactCardImageUrl, contactPhone){
        geocoder.geocode( {'address': contactLocation}, function(results, status) {

        // drop the marker (Callback function)
        if (status == google.maps.GeocoderStatus.OK) {
            console.log(results[0].geometry.location.k)
            console.log(results[0].geometry.location.A)

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
// here we want a button with the link to the Linkedin profile
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




function showLinkedinNetworkOnMap(data) {

    // 1. initialize mapOptions
    var mapOptions = {
          zoom: 3,
          center: new google.maps.LatLng(39.809734, -98.555620), // Lebanon, Kansas (center of the USA)
          mapTypeId: google.maps.MapTypeId.ROADMAP          
        }   

    // 2. get the div to show the map
    map = new google.maps.Map(document.getElementById("map-linkedin-network"), mapOptions);

    // 3. geocode address into latitude and longitude and drop a marker at that position
    var geocoder = new google.maps.Geocoder();    

    // 4. loop through all the Linkedin network contacts  // ===>>  LIMITED TO 10 FOR NOW, BECAUSE OF GOOGLE'S LIMITATIONS
    // for(idx in data.all){  ===>> LATER: get all Linkedin contacts, store latitude and longitude in database 

    for (i = 0; i < 9; i++){
      var contactLocation = data.all[i]['location']['name'];   
      console.log("contact location: ", contactLocation);

      (function(contactLocation){     
        geocoder.geocode( {'address': contactLocation}, function(results, status) {     
        if (status == google.maps.GeocoderStatus.OK) {

            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location,
              animation: google.maps.Animation.DROP,
              title: contactLocation
            });
          } else {
            alert("Geocode was not successful for the following reason: " + status);
          }
        });
      })(contactLocation); 

    } // end for
}



var contactsCollection = new ContactsCollection();
var cardsCollection    = new CardsCollection();



$(function(){

  contactsCollection.fetch();

  $('.show-contacts').on('click', function(){
    contactsCollection.fetch();
    clearAndDisplayContactsList();

    $('.find-contact').on('click', function(){

      $('.linked-results').html('');
      contactsCollection.findOnLinkedIn(this.classList[1])

    });

    $('.delete-contact').on('click', function(){
      contactsCollection.delete(this.classList[1]);
      contactsCollection.fetch();
    });
  });

  $('.hide-contacts').on('click', function(){
    $('#contacts-container').fadeOut('fast');
  })


  $('#cards-container').hide();


  $('.show-cards').on('click', function(){
    $('#cards-container').fadeIn('slow');
    $('.delete-card').on('click', function(){
      alert('delete card clicked');
      cardsCollection.delete(this.classList[1]);
      clearAndDisplayCardsList();
      clearAndDisplayContactsList();
    })
  });

  $('.hide-cards').on('click', function(){
    $('#cards-container').fadeOut('fast');
  })

  $('.show-contacts-on-map').on('click', function(){
    showContactsOnMap();
  })

  $('#map-canvas').hide();

  $('.show-contacts-on-map').on('click', function(){
    $('#map-canvas').fadeIn('slow');
  })

  $('#contacts-container').hide();

  $('.hide-contacts-on-map').on('click', function(){
    $('#map-canvas').fadeOut('fast');
  })


  $('#linkedin-network-container').hide();

  $('.show-linkedin-connections').on('click', function(){    
    contactsCollection.showLinkedInNetwork();
    $('#linkedin-network-container').fadeIn('slow')
  })

  $('.hide-linkedin-connections').on('click', function(){
    $('#linkedin-network-container').fadeOut('fast')
  })

  // this is not being used at the moment, because of Google geocoding requests limitations
  // $('.show-linkedin-connections-on-map').on('click', function(){  
  //   contactsCollection.showLinkedInNetworkOnMap();     
  // })

  // $('.hide-linkedin-connections-on-map').on('click', function(){  
  //    $('#map-linkedin-network').fadeOut('fast') 
  // })

})
