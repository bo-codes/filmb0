// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const imageRouter = require('./images.js');
const commentRouter = require('./comments.js');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/images', imageRouter);

router.use('/comments', commentRouter);

module.exports = router;
