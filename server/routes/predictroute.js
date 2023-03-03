const router = require('express').Router();
const spawn = require('child_process').spawn;
const { json } = require('express');
const multer = require("multer")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
   
});

const upload = multer({storage:storage}) 
router.post('/',upload.single("image"),(req, res) => {
    filepath= req.file.path; 
    const process = spawn('python', ['./display.py',filepath]);
    process.stdout.on('data', (data) => {
        console.log(data.toString());
        res.send((data));
    });

});

module.exports = router;