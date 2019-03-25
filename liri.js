require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);


var userInput = process.argv.slice(3).join('+');
var go = process.argv[2];

switch(go){

case "concert-this": concert()
break;

case "spotify-this-song": music() 
break;

case "movie-this": movie()
break;

case "do-what-it-says":random()
break;
}


// Node-Spotify-API request
function music(query) {
    

    spotify.search({
        type: 'track',
        query: userInput
    }).then(function(response) {
        
        var spotifyResponse = response

        console.log(JSON.stringify(spotifyResponse));
      })
      .catch(function(err) {
        console.log(err);
      })
    }


// bands-in-town api request
function concert() {

    var artist = userInput;


axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
.then (
    function(concertResponse){
        
        // for(i = 0; i < concertResponse.data.length; i++) {

        var concert = concertResponse.data

        // console.log(concert)

        console.log(concert)
        // console.log(concert.venue.region + ", " + concert.venue[i].city)
        // console.log(concert.venue.datetime)
    // }
}
)


}


// OMDB Request
function movie() {

var movieInput = "";

    if(userInput == ""){
        
        movieInput = "mr.nobody"
    }
    else{
        movieInput = userInput
    }

axios.get("http://www.omdbapi.com/?t=" + movieInput + "&apikey=7ab220f2&")

.then(
  function(response) {

        let movie = response.data

    console.log("Title: " + JSON.stringify(movie.Title));
    console.log("Realse Year: " + JSON.stringify(movie.Year));
    console.log("IMDB Rating: " + JSON.stringify(movie.imdbRating));
    console.log("Rotten Tomatoes: " + JSON.stringify(movie.Ratings[1]));
    console.log("Country: " + JSON.stringify(movie.Coountry));
    console.log("Language: " + JSON.stringify(movie.Languge));
    console.log("Plot: " + JSON.stringify(movie.Plot));
    console.log("Actors: " + JSON.stringify(movie.Actors));

        
      })
    }