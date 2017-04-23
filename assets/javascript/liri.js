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
			for (i = 0; i < 20; i++) {
				console.log(i+1 + ". " + tweets[i].text + "(Created on: " + tweets[i].created_at + ")");
			}
			console.log("--------------------------------------------------------------------");
		}
	});
}

function spotifyThisSong() {
	console.log("Spotify'd!");
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