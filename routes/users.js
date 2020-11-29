var express = require('express');
var router = express.Router();
const path = require('path');
const userController = require('../controllers/user.controller');

/**
 * @Path /users/
 */

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null,'./public/images');
  },
  filename: (req,file,cb) => {
    const newFileName = new Date().getTime().toString() + path.extname(file.originalname);
    cb(null,newFileName)
  }
})

const upload = multer({ storage })

router.get('/', userController.getAll);

router.route('/create')
  .get(userController.showCreate)
  .post(upload.single('image'), userController.create);

router.get('/delete/:id', userController.deleteUser);
router.get('/show/:id', userController.showUSer);

module.exports = router;
