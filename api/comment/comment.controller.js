const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const socketService = require('../../services/socket.service')
const commentService = require('./comment.service')

async function getComments(req, res) {
    try {
        const comments = await commentService.query(req.query)
        res.send(comments)
    } catch (err) {
        logger.error('Cannot get comments', err)
        res.status(500).send({ err: 'Failed to get comments' })
    }
}

// async function deleteomment(req, res) {
//     try {
//         await commentService.remove(req.params.id)
//         res.send({ msg: 'Deleted successfully' })
//     } catch (err) {
//         logger.error('Failed to delete comment', err)
//         res.status(500).send({ err: 'Failed to delete comment' })
//     }
// }


async function addComment(req, res) {
    try {
        var comment = req.body
        // comment.byUserId = req.session.user._id
        comment = await commentService.add(comment)
        socketService.broadcast({ type: 'comment-added', data: comment })
        res.send(comment)

    } catch (err) {
        console.log(err)
        logger.error('Failed to add comment', err)
        res.status(500).send({ err: 'Failed to add comment' })
    }
}

module.exports = {
    getComments,
    // deleteComment,
    addComment
}