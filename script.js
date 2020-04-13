//search for city when you click the button
$('#submit').on('click', function(){
    //take input value from #input
   var searchTerm = $("#input").val().trim();
   apiCall(searchTerm)
})
//event listening on search btn when clicked, takes input value from the search input div. Calls API using the city as param
//write API call function to request weather data
function apiCall(city){
    //do ajaax call pass city param
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={dom's api key}`,
        method: "GET",
        success: function( result ) {
          console.log(result)
        }
      });
}

// var name = 'dominador';

// $('.col-9').append(`<header><h1>Weather Dashboard ${name==='dom'? 'Welcome!' : 'Youre not dom!, leave now!'}!</h1></header>
// <div class="row" >
// <div class="col-3" style='background-color:gainsboro; padding: 10px;'>
//     <input type="text" id="input" placeholder="type city to search"><button class='btn btn-warning' id="submit">Submit</button>
// </div>
// <div class="col-9">
//     <div class="row" id='current'></div>
//     <div class="row" id='forecast'></div>
// </div>
// </div>`)

//openweathermap api call to weather endpoint based on city input, get lat&lon, then search onecall endpoint 
//how to display data (DOM manipulation and jquery)
//api endpoints https://api.openweathermap.org/data/2.5/onecall?lat=60.99&lon=30.9&appid={YOUR API KEY}
//api endpoint for lat&lon api.openweathermap.org/data/2.5/weather?q=London&appid={your api key}

