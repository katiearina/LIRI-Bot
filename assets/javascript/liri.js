//---------------------------------------------------------------------------
// VARIABLE DECLARATIONS!
// Requires the file with Twitter keys inside it.
var twitterKeys = require("./keys.js");
var consumerKey = twitterKeys.twitterKeys.consumer_key;
var consumerSecret = twitterKeys.twitterKeys.consumer_secret;
var accessTokenKey = twitterKeys.twitterKeys.access_token_key;
var accessTokenSecret = twitterKeys.twitterKeys.access_token_secret;
// console.log(twitterKeys);

var userInput = process.argv[2];

//---------------------------------------------------------------------------
// FUNCTION DECLARATIONS!

function myTweets() {
	// console.log("Tweet!");
	// console.log(twitterKeys.twitterKeys.consumer_key);
	var Twitter = require('twitter');
 
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
				console.log(i+1 + ". " + tweets[i].text + "(Created on: " + tweets[i].created_at + ")");
			}
			console.log("--------------------------------------------------------------------");
		}
	});
}

function spotifyThisSong() {
	// console.log("Spotify'd!");
var spotify = require('spotify');
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
		// Add option to show more than one artist (if necessary?)
 			// for (var i = 0; i < data.tracks.items[i].artists.length; i++) { 
				console.log("Artist(s) Name: " + data.tracks.items[i].artists[0].name + ", " + data.tracks.items[i].artists[1].name);
			// }
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
    // Do something with 'data' 
});
}
}

function movieThis() {
	console.log("Movie!");
}

function doWhatItSays() {
	console.log("It says!");
}

//---------------------------------------------------------------------------
// FUNCTION CALLS!

if (userInput.toLowerCase() === "my-tweets") {
	myTweets();
}

else if (userInput.toLowerCase() === "spotify-this-song") {
	spotifyThisSong();
}

else if (userInput.toLowerCase() === "movie-this") {
	movieThis();
}

else if (userInput.toLowerCase() === "do-what-it-says") {
	doWhatItSays();
}

else {
	console.log("Please enter a valid request. Thank you!");
}