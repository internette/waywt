  Template.postForm.events({
    'submit #newpost': function(e){
      e.preventDefault();
      console.log(this);
    }
  });