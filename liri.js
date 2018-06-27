require("dotenv").config();
var fs = require("fs");
var request = require('request')
var Twitter = require('twitter')
var Spotify = require('node-spotify-api');
// code required to import the `keys.js` file and store it in a variable.
var keys = require("./keys")
//spotify and twitter keys
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//what are we doing? save that as user input
var userSelection = process.argv[2];
var songOrMovie = process.argv[3];


///if user selects my-tweets
if (userSelection === "my-tweets") {
    client.get('statuses/user_timeline/', { count: 20 }, function (error,
        tweets, response) {
        for (i = 0; i < tweets.length; i++) {
            console.log("The following tweet was created: " + tweets[i].created_at);
            console.log(tweets[i].text);
        }
        if (!error) {
            //do nothing yet!
        }
    });
};


// `node liri.js spotify-this-song '<song name here>'`
//if user selects spotify-this-song
if (userSelection === "spotify-this-song") {
    console.log(songOrMovie);
    if (songOrMovie === undefined) {
        spotify.search({ type: 'track,artist', query: 'the sign, ace of base' })
            .then(function (response) {
                ;
                var items = response.tracks.items[0];
                //whole thing
                console.log(items);
                // * Artist(s)
                console.log("Artist(s): " + items.artists[0].name);
                //* The song's name
                console.log("Song Title: " + items.name);
                // * A preview link of the song from Spotify
                console.log("To listen to this song visit: " + items.external_urls.spotify)
                // * The album that the song is from
                console.log("Album: " + items.album.name)
            })
    } else if (songOrMovie != undefined) {
        spotify.search({ type: 'track', query: songOrMovie, limit: 1 })
            .then(function (response) {
                var items = response.tracks.items[0];
                //whole thing
                console.log(items);
                // * Artist(s)
                console.log("Artist(s): " + items.artists[0].name);
                //* The song's name
                console.log("Song Title: " + items.name);
                // * A preview link of the song from Spotify
                console.log("To listen to this song visit: " + items.external_urls.spotify)
                // * The album that the song is from
                console.log("Album: " + items.album.name)

            })
            .catch(function (error) {
                console.log("Error: " + error);
            });
    }

}
if (userSelection === "movie-this") {
    var queryUrl = "http://www.omdbapi.com/?t=" + songOrMovie + "&y=&plot=short&apikey=trilogy"

    //search including the spaces from the command line
    if (songOrMovie === undefined) {
        var queryUrl = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy"
        request(queryUrl, function (error, response, body) {
            // If the request is successful
            if (!error && response.statusCode === 200) {
                //do nothing now
            }
            console.log("Movie Title: " + JSON.parse(body).Title);
            // * Year the movie came out.
            console.log("Movie Release Date: " + JSON.parse(body).Released);
            // * IMDB Rating of the movie.
            console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
            // * Rotten Tomatoes Rating of the movie.
            console.log("Rotton Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value)
            // * Country where the movie was produced.
            console.log("Produced in: " + JSON.parse(body).Country)
            // * Language of the movie.
            console.log("Language: " + JSON.parse(body).Language)
            // * Plot of the movie.
            console.log("Plot: " + JSON.parse(body).Plot)
            // * Actors in the movie.
            console.log("Actors: " + JSON.parse(body).Actors)
        });
    } else {
        request(queryUrl, function (error, response, body) {
            // If the request is successful
            if (!error && response.statusCode === 200) {
                //do nothing now
            }
            console.log("Movie Title: " + JSON.parse(body).Title);
            // * Year the movie came out.
            console.log("Movie Release Date: " + JSON.parse(body).Released);
            // * IMDB Rating of the movie.
            console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
            // * Rotten Tomatoes Rating of the movie.
            console.log("Rotton Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value)
            // * Country where the movie was produced.
            console.log("Produced in: " + JSON.parse(body).Country)
            // * Language of the movie.
            console.log("Language: " + JSON.parse(body).Language)
            // * Plot of the movie.
            console.log("Plot: " + JSON.parse(body).Plot)
            // * Actors in the movie.
            console.log("Actors: " + JSON.parse(body).Actors)
        });
    }
}

if (userSelection === "do-what-it-says"){
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
        // We will then re-display the content as an array for later use.
        console.log(dataArr[1]);

        var songOrMovie = dataArr[1]
        spotify.search({ type: 'track,artist', query: songOrMovie })
        .then(function (response) {
            ;
            var items = response.tracks.items[0];
            // * Artist(s)
            console.log("Artist(s): " + items.artists[0].name);
            //* The song's name
            console.log("Song Title: " + items.name);
            // * A preview link of the song from Spotify
            console.log("To listen to this song visit: " + items.external_urls.spotify)
            // * The album that the song is from
            console.log("Album: " + items.album.name)
        })
      });
}
