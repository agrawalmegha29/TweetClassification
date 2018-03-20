# Classify-Twitter-tweets-as-love-and-hate-tweets
This project is based on Node.js. It streams tweets and classifies them into love and hate tweets, calculates their percentage and prints the results in the form of a chart.

Modules needs to be installed
- Express
- socket IO
- Twit (For Twitter Feed)

How to run:

 - Ensure that the correct value for below named variable is present in the ~/.bashrc file.
	-- TWITTER_CONSUMER_KEY
	-- TWITTER_CONSUMER_SECRET
	-- TWITTER_ACCESS_TOKEN
	-- TWITTER_ACCESS_SECRET
 
 - Run app.js to run the server using node app.js command
 - Connect to Server through web browser using the address "http://127.0.0.1:3000/"

Results: 
 - Left side will display all the love Tweets.
 - Right side will display all the hate Tweets
 - The Pie Chart will display the percentage of love/hate Tweets.

REFERENCES:
 - Tutorial provided
 - Twin Package - https://www.npmjs.com/package/twit-stream
 - JSON - http://www.w3schools.com/json/
 - Google Chart - https://developers.google.com/chart/

