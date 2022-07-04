const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { Image, User, Comment} = require('../../db/models')

const router = express.Router()

// const validateCreate = [
//   check('coverImg')
//     .exists({checkFalsy: true})
//     .withMessage("Please provide an image of the beach!"),
//   check('title')
//     .exists({checkFalsy: true })
//     .withMessage("Please provide the name of the beach!"),
//   check('description')
//     .exists({checkFalsy: true })
//     .withMessage("Please provide a description of the beach!"),
//   check('address')
//     .exists({checkFalsy: true})
//     .withMessage("Please provide an address of the beach!"),
//   check('city')
//     .exists({checkFalsy: true })
//     .withMessage("Please provide the city where the beach is located!"),
//   check('country')
//     .exists({checkFalsy: true })
//     .withMessage("Please provide the country where the beach is located!"),
//   check('zipCode')
//     .exists({checkFalsy: true })
//     .withMessage("Please provide the ZIP Code!"),
//   handleValidationErrors
// ]


//GET IMAGES
router.get('/', async (req, res) => {
  const images = await Image.findAll({
  });
  return res.json(images)
})

//GET IMAGE
router.get("/:imageId", async(req, res) => {
  const imageId = req.params.imageId
  const image = await Image.findByPk(imageId, {
    include: [{model: Comment, as: "comments"}]
  })


  return res.json(image)

})

//CREATE IMAGE
router.post('/', requireAuth, asyncHandler(async(req, res) => {

  const {
    userId,
    title,
    imageUrl,
    content,
  } = req.body

  const image = await Image.create({
    userId,
    title,
    imageUrl,
    content,
  });
  return res.json(image)

}))

//UPDATE IMAGE
router.put('/:imageId', asyncHandler(async(req, res) => {
  const imageId = req.params.imageId
  const image = await Image.findByPk(imageId)

  await image.update(req.body);

  return res.json(image)
}))



//DELETE IMAGE
router.delete('/:imageId', asyncHandler( async(req, res) => {
  const imageId = req.params.imageId

  const image = await Image.findByPk(imageId);

  await image.destroy();

  return res.json({success: true});
}))


router.get('/:imageId/comments', asyncHandler(async(req, res) => {
  const imageId = req.params.imageId
  const comments = await Comment.findAll({
    where: { imageId },
    include: [
      {model: User}
    ]
  })
  return res.json(comments)
}))

router.post('/:imageId/comments', asyncHandler(async(req, res) => {
  const newComment = await Comment.create(req.body);
  const comment = await Comment.findByPk(newComment.id, {
    include: [
      {model: User}
    ]
  })
  return res.json(comment)
}))



module.exports = router;
