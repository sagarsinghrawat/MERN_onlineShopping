const express = require('express')
const multer = require('multer')
const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb( null, 'uploads/')
    },
    filename: function(req, file, cb){
        cb( null, file.originalname)
    }
})

const fileFilter = ( req, file, cb) => {

    if( file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' ) {
        cb( null, true )
    } else {
        cb( null, false)
    }
}

const upload = multer({
    storage,
    limits: {
        fileSize: 1024*1024*5
    },
    fileFilter
})

router.post( '/', upload.single('image'), (req, res) => {
    res.send(`${req.file.path}`)
})

module.exports = router