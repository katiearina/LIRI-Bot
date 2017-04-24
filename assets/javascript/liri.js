//---------------------------------------------------------------------------
// VARIABLE DECLARATIONS!
// Requires the file with Twitter keys inside it.
var twitterKeys = require("./keys.js");
var consumerKey = twitterKeys.twitterKeys.consumer_key;
var consumerSecret = twitterKeys.twitterKeys.consumer_secret;
var accessTokenKey = twitterKeys.twitterKeys.access_token_key;
var accessTokenSecret = twitterKeys.twitterKeys.access_token_secret;
// console.log(twitterKeys);

var userRequest = process.argv[2];

var Twitter = require("twitter");
var spotify = require("spotify");
var request = require('request');
var fs = require("fs");
// var multArtists = [];

//---------------------------------------------------------------------------
// FUNCTION DECLARATIONS!

function myTweets() {
	// console.log("Tweet!");
	// console.log(twitterKeys.twitterKeys.consumer_key);
	// var Twitter = require('twitter');
 
	var client = new Twitter({
		consumer_key: consumerKey,
		consumer_secret: consumerSecret,
		access_token_key: accessTokenKey,
		access_token_secret: accessTokenSecret
	});
	 
	var params = {screen_name: 'aniratak8'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			// Change this formatting at some point
			console.log("----- 20 Most Recent Tweets ---------------------------------------------------------------");
			for (var i = 0; i < 20; i++) {
				console.log(i+1 + ". " + tweets[i].text + " (Created on: " + tweets[i].created_at + ")");
			}
			console.log("--------------------------------------------------------------------");
		}
	});
}

function spotifyThisSong() {
	// console.log("Spotify'd!");
// var spotify = require('spotify');
var spotifyInput = process.argv[3];

// If there is no input provided by the user,
if (spotifyInput === undefined) {
	// Return information for "The Sign" by Ace of Base! :)
	spotify.lookup({type: "track", id: "3DYVWvPh3kGwPasp7yjahc"}, function(err, data) {
		if (err) {
			console.log('Error occurred: ' + err);
			return;
		}

		else {
		// Artist(s) Name
 		console.log(data.album.artists[0].name);
		// Song Name
		console.log(data.name);
		// Preview Link to the song on Spotify
		console.log(data.preview_url);
		// Album Name
		console.log(data.album.name);
 	}
});
}

else if (spotifyInput !== undefined) {
spotify.search({type: "track", query: spotifyInput}, function(err, data) {
    if (err) {
        console.log('Error occurred: ' + err);
        return;
    }
 	else {
 		console.log("----- Top 3 Results ---------------------------------------------------------------");
 		for (var i = 0; i < 3; i++) {
		// Artist(s) Name
		// Finesse this multiple artist display more to make it better looking?
		// Add condition so that if input return is undefined, it returns an error message? (e.g. "Secondhand News")
		var multArtists = [];
 			for (var j = 0; j < data.tracks.items[j].artists.length; j++) { 
 				multArtists.push(data.tracks.items[i].artists[j].name);
				// console.log("Artist(s) Name: " + data.tracks.items[i].artists[0].name + ", " + data.tracks.items[i].artists[1].name);
				// console.log("Artist(s) Name: " + data.tracks.items[i].artists[j].name);				
			}
		console.log("Artist(s) Name(s): " + multArtists.join(", "));
		// Song Name
		console.log("Song Name: " + data.tracks.items[i].name);
		// Preview Link to the song on Spotify
		console.log("Preview Link: " + data.tracks.items[i].preview_url);
		// Album Name
		console.log("Album Name: " + data.tracks.items[i].album.name);
		console.log("-----");
		}
		console.log("--------------------------------------------------------------------");
 	}
});
}
}

function movieThis() {
	// console.log("Movie!");
// var request = require('request');
var userInput = process.argv[3];
var movieInput;

if (userInput === undefined) {
	movieInput = "Mr. Nobody";
}

else if (userInput !== undefined) {
	movieInput = userInput;
}

	var movieSearchUrl = "http://www.omdbapi.com/?t=" + movieInput + "&y=&plot=short&r=json&tomatoes=true";

	request(movieSearchUrl, function(error, response, body) {

		// If there were no errors and the response code was 200 (i.e. the request was successful)...
		if (!error && response.statusCode === 200) {

			// console.log(movieSearchUrl);
			console.log("----- Movie Information ---------------------------------------------------------------");

			// Title of the movie
			console.log("Movie Title: " + JSON.parse(body).Title);

			// Year the movie came out
			console.log("Release Year: " + JSON.parse(body).Year);

			// IMDB rating of the movie
			console.log("IMDB Rating: " + JSON.parse(body).imdbRating);

			// Country where the movie was produced
			console.log("Country of Production: " + JSON.parse(body).Country);

			// Language of the movie
			console.log("Language: " + JSON.parse(body).Language);

			// Plot of the movie
			console.log("Short Plot: " + JSON.parse(body).Plot);

			// Actors in the movie
			console.log("Actors: " + JSON.parse(body).Actors);

			// Rotten Tomatoes URL
			console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
			console.log("--------------------------------------------------------------------");
		}
	});
}

function doWhatItSays() {

// console.log("It says!");
// var fs = require("fs");

fs.readFile("../../random.txt", "utf8", function(err, data) {

	var output = data.split(",");

	for (var i = 0; i < output.length; i++) {
		console.log(output[i]);
	}

	if (output[0].toLowerCase() === "my-tweets") {
		myTweets();
	}

	else if (output[0].toLowerCase() === "spotify-this-song") {
		var spotifyInput = output[1];
			spotify.search({type: "track", query: spotifyInput}, function(err, data) {
			    if (err) {
			        console.log('Error occurred: ' + err);
			        return;
			    }
			 	else {
			 		console.log("----- Top 3 Results ---------------------------------------------------------------");
			 		for (var i = 0; i < 3; i++) {
					// Artist(s) Name
					// Finesse this multiple artist display more to make it better looking?
					// Add condition so that if input return is undefined, it returns an error message? (e.g. "Secondhand News")
					var multArtists = [];
			 			for (var j = 0; j < data.tracks.items[j].artists.length; j++) { 
			 				multArtists.push(data.tracks.items[i].artists[j].name);
							// console.log("Artist(s) Name: " + data.tracks.items[i].artists[0].name + ", " + data.tracks.items[i].artists[1].name);
							// console.log("Artist(s) Name: " + data.tracks.items[i].artists[j].name);				
						}
					console.log("Artist(s) Name(s): " + multArtists.join(", "));
					// Song Name
					console.log("Song Name: " + data.tracks.items[i].name);
					// Preview Link to the song on Spotify
					console.log("Preview Link: " + data.tracks.items[i].preview_url);
					// Album Name
					console.log("Album Name: " + data.tracks.items[i].album.name);
					console.log("-----");
					}
					console.log("--------------------------------------------------------------------");
			 	}
			});
	}

	else if (output[0].toLowerCase() === "movie-this") {
		movieInput = output[1];
			var movieSearchUrl = "http://www.omdbapi.com/?t=" + movieInput + "&y=&plot=short&r=json&tomatoes=true";

	request(movieSearchUrl, function(error, response, body) {

		// If there were no errors and the response code was 200 (i.e. the request was successful)...
		if (!error && response.statusCode === 200) {

			// console.log(movieSearchUrl);
			console.log("----- Movie Information ---------------------------------------------------------------");

			// Title of the movie
			console.log("Movie Title: " + JSON.parse(body).Title);

			// Year the movie came out
			console.log("Release Year: " + JSON.parse(body).Year);

			// IMDB rating of the movie
			console.log("IMDB Rating: " + JSON.parse(body).imdbRating);

			// Country where the movie was produced
			console.log("Country of Production: " + JSON.parse(body).Country);

			// Language of the movie
			console.log("Language: " + JSON.parse(body).Language);

			// Plot of the movie
			console.log("Short Plot: " + JSON.parse(body).Plot);

			// Actors in the movie
			console.log("Actors: " + JSON.parse(body).Actors);

			// Rotten Tomatoes URL
			console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
			console.log("--------------------------------------------------------------------");
		}
	});
	}

});

}

//---------------------------------------------------------------------------
// FUNCTION CALLS!

// console.log(process.argv);
// console.log(process.argv.join(" "));

if (userRequest.toLowerCase() === "my-tweets") {
	myTweets();
}

else if (userRequest.toLowerCase() === "spotify-this-song") {
	spotifyThisSong();
}

else if (userRequest.toLowerCase() === "movie-this") {
	movieThis();
}

else if (userRequest.toLowerCase() === "do-what-it-says") {
	doWhatItSays();
}

else {
	console.log("Please enter a valid request. Thank you!");
}