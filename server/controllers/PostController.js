//takes a mongoose modela nd converts it to a rest api
var restful = require('node-restful');

module.exports = function(app, route){
	var rest = restful.model('post', app.models.post).methods(['get','post','put', 'delete']);

	rest.register(app, route);

	return function(req,res,next){
		next();
	};
}
