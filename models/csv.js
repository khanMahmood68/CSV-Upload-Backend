const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');

const CSV_PATH = path.join('/uploads');

// Defining Schema for CSV data storage
const csvSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    file:{
        type:Array
    }
},{
    timestamps:true,
})

//multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..', CSV_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname + '-' + uniqueSuffix)
    }
  });


//   Statics functions
  csvSchema.statics.uploadedCSV = multer({storage: storage, limits:{fileSize: 1 * 1024 * 1024}}).single('csv');
  csvSchema.statics.csvPath = CSV_PATH;


// Exports

const CSVFile = mongoose.model('CSVFile',csvSchema);
module.exports = CSVFile;