const express = require('express');
const asyncHandler = require('express-async-handler');
const {Comment} = require('../../db/models')

const router = express.Router()


//DELETE COMMENT
router.delete('/:commentId', asyncHandler(async(req, res) => {
  const commentId = req.params.commentId

  const comment = await Comment.findByPk(commentId);
  await comment.destroy();

  return res.json({success: true});
}))


module.exports = router;
