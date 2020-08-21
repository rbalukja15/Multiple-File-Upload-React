const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path');

const app = express()
const port = process.env.PORT || 5000

// any request coming in, transfer all body into JSON
app.use(express.json())

// allow cross origin from client localhost
app.use(cors())

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, path.join(__dirname + '/client/public/uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname )
  }
});

var upload = multer({ storage: storage }).array('file');

// creating POST endpoint /file
app.post('/file',function(req, res) {
     
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
           
      return res.status(200).send(req.file);
    })

});

app.listen(port, error => {
  if (error) throw error
  console.log('Server running on port ' + port)
});