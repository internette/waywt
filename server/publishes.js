  Meteor.publish('allcountries', function(){
    return Countries.find();
  });
  Meteor.publish('allcities', function(){
    return Cities.find();
  });
  Meteor.publish('city', function(thiscity){
    return Cities.find({name: thiscity});
  });
  Meteor.publish('posts', function(thiscity, thisstate){
    return Posts.find({city: thiscity, state: thisstate});
  });