var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    postId: String,
    commentId: String,
    title: String,
    content: String,
    publishedDate: Date,
    editedDate: Date,
});

module.exports = mongoose.model('Post', postSchema);