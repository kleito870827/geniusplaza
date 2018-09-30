const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const server = express();
server.use(bodyParser.json());
server.use(cors());
const port = 5000;

// The data here is not currently living in a database and are reset when the server resets

// the user object contains all the users with key being the username and value being an object containing password and board properties
const users = {
	abc: {
		password: '123',
		board: {}
	}
}; 
const token = '123token';

const decodeToken = token => token.replace('123token', '');

server.post('/login', (req, res) => {
	if (users[req.body.username] && users[req.body.username].password === req.body.password)
		return res.json({token: token + req.body.username});

	res.status(400).json("incorrect username or password");
});

server.post('/signup', (req, res) => {
	if (users[req.body.username])
		return res.status(400).json('user already exists');

	users[req.body.username] = {
		password: req.body.password,
		board: {}
	};
	res.json({success: true});

});



server.post('/saveBoard', (req, res) => {
	const token = req.headers.authorization;
	if (!token)
		return res.status(400).json('no token');

	const username = decodeToken(token);
	const user = users[username];

	if (!user)
		return res.status(400).json('no user');



	// needs completed

});

server.get('/board', () => {
	const token = req.headers.authorization;
	if (!token)
		return res.status(400).json('no token');

	const username = decodeToken(token);
	const user = users[username];

	if (!user)
		return res.status(400).json('no user');


	// needs completed



});

server.listen(port, () => console.log(`Server listening on port ${port}!`))
