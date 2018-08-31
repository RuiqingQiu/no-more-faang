const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var shell = require('shelljs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use(express.static('public'));

var fs = require('fs');

app.get('/', (req, res) => {
	console.log('in / get handler');
	console.log(req.query);
  //res.send('HEY!')
  res.render('index');
})

app.post('/', (req, res) => {
	console.log('in / post handler');
	console.log(req.body);
	res.render('index');
})

app.get('/test', (request, response) => {
	response.send('/test get');
});
app.post('/test', (request, response) => {
	var body = request.body.city;
  fs.writeFile("./tmp/test.py", body, function(err) {
		if (err) {
			response.send("File save failed");
			return console.log(err);
		} else {
			console.log("File saved");
			response.send(shell.exec('python ./tmp/test.py'));
		}
	
	});
})

app.get('/java', (request, response) => {
	if (shell.exec('javac ./tmp/test.java').code === 0) {
		response.send(shell.exec('java -cp ./tmp test'));
	} else {
		response.send('java file compile failed');
	}
});


app.listen(3000, () => console.log('Server running on port 3000'))
