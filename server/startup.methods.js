  Meteor.startup(function () {
    // code to run on server at startup
    Meteor.methods({
      addCountry: function(){
       var countries = JSON.parse(Assets.getText('countries.json'));
        _.each(countries, function(country){
          if(Countries.find(country).fetch().length>=1){
            console.log('This country already exists');
          } else {
            Countries.insert(country);
          }
        });
      },
      addCity: function(){
       var cities = JSON.parse(Assets.getText('cities.json'));
        _.each(cities, function(city){
          if(Cities.find(city).fetch().length>=1){
            console.log('This city already exists');
          } else {
            Cities.insert(city);
          }
        });
      }
   });
  });