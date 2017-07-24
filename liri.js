var command = process.argv[2];
var input1 = process.argv;
var input2 = "";
var fs = require('fs');

for (var i = 3; i < input1.length; i++) {
    if (i > 3 && i < input1.length) {
        input2 = input2 + "+" + input1[i];
    } else {
        input2 = input2 + input1[i];
    }
};

switch (command) {
    case "my-tweets":
        tweets();
        break;

    case "spotify-this-song":
        spotifySong();
        break;

    case "movie-this":
        findMovie();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;

    default:
        console.log("Please enter one of the following commands: \nmy-tweets, \nspotify-this-song, \nmovie-this, \ndo-what-it-says");
        break;
}



function tweets() {
    var keys = require("./keys");
    var myKeys = keys.twitterKeys;

    var twitter = require("twitter");


    var client = new twitter(myKeys);
    var params = {
        q: 'rsharif244',
        count: 20
    };

    client.get('statuses/user_timeline', params, function (err, data, response) {
        if (!err) {
            for (i = 0; i < data.length; i++) {
                console.log(data[i].created_at + "\n----------------------------------\n" + "  " + data[i].text + "\n----------------------------------");
            }
        };
    });
};

function spotifySong() {
    var Spotify = require('node-spotify-api');

    var spotify = new Spotify({
        id: "185ee798ac204447b0e43ecf88569c8c",
        secret: "b2925c980e2246daace89024c5a64639"
    });

    if (input2 === "") {
        input2 = "the sign ace of base"
    }

    spotify.search({
        type: 'track',
        query: input2
    }, function (err, data) {

        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song: " + data.tracks.items[0].name);
        console.log("Preview Here: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);




    });
};

function findMovie() { 
    
    
    var url = "http://www.omdbapi.com/?t=" + input2 + "&y=&plot=short&apikey=40e9cece";
    var omdb = require('omdb');
    var request = require('request');

   if (input2 === '') {
        url = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=40e9cece";
    };

    request(url, function (err, response, body) {

        if (!err) {


            console.log("Title: " + JSON.parse(body)["Title"]);
            console.log("Year: " + JSON.parse(body)["Year"]);
            console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["Ratings"]);
            console.log("Country: " + JSON.parse(body)["Country"]);
            console.log("Language: " + JSON.parse(body)["Language"]);
            console.log("Plot: " + JSON.parse(body)["Plot"]);
            console.log("Actors: " + JSON.parse(body)["Actors"]);
        };
    });
};

function doWhatItSays() {
    fs.readFile("random.txt", "UTF-8", function (err, data) {
        var text = data.split(",");
        command = text[0];
        input2 = text[1];

        for (i = 2; i < text.length; i++) {
            input2 = input2 + "+" + text[i];
        };
        spotifySong();
    })
}