var express = require('express');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var request = require('request');
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./config.js');
var _ = require('lodash');

var app = express();
var supportRouter = express.Router();
var userRouter = express.Router();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(methodOverride('X-Http-Method-Override'));
app.use(express.static(__dirname + '/dist'));

app.use(function(req,res,next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});

app.get('/', function(req, res, next){
	res.render('index.html');
});

app.post('/auth/google', function(req, res, next){
	var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
  	var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
	var params = {
	    code: req.body.code,
	    client_id: config.GOOGLE_CLIENT_ID,
	    client_secret: config.GOOGLE_SECRET,
	    redirect_uri: req.body.redirectUri,
	    grant_type: 'authorization_code'
	};

  	// Step 1. Exchange authorization code for access token.
  	request.post(accessTokenUrl, { json: true, form: params }, function(err, response, token) {
      console.log(token);
	    var accessToken = token.access_token;
	    var headers = { Authorization: 'Bearer ' + accessToken };

		// Step 2. Retrieve profile information about the current user.
		request.get({ url: peopleApiUrl, headers: headers, json: true }, function(err, response, profile) {
		      if (profile.error) {
		      	console.log(profile.error);
		        return res.status(500).send({message: profile.error.message});
		      };
		      return res.send({token: createUserJWT(profile)});
		});
	});
 });

app.post('/auth/facebook', function(req, res, next){
	var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
  	var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
  	var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');

  	var params = {
	    code: req.body.code,
	    client_id: config.FACEBOOK_CLIENT_ID,
	    client_secret: config.FACEBOOK_SECRET,   
	    redirect_uri: req.body.redirectUri
  	};

  	// Step 1. Exchange authorization code for access token.
  	request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
	    if (response.statusCode !== 200) {
	      return res.status(500).send({ message: accessToken.error.message });
	    }
	    // Step 2. Retrieve profile information about the current user.
    	request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
		      if (response.statusCode !== 200 && profile.error) {
		        return res.status(500).send({ message: profile.error.message });
		      }
		      return res.send({token: createUserJWT({name: profile.name, picture: 'https://graph.facebook.com/v2.3/' + profile.id + '/picture?type=small'})}); 
	  	});
    });
});

supportRouter.use(function(req, res,next){
	 if (!req.header('Authorization')) {
    	return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  	 }

  	var token = req.header('Authorization').split(' ')[1];
  	var payload = null;
  	
  	try {
    	payload = jwt.decode(token, config.SUPPORT_TOKEN_SECRET);
  	}
  	catch (err) {
  		console.log(err);
    	return res.status(401).send({ message: err.message });
  	}

  	if (payload.exp <= moment().unix()) {
    	return res.status(401).send({ message: 'Token has expired' });
  	}
  	next();
});

app.post('/posts', supportRouter);
app.put('/posts/:id', supportRouter);
app.delete('/posts/:id', supportRouter);
app.delete('/posts/:id/comments', supportRouter);
app.post('/projects', supportRouter);
app.put('/projects/:id', supportRouter);
app.delete('/projects/:id', supportRouter);



userRouter.use(function(req, res, next){
	 if (!req.header('Authorization')) {
    	return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  	 }

  	var token = req.header('Authorization').split(' ')[1];
  	var payload = null;
  	
  	try {
    	payload = jwt.decode(token, config.USER_TOKEN_SECRET);
  	}
  	catch (err) {
      console.log(err);  
      try{
        payload = jwt.decode(token, config.SUPPORT_TOKEN_SECRET);
        console.log("not a valid user token but a valid support token");  
      }
      catch(err){
        console.log(err);  
        return res.status(401).send({ message: err.message });
      }
      
  	}

  	if (payload.exp <= moment().unix()) {
    	return res.status(401).send({ message: 'Token has expired' });
  	}
  	next();
});

app.post('/posts/:id/comments', userRouter);
app.post('/support', userRouter, function(req, res, next){
	var token = req.header('Authorization').split(' ')[1];
  	var payload = null;
  	
  	try {
    	payload = jwt.decode(token, config.USER_TOKEN_SECRET);
    	console.log(payload);
    	if(payload != null && payload.sub != null && payload.sub.name === 'Gaurav Pathak' && payload.sub.email === 'gauravp16@gmail.com' ){
    		return res.send({token: upgradeToSupportJWT(payload)});
    	}
    	return res.status(401).send({ message: 'Invalid user token, does not map to a valid support user' });
  	}
  	catch (err) {
  		console.log(err);
    	return res.status(401).send({ message: err.message });
  	}
	
});

function isSupportUser(profile)
{
	return profile.name === 'gauravp16' && profile.email === 'gauravp16@gmail.com';
}

function createUserJWT(profile) {
  var payload = {
    sub: {name: profile.name, pic: profile.picture, email: profile.email},
    iat: moment().unix(),
    exp: moment().add(30, 'minutes').unix()
  };
  return jwt.encode(payload, config.USER_TOKEN_SECRET);
}

function upgradeToSupportJWT(userPayload) {
   var supportPayload = {
    sub: {name: userPayload.sub.name,pic: userPayload.sub.pic, email: userPayload.sub.email},
    iat: moment().unix(),
    exp: moment().add(10, 'minutes').unix()
  };
  return jwt.encode(supportPayload, config.SUPPORT_TOKEN_SECRET);
}

mongoose.connect('mongodb://localhost/gaurav');
mongoose.connection.once('open', function(){
	//load the models
	app.models = require('./models/index');
	var routes = require('./routes.js');
	_.each(routes, function(controller, route){
		app.use(route, controller(app, route));
	});
	console.log('listening');
	app.listen(3000);
});
