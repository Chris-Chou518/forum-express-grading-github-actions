const commentServices = require('../../services/comment-services')

const commentController = {
  postComment: (req, res, next) => {
    commentServices.postComment(req, (err, data) => err ? next(err) : res.redirect(`/restaurants/${data.comment.restaurantId}`))
    // const { restaurantId, text } = req.body
    // const userId = req.user.id
    // if (!text) throw new Error('Comment text is required!')
    // return Promise.all([
    //   User.findByPk(userId),
    //   Restaurant.findByPk(restaurantId)
    // ])
    //   .then(([user, restaurant]) => {
    //     if (!user) throw new Error("User didn't exist")
    //     if (!restaurant) throw new Error("Restaurant didn't exist")
    //     return Comment.create({
    //       text,
    //       restaurantId,
    //       userId
    //     })
    //   })
    //   .then(() => res.redirect(`/restaurants/${restaurantId}`))
    //   .catch(err => next(err))
  },
  deleteComment: (req, res, next) => {
    commentServices.deleteComment(req, (err, data) => err ? next(err) : res.redirect(`/restaurants/${data.comment.restaurantId}`))
    // return Comment.findByPk(req.params.id)
    //   .then(comment => {
    //     if (!comment) throw new Error("Comment didn't exist")
    //     return comment.destroy()
    //   })
    //   .then(deleteComment => res.redirect(`/restaurants/${deleteComment.restaurantId}`))
    //   .catch(err => next(err))
  }
}
module.exports = commentController
