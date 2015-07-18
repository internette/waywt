Countries = new Mongo.Collection('countries');
Cities = new Mongo.Collection('cities');
Posts = new Mongo.Collection('posts');

if (Meteor.isClient) {

}

if (Meteor.isServer) {

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