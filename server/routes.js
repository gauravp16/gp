module.exports = {
	'/posts': require('./controllers/PostController'),
	'/projects': require('./controllers/ProjectController'),
	'/posts/:id/comments': require('./controllers/CommentController')
};