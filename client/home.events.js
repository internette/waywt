 Template.home.events({
    'click #clearcountry': function(){
      Session.set('thiscountry', '');
    },
    'click #showCountries': function(e){
      e.preventDefault();
      var countrylist = document.getElementById('countrieslist');
      countrylist.style.height='300px';
      document.getElementById('showCountries').setAttribute('id', 'hideCountries');
      document.getElementById('citieslist').style.height='0px';
    },
    'click #hideCountries': function(e){
      e.preventDefault();
      var countrylist = document.getElementById('countrieslist');
      countrylist.style.height='0px';
      document.getElementById('hideCountries').setAttribute('id', 'showCountries');
    },
    'click #showCities': function(e){
      e.preventDefault();
      var citylist = document.getElementById('citieslist');
      citylist.style.height='300px';
      citylist.style.overflowY='auto';
      document.getElementById('showCities').setAttribute('id', 'hideCities');
    },
    'click #hideCities': function(e){
      e.preventDefault();
      var citylist = document.getElementById('citieslist');
      citylist.style.height='0px';
      document.getElementById('hideCities').setAttribute('id', 'showCities');
    }
  });