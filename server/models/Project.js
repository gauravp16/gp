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
	},
	createdBy:{
		type:String
	},
	createdOn:{ type: Date, default: Date.now }
});

module.exports = ProjectSchema;