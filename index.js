const express = require('express');
const port = process.env.port || 8000;
const db = require('./config/mongoose')
const app = express();
const expressLayouts = require('express-ejs-layouts');

// Middleware to use assets
app.use(express.static('./assets'));
app.use(express.urlencoded());
app.use(expressLayouts);

//extract styles and scripts from layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// Setting view engine as ejs
app.set('view engine', 'ejs');
app.set('views','./views');


app.use('/',require('./routes'));

app.listen(port,(err)=>{
    if(err){
        console.log(`Error ${err}`);
        return;
    }
    console.log(`Yup, Server is running on port : ${port}`);
})