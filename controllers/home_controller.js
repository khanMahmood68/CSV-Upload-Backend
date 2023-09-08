const CSVFile = require('../models/csv');
const fs= require('fs');
const path = require('path');
const papaParse = require('papaparse');

// Render Home Page
module.exports.home = async (req, res)=>{
    let files = await CSVFile.find({});
    res.render('home',{
        title:'CSV Upload | Home',
        files:files
    })
}

// Create and parse csv files
module.exports.uploadFile = async (req, res)=>{
    CSVFile.uploadedCSV(req, res, async function(err){
        try {
            let csvFile = await CSVFile.findOne({name:req.file.originalname});

            // If file is already exist
            if(csvFile){
                console.log("File alredy exist");
                return res.redirect('back')
            }

            // Paring csv using papaparse
            const csvFilePath = req.file.path;
            const csvData = fs.readFileSync(csvFilePath, 'utf8');
            const conversedFile = papaParse.parse(csvData, { 
                header: false              
              });

            // Allow only csv input type
            if(req.file && req.file.mimetype == 'text/csv'){

                // Inserting the converted JSON to DB
                await CSVFile.create({
                    name: req.file.originalname,
                    file: conversedFile.data
                })
                return res.redirect('back')
            }else{
                return res.redirect('back')
            }
        } catch (error) {
            console.log(`Error ${error}`);
        }
    }) 
}

// Showing the CSV data
module.exports.displayCSV = async (req, res)=>{
    let displayData = await CSVFile.findById(req.params.id);
    return res.render('table',{
        title:'CSV Upload | Details',
        file:displayData.name,
        keys:displayData.file[0],
        results:displayData.file
    })
}

// Delete CSV from DB
module.exports.deleteCSV = async (req, res)=>{
    await CSVFile.findByIdAndDelete(req.params.id)
    return res.redirect('back')
}
