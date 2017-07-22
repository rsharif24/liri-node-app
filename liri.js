var input1 = process.argv[2];
var input2 = process.argv[3];
var fs = require('fs');

if (input1 === "my-tweets") {
    tweets();
}else if (input1 === "spotify-this-song") {
    spotifySong();
}else if (input1 === "movie-this") {
    findMovie();
}




function tweets(){
    var keys = require("./keys");
    var myKeys = keys.twitterKeys;

    var twitter = require("twitter");  

    
    var client = new twitter(myKeys); 
    var params = {
    q: 'rsharif244',
    count: 20
    }; 

    client.get('statuses/user_timeline', params, function(error, data, response){
            if (!error) {
                for (i=0; i<data.length; i++) {
                    console.log(data[i].created_at + '\n' + "  " + data[i].text);
                }
            };
        });
    };
//------------------------------------------------------------    
function spotifySong(){
    var Spotify = require('node-spotify-api');

    var spotify = new Spotify({
    id: "185ee798ac204447b0e43ecf88569c8c",
    secret: "b2925c980e2246daace89024c5a64639"
    });
    
    if (input2 === undefined) {
        input2 = "The Sign";
    }

    spotify.search({ type: 'track', query:input2 }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }else{

        console.log("Artist: " + data.tracks.items[0].artists[0].name);
                console.log("Song: " + data.tracks.items[0].name);
                console.log("Album: " + data.tracks.items[0].album.name);
                console.log("Preview Here: " + data.tracks.items[0].preview_url);
                console.log("Album: " + data.tracks.items[0].album.name);

    }
    

    });
};

function findMovie(){
    var movie = input2;
    var url = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";
    var omdb = require('omdb');
    var request = require('request');

    request(url, function(error, response, body){
	    if(!error && response.statusCode == 200){
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


