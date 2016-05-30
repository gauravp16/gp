var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	title: {
		type: String
	},
	text: {
		type: String
	},
	intro: {
		type:String
	},
	createdBy:{
		type:String
	},
	createdOn:{ type: Date, default: Date.now }
});

module.exports = PostSchema;