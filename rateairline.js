//this is not working!

$(document).ready(() => {

body.append(    "<div class='background'>" +
                "<div class='topContainer'>" +
                "   <table>" +
                "       <tr>" +
                "           <td>Airline</td>" +
                "           <td><div class='dropdown'><button onclick='searchFlights()' class='dropbtn'>Select your airline</button>" +
                "               <div id='airlineDropdown' class='dropdown-content'>" +
                "                   <input type='text' placeholder='Enter an airline' id='chooseAirline' onkeyup='filter3()'>" +                
                "               </div></div></td>" + 

                "       </tr>" 
            );
  
});