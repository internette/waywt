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