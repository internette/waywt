  Template.posts.helpers({
    post: function(){
      return [Posts.find(), Cities.find()]
    }
  });