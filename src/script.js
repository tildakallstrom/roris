
js
const foo = (a, b) => a + b;
function hamburgermenu(m) {
    m.classList.toggle("change");
  }
  
  /* annan meny */
  // variabler för navbar/hamburgarmeny
  let navbar = document.querySelector(".navbar")
   let ham = document.querySelector(".ham")
   
   // funktion för att klicka i och klicka ur meny
   function toggleHamburger(){
     // öppna
     navbar.classList.toggle("showNav")
     // stäng
     ham.classList.toggle("showClose")
   }
   // eventlyssnare till click
   ham.addEventListener("click", toggleHamburger)
   
  