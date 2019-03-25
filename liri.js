require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require("moment");

var fs = require('fs')


var userInput = process.argv.slice(3).join('+');
var go = process.argv[2];

switch(go){

case "concert-this": concert()
break;

case "spotify-this-song": music() 
break;

case "movie-this": movie()
break;

case "do-what-it-says": random()
break;
}

// Node-Spotify-API request
function music() {

    spotify.search({
        type: 'track',
        query: userInput
    }).then(function(data) {
        
        var spotifyResponse = data.tracks.items[0]
        console.log("\n\nSearch Results....");
        console.log("---------------------------------\n");
        console.log("Artist: " + spotifyResponse.artists[0].name);
        console.log("Song name: " + spotifyResponse.name);
        console.log("Link to song: " + JSON.stringify(spotifyResponse.artists[0].external_urls).slice(11,-1));
        console.log("Album: " + spotifyResponse.album.name);
        console.log("\n---------------------------------\n");
      })
      .catch(function(err) {
        console.log("Spotify Error:" + err);
      })
    }


// Bands-in-town api request
function concert() {

    var artist = userInput;

axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
.then (
    function(concertResponse){
        
        for(i = 0; i < concertResponse.data.length; i++) {

            var events = concertResponse.data[i]
            var eventTime = events.datetime
            var momentTime = moment(eventTime).format("L"); 
        console.log("---------------------------------");
        console.log("Venue: " + events.venue.name)
        console.log("Location: " + events.venue.city + ", " + events.venue.region + ", " + events.venue.country)
        console.log("Date: " + momentTime)
        console.log("---------------------------------");
    }
})}


// OMDB Request
function movie() {

var movieInput = "";

    if(userInput == ""){
        
        movieInput = "mr.nobody"
    }
    else{movieInput = userInput}

axios.get("http://www.omdbapi.com/?t=" + movieInput + "&apikey=7ab220f2&")
.then(
  function(response) {
        let movie = response.data
        var tomatoes = JSON.stringify(movie.Ratings[1])
        var tomRatings = tomatoes.slice(36,-1)
    console.log("\n---------------------------------")
    console.log("Title: " + JSON.stringify(movie.Title));
    console.log("Realse Year: " + JSON.stringify(movie.Year));
    console.log("IMDB Rating: " + JSON.stringify(movie.imdbRating));
    console.log("Rotten Tomatoes: " + tomRatings);
    console.log("Country: " + JSON.stringify(movie.Country));
    console.log("Language: " + JSON.stringify(movie.Language) + "\n");
    console.log("Plot: \n" + JSON.stringify(movie.Plot)+"\n");
    console.log("Actors: " + JSON.stringify(movie.Actors));
    console.log("---------------------------------")
      })
    };


// Do-what-it-says function below
function random() {

    fs.readFile('random.txt',"UTF-8", function(err,data) {
        if (err) throw err;

        var randomCommand = data.split(",")
        // console.log(randomCommand)
        var command = JSON.stringify(randomCommand[0]);
        var randomInput = randomCommand[1];

        console.log(command);
        console.log(randomInput)

            if (command == "concert-this"){
                userInput = randomInput;
             concert();
            }
            if (command == "spotify-this-song"){
                userInput = randomInput;
             music();
            }
            if (command == "movie-this"){
                userInput = randomInput;
             movie();
            }

    })
}