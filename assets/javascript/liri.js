//---------------------------------------------------------------------------
// VARIABLE DECLARATIONS!
// Requires the file with Twitter keys inside it.
var twitterKeys = require("./keys.js");

// Sets Twitter keys to variables (per instructions)
var consumerKey = twitterKeys.twitterKeys.consumer_key;
var consumerSecret = twitterKeys.twitterKeys.consumer_secret;
var accessTokenKey = twitterKeys.twitterKeys.access_token_key;
var accessTokenSecret = twitterKeys.twitterKeys.access_token_secret;

// Sets user request equal to third argument in Node
var userRequest = process.argv[2];

// Requires the stated NPM packages
var Twitter = require("twitter");
var spotify = require("spotify");
var request = require('request');

// Requires the file system
var fs = require("fs");

//---------------------------------------------------------------------------
// FUNCTION DECLARATIONS!

// Function for when the argument "my-tweets" is passed in to Node
function myTweets() {

	// 
	var client = new Twitter({
		consumer_key: consumerKey,
		consumer_secret: consumerSecret,
		access_token_key: accessTokenKey,
		access_token_secret: accessTokenSecret
	});

	// 
	var params = {screen_name: 'aniratak8'};

		client.get('statuses/user_timeline', params, function(error, tweets, response) {

			// If no error..
			if (!error) {

				// Console log header
				console.log("----- 20 Most Recent Tweets ---------------------------------------------------------------");
				
				// Console log 20 most recent tweets
				for (var i = 0; i < 20; i++) {
					console.log(i+1 + ". " + tweets[i].text + " (Created on: " + tweets[i].created_at + ")");
				}
				
				// Console log footer(?)
				console.log("--------------------------------------------------------------------");
			}
		});
};

// Function for when "spotify-this-song" is passed in to Node
function spotifyThisSong() {

	var spotifyInput = process.argv[3];

	// If there is no input provided by the user,
	if (spotifyInput === undefined) {

		// Return information for "The Sign" by Ace of Base! :)
		// Got specific song reference, as searching for "The Sign" gave way different results than the 
		// song asked for
		spotify.lookup({type: "track", id: "3DYVWvPh3kGwPasp7yjahc"}, function(err, data) {

			// If there's an error..
			if (err) {
				console.log('Error occurred: ' + err);
				return;
			}

			// If no error..
			else {

	 			// Console log header
	 			console.log("--------------------------------------------------------------------");

				// Artist(s) Name
		 		console.log("Artist(s) Name(s): " + data.album.artists[0].name);

				// Song Name
				console.log("Song Name: " + data.name);

				// Preview Link to the song on Spotify
				console.log("Preview Link: " + data.preview_url);

				// Album Name
				console.log("Album Name: " + data.album.name);

				// Console log footer
				console.log("--------------------------------------------------------------------");

	 		}
		});
	}

	// If Spotify input is defined/has a value
	else if (spotifyInput !== undefined) {

	// Search for a track with input search term
	spotify.search({type: "track", query: spotifyInput}, function(err, data) {

		// If there's an error..
	    if (err) {
	        console.log('Error occurred: ' + err);
	        return;
	    }

	    // If no error..
	 	else {

			// Console log header
			console.log("----- Top 3 Results ---------------------------------------------------------------");

	 		// Display top three song results
	 		for (var i = 0; i < 3; i++) {

	 			// Create/empty blank array
				var multArtists = [];

					// Display all artists for track (some have one, some have multiple)
		 			for (var j = 0; j < data.tracks.items[j].artists.length; j++) {

		 				// Push all artists on track to blank array
		 				multArtists.push(data.tracks.items[i].artists[j].name);
			
					}

				// Artist(s) Name(s)
				console.log("Artist(s) Name(s): " + multArtists.join(", "));

				// Song Name
				console.log("Song Name: " + data.tracks.items[i].name);

				// Preview Link to the song on Spotify
				console.log("Preview Link: " + data.tracks.items[i].preview_url);

				// Album Name
				console.log("Album Name: " + data.tracks.items[i].album.name);

				// Line break between songs
				console.log("-----");

			}

			// Console log footer
			console.log("--------------------------------------------------------------------");
	 	}
	});
	}
};

// Function for when "movie-this" is passed in to Node
function movieThis() {

	// Set variable equal to fourth argument in Node
	var userInput = process.argv[3];

	// Create movieInput variable for actual search
	var movieInput;

	// If user does not input a movie title
	if (userInput === undefined) {
		// Display information for Mr. Nobody
		movieInput = "Mr. Nobody";
	}

	// If user provides input for movie search
	else if (userInput !== undefined) {
		// Set movieInput equal to userInput for search
		movieInput = userInput;
	}

	// Create variable to create movie search URL
	var movieSearchUrl = "http://www.omdbapi.com/?t=" + movieInput + "&y=&plot=short&r=json&tomatoes=true";

	// Pass movie search URL into request function
	request(movieSearchUrl, function(error, response, body) {

		// If there were no errors and the response code was 200 (i.e. the request was successful)...
		if (!error && response.statusCode === 200) {

			// Console log header
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

			// Console log footer
			console.log("--------------------------------------------------------------------");
		}
	});
};

// Function for when "do-what-it-says" is passed in to Node
function doWhatItSays() {

	// Read "random.txt file"
	fs.readFile("../../random.txt", "utf8", function(err, data) {

		// Creates array out of data items
		var output = data.split(",");

		// Console logs each item in the just-created output array (of items passed from random.txt file)
		for (var i = 0; i < output.length; i++) {
			console.log(output[i]);
		}

			// If the first item passed is "my-tweets"
			if (output[0].toLowerCase() === "my-tweets") {

				// Run myTweets function
				myTweets();
			}

			// If the first item passed is "spotify-this-song"
			else if (output[0].toLowerCase() === "spotify-this-song") {

				// Run spotifyThisSong function (couldn't easily figure out how to pass variable into original function
				// and then ran out of time; ideally I'd like this code to be drier (dry-er?)

				// Set spotifyInput equal to second item passed in output array
				var spotifyInput = output[1];
					// Search for a track with input search term
					spotify.search({type: "track", query: spotifyInput}, function(err, data) {

						// If there's an error..
					    if (err) {
					        console.log('Error occurred: ' + err);
					        return;
					    }

					    // If no error..
					 	else {

					 		// Console log header
					 		console.log("----- Top 3 Results ---------------------------------------------------------------");

					 		// Display top three song results
					 		for (var i = 0; i < 3; i++) {

					 			// Create/empty blank array
								var multArtists = [];

									// Display all artists for track (some have one, some have multiple)
						 			for (var j = 0; j < data.tracks.items[j].artists.length; j++) {

						 				// Push all artists on track to blank array
						 				multArtists.push(data.tracks.items[i].artists[j].name);
							
									}

								// Artist(s) Name(s)
								console.log("Artist(s) Name(s): " + multArtists.join(", "));

								// Song Name
								console.log("Song Name: " + data.tracks.items[i].name);

								// Preview Link to the song on Spotify
								console.log("Preview Link: " + data.tracks.items[i].preview_url);

								// Album Name
								console.log("Album Name: " + data.tracks.items[i].album.name);

								// Line break between songs
								console.log("-----");

							}

							// Console log footer
							console.log("--------------------------------------------------------------------");
					 	}
					});
			}

			// If the first item passed is "movie-this"
			else if (output[0].toLowerCase() === "movie-this") {
				
				// Run movieThis function (couldn't easily figure out how to pass variable into original function
				// and then ran out of time; ideally I'd like this code to be drier (dry-er?)

				// Set movieInput equal to second item passed in output array
				movieInput = output[1];
					
				// Create variable to create movie search URL
				var movieSearchUrl = "http://www.omdbapi.com/?t=" + movieInput + "&y=&plot=short&r=json&tomatoes=true";

				// Pass movie search URL into request function
				request(movieSearchUrl, function(error, response, body) {

					// If there were no errors and the response code was 200 (i.e. the request was successful)...
					if (!error && response.statusCode === 200) {

						// Console log header
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

						// Console log footer
						console.log("--------------------------------------------------------------------");
					}
				});
			}
	});
};

//---------------------------------------------------------------------------
// FUNCTION CALLS!
// As mentioned above, I would like to have called more of the internal-bits of the "doWhatItSays" function with the
// below function calls.
// I ran out of time to work on that part (my fault, but still true), so it will be something I work on in the future
// to get this code more to where I'd like it to be.

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