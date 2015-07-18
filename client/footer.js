
  Template.footer.events({
    'click #synccountries': function(){
      Meteor.call('addCountry');
    },
    'click #synccities': function(){
      Meteor.call('addCity');
    }
  });