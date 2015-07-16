Countries = new Mongo.Collection('countries');
Cities = new Mongo.Collection('cities');
Posts = new Mongo.Collection('posts');

if (Meteor.isClient) {
  Template.registerHelper('_', function(){
    return _
  });
  Template.header.events({
    'click #login':function(e){
      e.preventDefault();
      document.getElementById('landingcontainer').style.display = 'block';
    },
    'click #hide':function(e){
      e.preventDefault();
      document.getElementById('landingcontainer').style.display = 'none';
    }
  });
  Template.footer.events({
    'click #synccountries': function(){
      Meteor.call('addCountry');
    },
    'click #synccities': function(){
      Meteor.call('addCity');
    }
  });
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
  Template.postForm.events({
    'submit #newpost': function(e){
      e.preventDefault();
      console.log(this);
    }
  });
  Template.home.rendered = function(){
    Session.set('thiscountry', '');
  }
  Template.singlecountry.events({
    'click': function(){
      Session.set('thiscountry', this.name);
      var countrylist = document.getElementById('countrieslist');
      countrylist.style.height='0px';
      document.getElementById('hideCountries').setAttribute('id', 'showCountries');
      document.getElementById('showCities').setAttribute('onclick', 'true');
    }
  });
  Template.singlecity.helpers({
    state: function(){
      if(this.country==="United States"){
        var state = (this.state).toString();
      if(state.includes('north')===true){
        return ', ' + state.replace('north', 'North ');
      } else if(state.includes('south')===true){
        return ', ' + state.replace('south', 'South ');
      } else if(state.includes('rhode')===true){
        return ', ' + state.replace('rhode', 'Rhode ');
      } else if(state.includes('west')===true){
        return ', ' + state.replace('west', 'West ');
      } else if(state.includes('new')===true){
        return ', ' + state.replace('new', 'New ');
      } else if(state.includes('dc')===true){
        return ''
      } else {
        return ', ' + state;
      }
      }
    }
  });
  Template.posts.helpers({
    post: function(){
      return [Posts.find(), Cities.find()]
    }
  });
}

if (Meteor.isServer) {
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
}
Router.configure({
  layoutTemplate: 'layout'
});
Router.route('/', function(){
  this.render('home');
}, {
  name: 'home',
  waitOn: function(){
    return [Meteor.subscribe('allcountries'), Meteor.subscribe('allcities')];
  }
});
Router.route('/landing',function(){
  this.render('landing');
},{name: 'landing'});
Router.route('/signup',function(){
  this.render('signup');
},{name: 'signup'});
Router.route('/login',function(){
  this.render('login');
},{name: 'login'});
Router.route('/:name', function(){
  this.render('posts', {
    data: function(){
      return {posts: Posts.find(), cities: Cities.findOne()}
    }
  });
}, {
  name: 'posts',
  waitOn: function(){
    return [Meteor.subscribe('posts', this.params.country, this.params.name), Meteor.subscribe('city', this.params.name, this.params.state)];
  }
});