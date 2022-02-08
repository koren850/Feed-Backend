const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    try {

        const collection = await dbService.getCollection('feed')
        var comments = await collection.find({}).toArray()
        return comments
    } catch (err) {
        logger.error('cannot find comments', err)
        throw err
    }

}

// async function remove(reviewId) {
//     try {
//         const store = asyncLocalStorage.getStore()
//         const { userId, isAdmin } = store
//         const collection = await dbService.getCollection('review')
//         // remove only if user is owner/admin
//         const criteria = { _id: ObjectId(reviewId) }
//         if (!isAdmin) criteria.byUserId = ObjectId(userId)
//         await collection.deleteOne(criteria)
//     } catch (err) {
//         logger.error(`cannot remove review ${reviewId}`, err)
//         throw err
//     }
// }


async function add(comment) {
    try {

        const collection = await dbService.getCollection('feed')
        const addedComment = await collection.insertOne(comment)
        return addedComment.ops;
    } catch (err) {
        logger.error('cannot insert comment', err)
        throw err
    }
}

// function _buildCriteria(filterBy) {
//     const criteria = {}
//     if (filterBy.byUserId) criteria.byUserId = filterBy.byUserId
//     return criteria
// }

module.exports = {
    query,
    // remove,
    add
}


