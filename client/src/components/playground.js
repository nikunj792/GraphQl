const express = require('express');

const app = express();

app.listen(3002, ()=>console.log('Port is ruufsdfdsfnin',__dirname))

app.locals.titles = {
    "/" : "HomePage",
    "/blog" : "Blog",
    "/contact" : "Contact"
}

app.use((req, res, next)=>{
    res.locals.titles = req.locals.titles[req.url]
    console.log(__dirname)
    next();
})