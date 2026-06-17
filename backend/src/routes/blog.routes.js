const router = require('express').Router();
const blogController = require('../controllers/blog.controller');
const authmiddleware = require('../middleware/auth.middleware')

router.post('/create',authmiddleware,blogController.createblog);
router.get('/blogs',blogController.getblog)
router.get('/blog/:id',blogController.getsingleblog)
router.get('/blogsonprofile/:id',blogController.getblogsonprofile)
router.delete('/blogdelete',authmiddleware,blogController.deleteblog)
router.patch('/updateblog',authmiddleware,blogController.updateblog)
router.get('/blog/category/:id',blogController.getblogbycategory)
router.post('/blog/like/:blogId',authmiddleware,blogController.like)
router.get('/blog/bloglike/:blogId',authmiddleware,blogController.getbloglikes)
router.post('/blog/comment/:blogId',authmiddleware,blogController.createcomment)
router.get('/blog/allcomment/:blogId',authmiddleware,blogController.getcomment)
router.delete('/blog/comment/dlt/:blogId',authmiddleware,blogController.dltcomment)
router.put('/blog/bookmark/:blogId',authmiddleware,blogController.bookmark)
router.get('/blog/allbookmark/:blogId',authmiddleware,blogController.getbookmarks)
router.get('/blog/search/search',authmiddleware,blogController.searchblog)
router.get('/blog/latestblog',blogController.latestblog)
module.exports = router;