//takes a mongoose modela nd converts it to a rest api
var restful = require('node-restful');

module.exports = function(app, route){
	var rest = restful.model('project', app.models.project).methods(['get', 'post', 'delete', 'put']);

	rest.register(app, route);

	return function(req,res,next){
		next();
	};
}
