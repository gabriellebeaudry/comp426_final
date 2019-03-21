var root_url = "http://comp426.cs.unc.edu:3001/";
var fromLocation;
var toLocation;
var airlineId;
var planeId;
var FromAirport;
var Fromlatitude;
var Fromlongitude;
var ToAirport;
var Tolatitude;
var Tolongitude;
var airportFrom;
var airportTo;
var flight_line;
var AirportName = "Name";
var AirportCode = "Code";
var AirportCity = "City";
var AirportLat = "Latitude";
var AirportLon = "Longitude";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Javascripts for dropdown menu for search flights
function searchFrom() {
    document.getElementById("fromDropdown").classList.toggle("show");
}

function searchTo() {
    document.getElementById("toDropdown").classList.toggle("show");
}

function searchAirline() {
    document.getElementById("airlineDropdown").classList.toggle("show");
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Javascripts for dropdown menu for filtering flights
function filter1() {
    var input, filter, ul, li, a, i;
    input = document.getElementById('locationFrom');
    filter = input.value.toUpperCase();
    div = document.getElementById('fromDropdown');
    a = div.getElementsByTagName('button');

    for (i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = '';
        } 
        else {
            a[i].style.display = 'none';
        }
    }
}

function filter2() {
    var input, filter, ul, li, a, i;
    input = document.getElementById('locationTo');
    filter = input.value.toUpperCase();
    div = document.getElementById('toDropdown');
    a = div.getElementsByTagName('button');

    for (i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = '';
        } 
        else {
            a[i].style.display = 'none';
        }
    }
}

function filter3() {
    var input, filter, ul, li, a, i;
    input = document.getElementById('chooseAirline');
    filter = input.value.toUpperCase();
    div = document.getElementById('airlineDropdown');
    a = div.getElementsByTagName('button');

    for (i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = '';
        } 
        else {
            a[i].style.display = 'none';
        }
    }
}

function filter4() {
    var input, filter, ul, li, a, i;
    input = document.getElementById('choosePlane');
    filter = input.value.toUpperCase();
    div = document.getElementById('planeDropdown');
    a = div.getElementsByTagName('button');

    for (i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = '';
        } 
        else {
            a[i].style.display = 'none';
        }
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Login form

let airports_list = null;
airports_list = $("<ul id='airports_list'></ul>");

$(document).ready(() => {
  	$('#login_btn').on('click', () => {
        build_project_interface(); 

//		let user = $('#user').val();
//		let pass = $('#password').val();
//
//		console.log(user);
//		console.log(pass);
//
//		$.ajax(root_url + 'sessions',
//		{
//			type: 'POST',
//			xhrFields: {withCredentials: true},
//			data: {
//            user:{
//				  username: user,
//				  password: pass
//            }
//			},
//			success: () => {
//                build_project_interface();
//			},
//			error: (jqxhr, status, error) => {
//				alert('invalid user name or password');
//			}
//		});
	});
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    // Dropdown menu for choosing from/to locations
    $('body').on('click', '.airportsBtnFrom', function() {      
        fromLocation = $(this).attr('id');
        $(this).parent().parent().find(".dropbtn").html($(this).text());
        document.getElementById("fromDropdown").classList.toggle("show");
    });
    
    $('body').on('click', '.airportsBtnTo', function() {      
        toLocation = $(this).attr('id');                                              
        $(this).parent().parent().find(".dropbtn").html($(this).text());
        document.getElementById("toDropdown").classList.toggle("show");
    }); 
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Dropdown menu for choosing airline
    $('body').on('click', '.airlineBtn', function() {
        airlineId = $(this).attr('id');
        $(this).parent().parent().find(".dropbtn").html($(this).text());
        document.getElementById("airlineDropdown").classList.toggle("show");
    });
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Rate airline
    $('body').on('click', '.ratebtn', function(){
        let userRatingInput = document.getElementById("ratingid").valueAsNumber;
                                                                                                                                                     
        $.ajax(root_url + "airlines/" + airlineId,
        {
            type: 'PUT',
            data: {
                "airline":{
                    "info": userRatingInput
                }
            },
            xhrFields: {withCredentials: true},
            success: (response) =>{
                alert("airline rated!");
                
            },
            error:()=>{
                alert("request failed");
            }
        });
      });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Add airline URL
    $('body').on('click', '.urlbtn', function(){
        let userUrlInput = document.getElementById("urlid").value;
        console.log(userUrlInput);
                                                                                                                                                     
        $.ajax(root_url + "airlines/" + airlineId,
        {
            type: 'PUT',
            data: {
                "airline":{
                    "logo_url": userUrlInput
                }
            },
            xhrFields: {withCredentials: true},
            success: (response) =>{
                alert("URL added!");
                // if (userUrlInput != null){
                //   document.getElementById("urlid").reset;
                // }

                
            },
            error:()=>{
                alert("request failed");
            }
        });
      });

      
      

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// This area is for add/update new airport, flight and plane
    
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // Add new airport
      $('body').on('click', '.addAirportBtn', function(){
          $('body').empty();
          $('body').css("background-image", "url(images/background.jpg)");
          $('body').append("<div class='topContainer' id='newContainer'>" +
                      "   <img src='images/logoPage.png' id='logo' align='middle'>" +
			          "        <ul>" +
				      "           <li><a href=''>Home</a></li>" +
				      "           <li><a href=''>About</a></li>" +
				      "           <li><a href=''>Booking</a></li>" +
				      "           <li><a href=''>Contact</a></li>" +
			          "        </ul>" +
                      "</div>"); 
          
          $('body').append("<div class='newObject'>" +
                      "     <h1 class='Title'>New Airport Form</h1>" +
                      "         <button class='updateAirport'>Click here to update existed airport info</button>" +
                      "         <table>" +
                      "             <tr>" +
                      "                 <td>Airport's Name</td>" +
                      "                 <td><input type='text' class='newAirportName'></td>" +
                      "             </tr>" +
                      "             <tr>" +
                      "                 <td>Airport's Code</td>" +
                      "                 <td><input type='text' class='newAirportCode'></td>" +
                      "             </tr>" +
                      "             <tr>" +
                      "                 <td>City</td>" +
                      "                 <td><input type='text' class='newAirportCity'></td>" +
                      "             </tr>" +
                      "             <tr>" +
                      "                  <td>Latitude</td>" +
                      "                  <td><input type='text' class='newAirportLat'></td>" +
                      "             </tr>" +
                      "             <tr>" +
                      "                 <td>Longitude</td>" +
                      "                 <td><input type='text' class='newAirportLon'></td>" +
                      "             </tr>" +
                      "         </table>" +
                      "     <div class='submitOrcancel'>" +
                      "         <input type='submit' value='Submit' class='newAirportSubmit' id='buttonForm'>" +
                      "         <button class='cancel' id='buttonForm'>Cancel</button>" +
                      "     </div>" +
                      "</div>");
      });
    
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // Update pre-existed airport
      $('body').on('click', '.updateAirport', function(){
          $('body').empty();
          $('body').css("background-image", "url(images/background.jpg)");
          
          $.ajax(root_url + 'airports',
          {
                type: 'GET',
                xhrFields: {withCredentials: true},
                success: (airports) =>{   
                    for (let i = 0; i < airports.length; i++){
                        $("#fromDropdown").append("<button class='airportsBtnFrom' id=" + airports[i].id + ">" + airports[i].city + " (" + airports[i].code + ")" + "</button>");
                    }
                },
                error:()=>{
                    alert("request failed");
                }
          });
           
          $('body').append("<div class='topContainer' id='newContainer'>" +
                      "   <img src='images/logoPage.png' id='logo' align='middle'>" +
			          "        <ul>" +
				      "           <li><a href=''>Home</a></li>" +
				      "           <li><a href=''>About</a></li>" +
				      "           <li><a href=''>Booking</a></li>" +
				      "           <li><a href=''>Contact</a></li>" +
			          "        </ul>" +
                      "</div>"); 
          
          $('body').append("<div class='newObject'>" +
                      "     <h1 class='Title'>Update Airport Form</h1>" +
                      "     <div class='dropdown' id='uniqueDrop'><button class='dropbtn' onclick='searchFrom()'>Select Location</button>" +
                      "         <div id='fromDropdown' class='dropdown-content'>" +
                      "         <input type='text' placeholder='Enter a city or airport' id='locationFrom' onkeyup='filter1()'>" +
                      "         </div></div>" +
                      "     <div class='submitOrcancel'>" +
                      "         <button id='buttonForm' class='buttonUpdateAirport'>Update</button>" +
                      "         <button class='cancel' id='buttonForm'>Cancel</button>" +
                      "     </div>" +
                      "</div>");
      });
    
      $('body').on('click', '.buttonUpdateAirport', function(){
          $('body').empty();
          $('body').css("background-image", "url(images/background.jpg)");
          
          $('body').append("<div class='topContainer' id='newContainer'>" +
                      "   <img src='images/logoPage.png' id='logo' align='middle'>" +
			          "        <ul>" +
				      "           <li><a href=''>Home</a></li>" +
				      "           <li><a href=''>About</a></li>" +
				      "           <li><a href=''>Booking</a></li>" +
				      "           <li><a href=''>Contact</a></li>" +
			          "        </ul>" +
                      "</div>"); 
          
          $.ajax(root_url + 'airports',
          {
                type: 'GET',
                xhrFields: {withCredentials: true},
                success: (airports) =>{   
                    for (let i = 0; i < airports.length; i++){
                        if (airports[i].id == fromLocation) {
                            AirportName = airports[i].name;
                            AirportCode = airports[i].code;
                            AirportCity = airports[i].city;
                            AirportLat = airports[i].latitude;
                            AirportLon = airports[i].longitude;
                                  
                            $('body').append("<div class='newObject'>" +
                                              "     <h1 class='Title'>Update Airport Form</h1>" +
                                              "         <table>" +
                                              "             <tr>" +
                                              "                 <td>Airport's Name</td>" +
                                              "                 <td><input type='text' class='newAirportName' value=" + AirportName + "></td>" +
                                              "             </tr>" +
                                              "             <tr>" +
                                              "                 <td>Airport's Code</td>" +
                                              "                 <td><input type='text' class='newAirportCode' value=" + AirportCode + "></td>" +
                                              "             </tr>" +
                                              "             <tr>" +
                                              "                 <td>City</td>" +
                                              "                 <td><input type='text' class='newAirportCity' value=" + AirportCity + "></td>" +
                                              "             </tr>" +
                                              "             <tr>" +
                                              "                  <td>Latitude</td>" +
                                              "                  <td><input type='text' class='newAirportLat' value=" + AirportLat + "></td>" +
                                              "             </tr>" +
                                              "             <tr>" +
                                              "                 <td>Longitude</td>" +
                                              "                 <td><input type='text' class='newAirportLon' value=" + AirportLon + "></td>" +
                                              "             </tr>" +
                                              "         </table>" +
                                              "     <div class='submitOrcancel'>" +
                                              "         <input type='submit' value='Submit' class='updateAirportSubmit' id='buttonForm'>" +
                                              "         <button class='cancel' id='buttonForm'>Cancel</button>" +
                                              "     </div>" +
                                              "</div>");
                        }
                    }                    
                },
                error:()=>{
                    alert("request failed");
                }
          });
      });
          
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // Add new flight
      $('body').on('click', '.addFlightBtn', function(){
          $('body').empty();
          $('body').css("background-image", "url(images/background2.jpg)");
          
          $.ajax(root_url + 'airports',
          {
                type: 'GET',
                xhrFields: {withCredentials: true},
                success: (airports) =>{   
                    for (let i = 0; i < airports.length; i++){
                        $("#fromDropdown").append("<button class='airportsBtnFrom' id=" + airports[i].id + ">" + airports[i].city + " (" + airports[i].code + ")" + "</button>");

                        $("#toDropdown").append("<button class='airportsBtnTo' id=" + airports[i].id + ">" + airports[i].city + " (" + airports[i].code + ")" + "</button>");
                    }
                },
                error:()=>{
                    alert("request failed");
                }
          });
          
          $('body').append("<div class='topContainer' id='newContainer'>" +
                      "   <img src='images/logoPage.png' id='logo' align='middle'>" +
			          "        <ul>" +
				      "           <li><a href=''>Home</a></li>" +
				      "           <li><a href=''>About</a></li>" +
				      "           <li><a href=''>Booking</a></li>" +
				      "           <li><a href=''>Contact</a></li>" +
			          "        </ul>" +
                      "</div>"); 
          
          $('body').append("<div class='newObject'>" +
                      "     <h1>New Flight Form</h1>" +
                      "         <table>" +
                      "             <tr>" +
                      "                 <td>Departure at</td>" +
                      "                 <td><input type='time' class='newFlightdep'></td>" +
                      "             </tr>" +
                      "             <tr>" +
                      "                 <td>Arrive at</td>" +
                      "                 <td><input type='time' class='newFlightarr'></td>" +
                      "             </tr>" +
                      "             <tr>" +
                      "                 <td>Number</td>" +
                      "                 <td><input type='text' class='newFlightnum'></td>" +
                      "             </tr>" +
                      "             <tr>" +
                      "                  <td>Departure Airport</td>" +
                      "                  <td><div class='dropdown'><button class='dropbtn' onclick='searchFrom()'>Select Location</button>" +
                      "                      <div id='fromDropdown' class='dropdown-content'>" +
                      "                      <input type='text' placeholder='Enter a city or airport' id='locationFrom' onkeyup='filter1()'>" +
                      "                      </div></div></td>" +
                      "             </tr>" +
                      "             <tr>" +
                      "                 <td>Arrival Airport</td>" +
                      "                 <td><div class='dropdown'><button class='dropbtn' onclick='searchTo()'>Select Location</button>" +
                      "                     <div id='toDropdown' class='dropdown-content'>" +
                      "                     <input type='text' placeholder='Enter a city or airport' id='locationTo' onkeyup='filter2()'>" +
                      "                     </div></div></td>" +
                      "             </tr>" +
                      "         </table>" +
                      "     <div class='submitOrcancel'>" +
                      "         <input type='submit' value='Submit' class='newFlightSubmit' id='buttonForm'>" +
                      "         <button class='cancel' id='buttonForm'>Cancel</button>" +
                      "     </div>" +
                      "</div>");
      });
    
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // Add new plane
      $('body').on('click', '.addAirplaneBtn', function(){
          $('body').empty();
          $('body').css("background-image", "url(images/background3.jpg)");
          
          $.ajax(root_url + 'airlines',
          {
                type: 'GET',
                xhrFields: {withCredentials: true},
                success: (airlines) =>{
                    for (let i = 0; i < airlines.length; i++){
                        if (airports[i].id == fromLocation) {
                            AirportName = airports[i].name;
                            AirportCode = airports[i].code;
                            AirportCity = airports[i].city;
                            AirportLat = airports[i].latitude;
                            AirportLon = airports[i].longitude;
                        }
                    }
                },
                error:()=>{
                    alert("request failed");
                }
          });
          
          $('body').append("<div class='topContainer' id='newContainer'>" +
                      "   <img src='images/logoPage.png' id='logo' align='middle'>" +
			          "        <ul>" +
				      "           <li><a href=''>Home</a></li>" +
				      "           <li><a href=''>About</a></li>" +
				      "           <li><a href=''>Booking</a></li>" +
				      "           <li><a href=''>Contact</a></li>" +
			          "        </ul>" +
                      "</div>"); 
          
          $('body').append("<div class='newObject'>" +
                      "     <h1>New Plane Form</h1>" +
                      "         <button class='updatePlane' id='update'>Click here to update existed plane info</button>" +
                      "         <table>" +
                      "             <tr>" +
                      "                 <td>Plane Name</td>" +
                      "                 <td><input type='text' class='newPlaneName'></td>" +
                      "             </tr>" +
                      "             <tr>" +
                      "                 <td>Seatmap URL</td>" +
                      "                 <td><input type='text' class='newPlaneSeat'></td>" +
                      "             </tr>" +
                      "             <tr>" +
                      "                 <td>Airline</td>" +
                      "                 <td><div class='dropdown'><button class='dropbtn' id='uniqueAirline' onclick='searchAirline()'>Select Airline</button>" +
                      "                       <div id='airlineDropdown' class='dropdown-content'>" +
                      "                           <input type='text' placeholder='Enter an airline' id='chooseAirline' onkeyup='filter3()'>" +   "                       </div></div></td>" +
                      "             </tr>" +
                      "         </table>" +
                      "     <div class='submitOrcancel'>" +
                      "         <input type='submit' value='Submit' class='newPlaneSubmit' id='buttonForm'>" +
                      "         <button class='cancel' id='buttonForm'>Cancel</button>" +
                      "     </div>" +
                      "</div>");
      });
    
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// This area is for posting new data into the database 
    
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // Submit buttons for creating new airport - go back to home page
      $('body').on('click', '.newAirportSubmit', function(){
          $.ajax(root_url + "airports",
          {
                type: 'POST',
                xhrFields: {withCredentials: true},
                data: {
                    "airport":{
                        "name":      $(".newAirportName").val(),
                        "code":      $(".newAirportCode").val(),
                        "city":      $(".newAirportCity").val(),
                        "latitude":  $(".newAirportLat").val(),
                        "longitude": $(".newAirportLon").val()
                    }
                },
                
                success: (response) => {
                    $('body').css("background-image", "none");
                    build_project_interface();
                },
                error: () => {
                    alert("Sorry! Unexpected error occurred!");
                }
            });
      });
    
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // Submit buttons for updating pre-existed airport - go back to home page
      $('body').on('click', '.updateAirportSubmit', function(){
          $.ajax(root_url + "airports/" + fromLocation,
          {
                type: 'PUT',
                xhrFields: {withCredentials: true},
                data: {
                    "airport":{
                        "name":      $(".newAirportName").val(),
                        "code":      $(".newAirportCode").val(),
                        "city":      $(".newAirportCity").val(),
                        "latitude":  $(".newAirportLat").val(),
                        "longitude": $(".newAirportLon").val()
                    }
                },
                
                success: (response) => {
                    $('body').css("background-image", "none");
                    build_project_interface();
                },
                error: () => {
                    alert("Sorry! Unexpected error occurred!");
                }
            });
      });
    
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // Submit buttons for creating new flight - go back to home page
      $('body').on('click', '.newFlightSubmit', function(){
          $.ajax(root_url + "flights",
          {
                type: 'POST',
                xhrFields: {withCredentials: true},
                data: {
                    "flight": {
                        "departs_at":   $(".newFlightdep").val(),
                        "arrives_at":   $(".newFlightarr").val(),
                        "number":       $(".newFlightnum").val(),
                        "departure_id": fromLocation,
                        "arrival_id":   toLocation
                    }

                },
                success: (response) => {
                    $('body').css("background-image", "none");
                    build_project_interface();
                },
                error: () => {
                    alert("Sorry! Unexpected error occurred!");
                }
            });
      });
    
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // Submit buttons for creating new plane - go back to home page
      $('body').on('click', '.newPlaneSubmit', function(){
          $.ajax(root_url + "planes",
          {
                type: 'POST',
                xhrFields: {withCredentials: true},
                data: {
                    "plane": {
                        "name":        $(".newPlaneName").val(),
                        "seatmap_url": $(".newPlaneSeat").val(),
                        "airline_id":  airlineId
                    }
                },
                success: (response) => {
                    $('body').css("background-image", "none");
                    build_project_interface();
                },
                error: () => {
                    alert("Sorry! Unexpected error occurred!");
                }
            });
      });
    
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // Cancel - go back to home page
      $('body').on('click', '.cancel', function(){
            $('body').css("background-image", "none");
            build_project_interface();
      });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Build page interface
var build_project_interface = function(){
    let body = $('body');
    body.empty();
  
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Load airports data into the dropdown menu
    $.ajax(root_url + 'airports',
    {
        type: 'GET',
        xhrFields: {withCredentials: true},
        success: (airports) =>{   
            for (let i = 0; i < airports.length; i++){
                $("#fromDropdown").append("<button class='airportsBtnFrom' id=" + airports[i].id + ">" + airports[i].city + " (" + airports[i].code + ")" + "</button>");
                     
                $("#toDropdown").append("<button class='airportsBtnTo' id=" + airports[i].id + ">" + airports[i].city + " (" + airports[i].code + ")" + "</button>");
            }
        },
        error:()=>{
            alert("request failed");
        }
    });
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Load airlines data into the dropdown menu
    $.ajax(root_url + 'airlines',
    {
        type: 'GET',
        xhrFields: {withCredentials: true},
        success: (airlines) =>{
            for (let i = 0; i < airlines.length; i++){
                $("#airlineDropdown").append("<button class='airlineBtn' id=" + airlines[i].id + ">" + airlines[i].name + " - " + 
                    airlines[i].info + "</button>");
            }
        },
        error:()=>{
            alert("request failed");
        }
    });
  
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Navigation bar
    body.append("<div class='topContainer'>" +
                "   <img src='images/logoPage.png' id='logo' align='middle'>" +
			          "        <ul>" +
				        "           <li><a href=''>Home</a></li>" +
				        "           <li><a href=''>About</a></li>" +
				        "           <li><a href=''>Booking</a></li>" +
				        "           <li><a href=''>Contact</a></li>" +
			          "        </ul>" +
                "</div>" +

                ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                // Search box for flights
                "<div class='search'>" +
                "   <div class='FlightsBox'>" +
                "   <table>" +
                "       <tr>" +
                "           <td>From</td>" +
                "           <td><div class='dropdown'><button class='dropbtn' onclick='searchFrom()'>Select Location</button>" +
                "               <div id='fromDropdown' class='dropdown-content'>" +
                "                   <input type='text' placeholder='Enter a city or airport' id='locationFrom' onkeyup='filter1()'>" +
                "               </div></div></td>" +
                "           <td>To</td>" +
                "           <td><div class='dropdown'><button class='dropbtn' onclick='searchTo()'>Select Location</button>" +
                "               <div id='toDropdown' class='dropdown-content'>" +
                "                   <input type='text' placeholder='Enter a city or airport' id='locationTo' onkeyup='filter2()'>" +
                "               </div></div></td>" +
                "       </tr>" +
                "   </table>" +
                "   </div>" +
                "   <div class='SearchBox'><button id='searchlocation'>Search</button></div>" +
                "</div>" +
        
                ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                // Left section - map and rating
                "   <div class='mapbox'>" +
                "       <div class='test'><div id='our-map'></div></div>" +
                "       <div class='ratingArea'>" +
                "           <div class='rating'>" +
                "             <h3>Rate an airline here or add a missing airline logo!</h3>" +
                "           <table>" +
                "               <tr>" +
                "                   <td><div class='dropdown'><button class='dropbtn' id='uniqueAirline' onclick='searchAirline()'>Select Airline</button>" +
                "                       <div id='airlineDropdown' class='dropdown-content'>" +
                "                           <input type='text' placeholder='Enter an airline' id='chooseAirline' onkeyup='filter3()'>" +    
                "                       </div></div></td>" + 
                "               </tr>" +
                "           </table>" +
                "           </div>" +
                "           <div class='enterRating'>" +
                "               <input id='ratingid' type='number' placeholder='Enter Rating (1-5)' min='1' max='5'>" +
                "               <button class='ratebtn'>Rate</button>" +
                "           </div>" +
                "           <div class='enterURL'>" +
                "               <input id='urlid' type='text' placeholder='Enter Logo URL'>" +
                "               <button class='urlbtn'>Add URL</button>" +
                "           </div>" +
                "       </div>" +
                "   </div>" +
        
                ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                // Right section - slide
                "   <div class='slideshow-container'>" +
                "       <div class='mySlides fade'>" +
                "           <img src='images/bali.jpg' style='width:100%'>" +
                "           <button class='ad'>View Fares</button>" +
                "       </div>" +
                "       <div class='mySlides fade'>" +
                "           <img src='images/japan.jpg' style='width:100%'>" +
                "           <button class='ad'>View Fares</button>" +
                "       </div>" +
                "       <div class='mySlides fade'>" +
                "           <img src='images/paris.jpg' style='width:100%'>" +
                "           <button class='ad'>View Fares</button>" +
                "       </div>" +
                "       <a class='prev' onclick='plusSlides(-1)'>&#10094;</a>" +
                "       <a class='next' onclick='plusSlides(1)'>&#10095;</a>" +
                "   </div>" +
                "</div>"
                );
 
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Add airports, flights, and planes
    body.append("<div class='infoSection'>" +
                "   <div class='Box1'>" +
                "       <button class='addAirportBtn'><img src='images/01.jpg' class='addAirport'></button>" +
                "       <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>" +
                "   </div>" +
                "   <div class='Box2'>" +
                "       <button class='addFlightBtn'><img src='images/02.jpg' class='addFlight'></button>" +
                "       <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>" +
                "   </div>" +
                "   <div class='Box3'>" +
                "       <button class='addAirplaneBtn'><img src='images/03.jpg' class='addPlane'></button>" +
                "       <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>" +
                "   </div>" +
                "</div>");
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Map
    var map = L.map('our-map').setView([35, -98], 4);
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution:  '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd'
    }).addTo(map);
    
    $(document).on('click', '.SearchBox', function() {
        for(i in map._layers) {
            if(map._layers[i]._path != undefined) {
                try {
                    map.removeLayer(map._layers[i]);
                    map.removeLayer(airportFrom);
                    map.removeLayer(airportTo);
                }
                catch(e) {
                    console.log("problem with " + e + map._layers[i]);
                }
            }
        }

        $.ajax(root_url + 'airports',
        {
            type: 'GET',
            xhrFields: {withCredentials: true},
            success: (airports) =>{   
                for (let i = 0; i < airports.length; i++){
                    if (airports[i].id == fromLocation) {
                        FromAirport = airports[i].name;
                        Fromlatitude = airports[i].latitude;
                        Fromlongitude = airports[i].longitude;
                    }
                    if (airports[i].id == toLocation) {
                        ToAirport = airports[i].name;
                        Tolatitude = airports[i].latitude;
                        Tolongitude = airports[i].longitude;
                    }
                }
                
                airportFrom = L.marker([Fromlatitude, Fromlongitude]).addTo(map);
                airportTo = L.marker([Tolatitude, Tolongitude]).addTo(map);

                flight_line = L.polyline([[Fromlatitude, Fromlongitude], [Tolatitude, Tolongitude]],{color: '#1d4466', weight: 5, opacity: .7, dashArray: '20,15', lineJoin: 'round'}).addTo(map);
                
                var Markergroup = new L.featureGroup([airportFrom, airportTo]);
                map.fitBounds(Markergroup.getBounds());

                flight_line.bindPopup("This is a flight from " + FromAirport + " to " + ToAirport + ""); 
                airportFrom.bindPopup(FromAirport); 
                airportTo.bindPopup(ToAirport);
            },
            error:()=>{
                alert("request failed");
            }
        });
    }); 
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Scripts for slides
    body.append("<script>" +
                "   var slideIndex = 1;" +
                "   showSlides(slideIndex);" +
                "   function plusSlides(n) {" +
                "       showSlides(slideIndex += n);" +
                "   }" +
                "   function currentSlide(n) {" +
                "       showSlides(slideIndex = n);" +
                "   }" +
                "   function showSlides(n) {" +
                "       var i;" +
                "       var slides = document.getElementsByClassName('mySlides');" +
                "       if (n > slides.length) {slideIndex = 1}" +    
                "       if (n < 1) {slideIndex = slides.length}" +
                "       for (i = 0; i < slides.length; i++) {" +
                "           slides[i].style.display = 'none';" +  
                "       }" +
                "   slides[slideIndex-1].style.display = 'block';" +  
                "   }" +
                "</script>");
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Footer
    body.append("<footer>" +
	            "  <a href='' class='footerlink'>FAQ's</a> |" +
	            "  <a href='' class='footerlink'>Terms</a> |" +
                "  <a href='' class='footerlink'>Privacy</a>" +
                "</footer>");
};

