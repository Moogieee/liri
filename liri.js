var keys = require("./keys");
var fs = require("fs");

var commands = process.argv[2];

switch (commands) {
	case "my-tweets":
		twitter();
		break;

	case "spotify-this-song":
		spotify();
		break;

	case "movie-this":
		omdb();
		break;

	case "do-what-it-says":
		random();
		break;
}


//=============================================================================
//                              Twitter
//=============================================================================


function twitter() {
	var Twitter = require("twitter");
	var client = new Twitter ({
		consumer_key: process.env.TWITTER_CONSUMER_KEY,
		consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
		access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
		access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
	});

	var params = {
		screen_name: "005kuma",
		count: 10
	};

	client.get("statuses/user_timeline", params, function (err, tweets, response) {
		if(!err) {
			console.log("==========================================");
			console.log("Most recent Tweets: ")
			console.log("******************************************")
			for (i = 0; i < tweets.length; i++) {
				console.log("005kuma: " + tweets[i].text);
				console.log("Tweet Date: " + tweets[i].created_at);
				console.log("==========================================");
			}

			fs.appendFile("log.txt", fileData, function (err) {
				if(err) {
					throw console.log(err);
				}
			});

		}
	});
}


//=============================================================================
//                              Spotify
//=============================================================================


function spotify() {
	var Spotify = require("node-spotify-api");
	var songTitle = process.argv[3];
	var spotify = new Spotify ({
	  id: process.env.SPOTIFY_ID,
	  secret: process.env.SPOTIFY_SECRET
	});

	spotify.search({ type: 'track', query: songTitle, limit: 5 }, function (err, data) {
	  if (err) {
	    return console.log(err);
	  }
	console.log("==========================================");
	console.log("Artist: " + data.tracks.items[0].artists[0].name);
	console.log("Song Name: " + data.tracks.items[0].name);
	console.log("Album: " + data.tracks.items[0].album.name);
	console.log("Song Preview URL: " + data.tracks.items[0].external_urls.spotify);
	
	var fileData = "Artist: " + data.tracks.items[0].artists[0].name +
					"\nSong Name: " + data.tracks.items[0].name +
					"\nAlbum: " + data.tracks.items[0].album.name +
					"\nSong Preview URL: " + data.tracks.items[0].external_urls.spotify + 
	
	fs.appendFile("log.txt", fileData, function(err) {
		if (err) {
			return console.log(err);
		}
	});
	})
};


//=============================================================================
//                              OMDB
//=============================================================================


function omdb() {
	var request = require("request");
	var nodeArgs = process.argv;
	var movieName = "";
	for (var i = 3; i < nodeArgs.length; i++) {
		if (i > 3 && i < nodeArgs.length) {
			movieName = movieName + "+" + nodeArgs[i];
		}
		else {
			movieName += nodeArgs[i];
		}
	}

	var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

	console.log(queryURL);

	request(queryURL, function(err, response, body) {
		if(!err && response.statusCode === 200) {
			console.log("==========================================");
			console.log("Title: " + JSON.parse(body).Title);
			console.log("Release Year: " + JSON.parse(body).Year);
			console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
			console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
			console.log("Country: " + JSON.parse(body).Country);
			console.log("Language: " + JSON.parse(body).Language);
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("Actors: " + JSON.parse(body).Actors);
	
		var fileData = "Title: " + JSON.parse(body).Title +
						"\nRelease Year: " + JSON.parse(body).Year +
						"\nIMDB Rating: " + JSON.parse(body).imdbRating +
						"\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value +
						"\nCountry: " + JSON.parse(body).Country +
						"\nLanguage: " + JSON.parse(body).Language +
						"\nPlot: " + JSON.parse(body).Plot +
						"\nActors: " + JSON.parse(body).Actors;

		fs.appendFile("log.txt", fileData, function(err) {
			if (err) {
				return console.log(err);
			}
		});
		}
	})
};


//=============================================================================
//                              Do What It Says
//=============================================================================


function random() {
	fs.readFile("random.txt", "utf8", function(err, data) {
		if (err) {
			return console.log(err);
		}

		data = data.split(", ");
		var result = 0;

		for (var i = 0; i < data.length; i++) {
			if(data[i]) {
				result = data[i];
			}
		}
		console.log("==========================================");
		console.log(result);
	})
};