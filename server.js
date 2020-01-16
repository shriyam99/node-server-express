const express = require('express');
const fs = require('fs');
const hbs = require('hbs');
const PORT = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname+ '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next)=>{
  var log = `${new Date().toString()}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log+'\n', (err)=>console.log(err));
  next();
});

app.use((req, res, next)=>{
  res.render('maintenance.hbs');
});
app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getYear', ()=> new Date().getFullYear());
hbs.registerHelper('capitalize', (text)=> text.toUpperCase());

app.get('/', (req, res)=>{
  res.render('home.hbs', {
    title: 'Home Page',
    message: 'This is sample home page rendered with Handlebars in express',
    // currentDate: new Date().getFullYear(),
  });
});

app.get('/about', (req, res)=>{
  res.render('about.hbs', {
    // currentDate: new Date().getFullYear(),
    title: 'About page'
  });
});

app.listen(PORT, ()=>{
  console.log(`PORT: ${PORT}`);
});
