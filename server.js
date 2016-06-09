'use strict';
var dateFormat = require('dateformat');
var express = require('express');

var app = express();

app.set('views', __dirname + '/html');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/',function(req,res) {
	res.render('default.html');
});

app.get('/:date',function(req,res) {
	var json = undefined;
	var date = new Date(req.params.date);
	if (isNaN(date.valueOf())) {
		json = "{" + "\"unix\":" + null + " , " + "\"natural\":" + null + "}";
	}
	else {
		json = "{" + 
			   "\"unix\": \"" + date.getTime() + "\" , " + 
			   "\"natural\": \"" + dateFormat(date, "mmmm dd, yyyy") + "\"" + 
			   "}";
	}	
	res.end(JSON.stringify(JSON.parse(json)));
});

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});