var root_url = "http://comp426.cs.unc.edu:3001/";

$(document).ready(() => {
    //posting to sessions to log in, this is working but need to build interface upon success
  	$('#login_btn').on('click', () => {

		let user = $('#user').val();
		let pass = $('#password').val();

		console.log(user);
		console.log(pass);

		$.ajax(root_url + 'sessions',
		{
			type: 'POST',
			xhrFields: {withCredentials: true},
			data: {
            user:{
				  username: user,
				  password: pass
            }
			},
			success: () => {
                // Background settings
                $('body').css('background', "url(images/bali.jpg) no-repeat center center fixed");
                $('body').css('-webkit-background-size', "cover");
                $('body').css('-moz-background-size', "cover");
                $('body').css('-o-background-size', "cover");
                $('body').css('background-size', "cover");
                build_project_interface();
			},
			error: (jqxhr, status, error) => {
				alert('error');
			}
		});
	});
});

var build_project_interface = function(){
  let body = $('body');
  body.empty();
  
  // Navigation bar - for decoration
    body.append("<div class='topContainer'>" +
                "   <img src='images/logo.png' id='logo'>" +
                "   <div class='nav'>" +
			          "        <ul>" +
				        "           <li><a href=''>Home</a></li>" +
				        "           <li><a href=''>About</a></li>" +
				        "           <li><a href=''>Booking</a></li>" +
				        "           <li><a href=''>Contact</a></li>" +
			          "        </ul>" +
		            "   </div>" +
                "</div>");

    // Search for flights
    body.append("<div class='search'>" +
                "   <h3>Find Cheap Tickets - Save Big!</h3>" +
                "   <table>" +
                "       <tr>" +
                "           <td>From</td>" +
                "           <td><div class='dropdown'><button onclick='searchFlights()' class='dropbtn'>Where are you flying from?</button>" +
                "               <div id='myDropdown' class='dropdown-content'>" +
                "               <input type='text' placeholder='Enter a city or airport' id='location' onkeyup='filter()'>" +
                "               <a href=''>Charlotte (CLT)</a><a href=''>Raleigh (RDU)</a><a href=''>Boston (BOS)</a>" +
                "               <a href=''>Obihiro (OBO)</a><a href=''>Iwojima (IWO)</a><a href=''>Ibaraki (IBR)</a>" +
                "               <a href=''>Matsumoto (MMJ)</a><a href=''>Tokyo (NRT)</a><a href=''>Hualien (HUN)</a>" +
                "               <a href=''>Meadow Lake (YLJ)</a><a href=''>Chapleau (YLD)</a><a href=''>Toronto (YKZ)</a></div></div></td>" +
                "       </tr>" +
                "       <tr>" +
                "           <td>To</td>" +
                "           <td><div class='dropdown'><button onclick='searchFlights()' class='dropbtn'>Where are you flying to?</button>" +
                "               <div id='myDropdown' class='dropdown-content'>" +
                "               <input type='text' placeholder='Enter a city or airport' id='location' onkeyup='filter()'>" +
                "               <a href=''>Charlotte (CLT)</a><a href=''>Raleigh (RDU)</a><a href=''>Boston (BOS)</a>" +
                "               <a href=''>Obihiro (OBO)</a><a href=''>Iwojima (IWO)</a><a href=''>Ibaraki (IBR)</a>" +
                "               <a href=''>Matsumoto (MMJ)</a><a href=''>Tokyo (NRT)</a><a href=''>Hualien (HUN)</a>" +
                "               <a href=''>Meadow Lake (YLJ)</a><a href=''>Chapleau (YLD)</a><a href=''>Toronto (YKZ)</a></div></div></td>" +
                "       </tr>" +
                "   </table>" +
                "</div>");
    
    // Script for dropdown menu search
    body.append("<script>" +
                "   function searchFlights() {" +
                "       document.getElementById('myDropdown').classList.toggle('show');" +
                "   }" +
                
                "   function filter() {" +
                "       var input, filter, ul, li, a, i;" +
                "       input = document.getElementById('location');" +
                "       filter = input.value.toUpperCase();" +
                "       div = document.getElementById('myDropdown');" +
                "       a = div.getElementsByTagName('a');" +
                
                "       for (i = 0; i < a.length; i++) {" +
                "           if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {" +
                "               a[i].style.display = '';" +
                "           } else {" +
                "               a[i].style.display = 'none';" +
                "           }" +
                "       }" +
                "   }" +
                "</script>");
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // adding the map 
  body.append('<div id="our-map" style="width: 600px; height: 400px"></div>'); 

  var mymap = L.map('our-map').setView([51.505, -0.09], 13);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap);
};