const WEBPORT = 3000;

const kecontact = require('./kecontact/index.js');
const db = require('./db.js');
const express = require('express');
const Connections = require('./connections.js');
var bodyParser = require('body-parser');

var app = express();
var conns = new Connections();

app.set('views', __basedir + '/views');
app.set('view engine', 'pug');
app.use(express.static(__basedir + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.listen(WEBPORT, function () {
	console.log('JuiceUp online on port ' + WEBPORT);
});

boxes = dbase.getWallboxes().forEach(box => {
	conns.add(new kecontact(box.address), box.serial);
	conns.get()[box.serial].init();
});

app.set('kecontact', kecontact);
app.set('database', dbase);
app.set('connections', conns);

app.use('/', require(__basedir + '/routes/ui.js'));
app.use('/api', require(__basedir + '/routes/api/index.js'));