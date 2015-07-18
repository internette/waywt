function slideOpen(menu, fromMenu, toMenu){
   if(fromMenu >= toMenu){         
       menu.style.visibility = 'visible';
       return;  
   } else {
       var obj = menu;
       obj.style.height = '0%';
       obj.style.height = fromMenu + "%";
       setTimeout(function(){
           slideOpen(menu, fromMenu + 1, toMenu);
       }, 5);
   }
}
function slideClose(menu, fromMenu, toMenu){
   if(toMenu >= fromMenu){         
   } else {
       var obj = menu;
       obj.style.height = '0%';
       obj.style.height = fromMenu + "%";
       setTimeout(function(){
           slideClose(menu, fromMenu - 1, toMenu);
       }, 5);
   }
}
function toggleMenu() {
  event.preventDefault();
  if(document.getElementById('landingcontainer').style.height<'99%'){
    slideOpen(document.getElementById('landingcontainer'), -1, 100);
  } else {
    slideClose(document.getElementById('landingcontainer'), 100, -1);
  }
}