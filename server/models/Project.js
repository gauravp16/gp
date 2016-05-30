var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
	title: {
		type: String
	},
	text: {
		type: String
	},
	url:{
		type:String
	}
});

module.exports = ProjectSchema;