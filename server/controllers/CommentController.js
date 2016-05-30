//takes a mongoose modela nd converts it to a rest api
var restful = require('node-restful');
var Post = require('../models/Post.js');

module.exports = function(app, route){
	var resource = restful.model('comment', app.models.comment).methods(['post','put', 'delete']);

	resource.route('get', function(req,res,next){
		resource.find({postId: req.params.id}).exec(function(error, comments) {
                	res.send(comments);
            	});
		});

	resource.register(app, route);

	return function(req,res,next){
		next();
	};
}
