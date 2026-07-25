const router = require('express').Router();
const userController = require('../Controllers/userController');
const authmiddleware = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

router.get('/profile',authmiddleware,userController.getProfile);
router.put('/updateprofile',authmiddleware,userController.updateprofile)
router.put('/upload-profile',authmiddleware,upload.single('image'),userController.uploadProfilePic);
router.get('/profilepicture',authmiddleware,userController.getprofilepicture)
router.get('/profile/:id',userController.profilebyid)
module.exports = router;