const commentServices = require('../../services/comment-services')
const commentController = {
  deleteComment: (req, res, next) => {
    commentServices.deleteComment(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  postComment: (req, res, next) => {
    commentServices.postComment(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  }
}
module.exports = commentController
