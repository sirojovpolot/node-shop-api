const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const ProductController = require('../constrollers/products');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 //5Mb gacha yuklash mumkin
    },
    fileFilter: fileFilter
});


router.get('/', ProductController.products_get_all);

router.post('/', checkAuth,upload.single('productImage'), ProductController.products_create);

router.get('/:productId', ProductController.products_getById);

router.patch('/:productId', checkAuth,ProductController.update_product);

router.delete('/:productId',checkAuth, ProductController.delete_product);


module.exports = router