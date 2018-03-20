// Keys from ~/.bashrc file
var twitterConsumerKey = process.env.TWITTER_CONSUMER_KEY;
var twitterConsumerSecret = process.env.TWITTER_CONSUMER_SECRET;
var twitterAccessToken = process.env.TWITTER_ACCESS_TOKEN;
var twitterAccessSecret = process.env.TWITTER_ACCESS_SECRET;

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var love_words = 0;
var hate_words = 0;
var total_words = 0;
var love_per, hate_per;
var routes = require('./routes/index');
var users = require('./routes/users');

var Twit = require('twit');
// Twit Initialization
var Tweets = new Twit({
	consumer_key:	twitterConsumerKey
	,consumer_secret:	twitterConsumerSecret
	,access_token:	twitterAccessToken
	,access_token_secret:	twitterAccessSecret
})

// Getting Tweet Stream containing only words {Love, Hate}

var stream = Tweets.stream('statuses/filter', { track : ['love', 'hate'] });

var app = express();
var server = require('http').createServer(app);
var port = 3000;
server.listen(port);
console.log("Socket.io server listening at http://127.0.0.1:" + port);

// Listen to Client requests
var sio = require('socket.io').listen(server);
var json_obj = require('json');
sio.sockets.on('connection', function(socket){

	console.log('Web client connected');
	socket.emit('ss-confirmation1', {text: 'Successfully connected'});
// On receiving tweets from the server, differentiate them as a Love or Hate tweet

	stream.on('tweet',function(tweet){
		//console.log(tweet.user.screen_name + " - " + tweet.text);
		var hate = tweet.text.toLowerCase().search("hate");
		var love = tweet.text.toLowerCase().search("love");

		total_words = total_words +1;
		
		if(love != -1){
			love_words = love_words +1;
			socket.volatile.emit("LovetweetsToClient",JSON.stringify({ name: tweet.user.screen_name , text: tweet.text }));
		}
		else if(hate != -1){
			hate_words = hate_words +1;
			socket.volatile.emit("HatetweetsToClient",JSON.stringify({ name: tweet.user.screen_name , text: tweet.text }));
		}
// Calculating the percentage
		love_per = (love_words/total_words) * 100;
		hate_per = 100 - love_per;
});
	setInterval(function() {
	//	console.log('Stats to Client send');
		socket.emit('statsToClient', JSON.stringify({ total_words: total_words , love_per: love_per , hate_per: hate_per}));
	},3000);

	socket.on('disconnect', function() {
	console.log('Web client disconnected');	
	});
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
