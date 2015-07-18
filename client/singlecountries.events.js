  Template.singlecountry.events({
    'click': function(){
      Session.set('thiscountry', this.name);
      var countrylist = document.getElementById('countrieslist');
      countrylist.style.height='0px';
      document.getElementById('hideCountries').setAttribute('id', 'showCountries');
      document.getElementById('showCities').setAttribute('onclick', 'true');
    }
  });