
  Template.home.helpers({
    country: function(){
      return Countries.find();
    },
    city: function(){
      return Cities.find({country: Session.get('thiscountry')}, {sort: {name: 1}});
    },
    selectedCountry: function(){
      return Session.get('thiscountry');
    }
  });