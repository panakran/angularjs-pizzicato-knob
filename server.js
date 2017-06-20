var express = require('express');
var app = express();

app.use(express.static(__dirname + '/pizzicatoapp'));
app.use('/scripts', express.static(__dirname + '/node_modules/'));

app.get('/pizzicatoapp', function(res){
  res.redirect('/index.html');
});

app.listen(3000);