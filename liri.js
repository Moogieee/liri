var fs = require("fs");

var commands = process.argv[2];
var search = process.argv[3];

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

// var client = new Twitter ({
// 	consumer_key: process.env.TWITTER_CONSUMER_KEY,
// 	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
// 	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
// 	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
// });

// var Spotify = new Spotify ({
// 	id: process.env.SPOTIFY_ID,
// 	secret: process.env.SPOTIFY_SECRET
// });


//========== movie-this //==========//

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

	request(queryURL, function(error, response, body) {
		if(!error && response.statusCode === 200) {
			console.log("Title: " + JSON.parse(body).Title);
			console.log("Release Year: " + JSON.parse(body).Year);
			console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
			console.log("Rotten Tomatoes Rating: " + JSON.parse(body).rTRating);
			console.log("Country: " + JSON.parse(body).Country);
			console.log("Language: " + JSON.parse(body).Language);
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("Actors: " + JSON.parse(body).Actors);

		}
	});
}

//=======================================//


//========== do-what-it-says //==========//

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

		console.log(result);
	})
}