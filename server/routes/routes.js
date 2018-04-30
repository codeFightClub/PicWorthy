const router = require('express').Router();
const controller = require('../controller/controller.js');

router.post('/api/signup', controller.post.signup);

router.post('/api/login', controller.post.login);

router.get('/api/logout', controller.get.logout);

router.get('/api/user', controller.get.user);

router.post('/api/upload', controller.post.upload);

router.get('/api/closestPics', controller.get.closestPics);

router.post('/api/favorites', controller.post.favorites);

router.get('/api/suggestions', controller.get.suggestions);

module.exports = router;