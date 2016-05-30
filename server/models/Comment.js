var mongoose = require('mongoose');
var postSchema = require('./Post.js');


var CommentSchema = new mongoose.Schema({
    body  : String,
  	createdOn  : { type: Date, default: Date.now },
  	createdBy: String,
  	createdByPic : String,
  	postId : {
  		type: mongoose.Schema.Types.ObjectId,
  		 ref: 'postSchema'
  		}
  	}
);

module.exports = CommentSchema;