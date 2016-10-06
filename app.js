'use strict'

var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()
var fs = require('fs');
var HOST= '54.187.131.77';
var PORT= 5000;
	
	
var options = {
	hostname: HOST,
	port: PORT,
	path: '/',
	method: 'POST',
    key: fs.readFileSync('./ssl/keys/ca.key'),
    cert: fs.readFileSync('./ssl/certs/ca.cer')
	};
	

app.set('port', (process.env.PORT || PORT))


app.use(bodyParser.urlencoded({extended: false}))


app.use(bodyParser.json())

var https = require('https');
var myServer=https.createServer(options,app, function (req, res, callBack) {
	console.log('Server up: http://localhost:' + app.get('port')); 
	}).listen(PORT);
	var timeout=30*1000;
	myServer.timeout=timeout;


app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot')
})


app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})



