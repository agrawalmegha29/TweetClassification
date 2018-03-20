var server_name = "http://127.0.0.1:3000/";
var server = io.connect(server_name);
console.log('Client: Connecting to server '+server_name);

var msgElement = document.getElementById('ss-message');

// This function is called when the client is loaded
$(document).ready(function() {
	var tweetList = $('ul.tweet_love');

// On receiving Love Tweets from Client
	server.on ('LovetweetsToClient', function(data) {
		tweetList.prepend('<li>' +
		'<span class = \"name_class\">' + JSON.parse(data).name + '</span>' +': '
		+ JSON.parse(data).text + '</li>');
	});
// On receiving Hate Tweets from Client
	var tweetList_hate = $('ul.tweet_hate');
	server.on ('HatetweetsToClient', function(data) {
		tweetList_hate.prepend('<li>' +
		'<span class = \"name_class\">' + JSON.parse(data).name + '</span>' +': '
		+ JSON.parse(data).text + '</li>');
	});
});

//On receiving Stats from client
server.on('statsToClient' , function(data) {
	console.log("Stats From Server received - " + data+ " "+JSON.parse(data).total_words);
	updChart(data);
});
