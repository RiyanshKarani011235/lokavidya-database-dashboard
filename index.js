var express = require('express');
var ParseDashboard = require('parse-dashboard');
var path = require('path');
var fs = require('fs');

const PORT = process.env.PORT || 5000;

var serverConfigDir = path.join(__dirname);
var data = fs.readFileSync(path.join(serverConfigDir, 'parse-dashboard-config.json'));
var config;

try {
	config = JSON.parse(data);
} catch (err) {
	console.log('parse-database-config.json is corrputed')
	throw(err);
}

var dashboard = new ParseDashboard(config, config.allowInsecureHTTP);

var app = express();
app.set('port', PORT);

// make the Parse Dashboard available at /dashboard
app.use('/dashboard', dashboard);

app.listen(PORT, function() {
	console.log('Node app is running on port : ' + PORT);
});
