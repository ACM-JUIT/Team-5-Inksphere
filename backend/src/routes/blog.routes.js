const router = require('express').Router();
const blogController = require('../Controllers/blogController');
const authmiddleware = require('../middleware/auth.middleware')
const upload = require('../middleware/upload.middleware');

router.post('/create',authmiddleware,upload.single('coverImage'),blogController.createblog);
router.get('/blogs',blogController.getblog)
router.get('/blog/latestblog',authmiddleware,blogController.latestblog)
router.get('/blog/:id',blogController.getsingleblog)
router.get('/blogsonprofile/:id',blogController.getblogsonprofile)
router.delete('/blogdelete/:id',authmiddleware,blogController.deleteblog)
router.put('/updateblog/:id',authmiddleware,blogController.updateblog)
router.get('/blog/category/:category',blogController.getblogbycategory)
router.post('/blog/like/:blogId',authmiddleware,blogController.like)
router.get('/blog/bloglike/:blogId',authmiddleware,blogController.getbloglikes)
router.post('/blog/comment/:blogId',authmiddleware,blogController.createcomment)
router.get('/blog/allcomment/:blogId',authmiddleware,blogController.getcomment)
router.delete('/blog/comment/dlt/:commentId',authmiddleware,blogController.dltcomment)
router.put('/blog/bookmark/:blogId',authmiddleware,blogController.bookmark)
router.get('/blog/allbookmark/:blogId',authmiddleware,blogController.getbookmarks)
router.get('/blog/search/search',authmiddleware,blogController.searchblog)

module.exports = router;