const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the Uxgurus API'
  });
});

app.post('/api/user', verifyToken, (req, res) => {  
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'You are authenticated to use Uxg Software',
        authData
      });
    }
  });
});


app.post('/api/login', (req, res) => {
  // Mock user
  const user = {
    id: 1, 
    username: 'akshat',
    email: 'akshat@gmail.com'
  }

  jwt.sign({user}, 'secretkey', { expiresIn: '3600s' }, (err, token) => {
    res.json({
      token
    });
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }

}

app.listen(5000, () => console.log('Our Uxg Server Starts on port 5000'));