const express = require('express');
const router = express.Router();
const db = require('../config/database');
const mysql = require('mysql');
const path = require('path');

//Get database data

/* db.query("SELECT * FROM accounts", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });*/

 /* router.get('/db', function(req, res){
    db.query('SELECT * FROM accounts', function(err, result, fields){
        if ( error ){
            res.status(400).send('Error in database operation');
        } else {
            res.render(results);
        }
    });
});*/
/*const orm = {
    selectAll: function (cb) {
        db.query("SELECT * FROM accounts", function (err, data) {
            if (err) cb(err, null);
            cb(null, data);
        });
    }
};*/


/*display login page*/
router.get('/login', (req, res) => res.render('login'));
/*router.get('/AllStudents', (req, res) => res.render('AllStudents'));*/
router.get('/registration', (req, res) => res.render('registration'));
router.get('/bhargav', (req, res) => res.render('bhargav'));

/*Get all the details from database*/
router.get('/AllStudents', (req, res) => {
    var sql = "SELECT * FROM accounts";
      db.query(sql, function (error, result) {
        if (error) {
            return res.render('error');
        } 
        res.render("AllStudents", { result : result, style: 'AllStudents',  });
    });
});
/*Get one details from database*/
router.get('/AllStudents', (req, res) => {
    var sql = "SELECT * FROM accounts";
      db.query(sql, function (error, result) {
        if (error) {
            return res.render('error');
        } 
        res.render("AllStudents", { result : result, style: 'AllStudents',  });
    });
});


//route for delete data
router.post('/delete',(req, res) => {
  let sql = "DELETE FROM accounts WHERE id="+req.body.id+"";
  let query = db.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/routing/AllStudents');
  });
});
//EDIT User Information
router.post('/update',(req, res) => {
  let sql = "UPDATE accounts SET username='"+req.body.username+"', email='"+req.body.username+"' WHERE id="+req.body.id;
  let query = db.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/routing/AllStudents');
  });
});

/*Registration Page database Code*/

router.post('/userRegistration', function (req, res) {
    // this is where you handle the POST request.
    var username = req.body.username;
    var password =  req.body.password;
    var email =  req.body.email;
     
     // now the createStudent is an object you can use in your database insert logic.
     db.query('INSERT INTO accounts (username,password,email) VALUES ("'+ username +'","'+ password +'","'+ email +'")', function (err, result){
       if (err) throw err;
       // if there are no errors send an OK message.
       res.redirect('/');
     });
   });

/*Login authentication*/

  router.post('/login_auth', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    if (username && password) {
        db.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {
                // request.session.loggedin = true;
                // request.session.username = username;
                res.redirect('/routing/bhargav');
                
            } else {
                res.send('Incorrect Username and/or Password!');
            }           
            res.end();
        });
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
});

  module.exports = router;


