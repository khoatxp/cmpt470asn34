var express = require('express');
var router = express.Router();
var dbConnection = require('../model/db');

router.get('/', (req, res, next)=> {
  dbConnection.query('SELECT * FROM rectangles',(err,result) =>     {
 
    if(err) {
        req.flash('error', err); 
        res.render('rectangles', { rows: {} });
    } else {
        res.render('rectangles', {rows:result});
    }
  });
});



router.get('/add', (req, res, next)=> {
    res.render('add', { rows: {} });
});



router.post('/add', (req, res, next)=> {
  let width = req.body.width;
  let height = req.body.height;
  let color = req.body.color.trim();
  var errors=[];
  
  if(width <= 0){
    errors.push("Width must be positive");
  }
  if(height <= 0){
    errors.push("Height must be positive");
  }
  if(color.length === 0){
    errors.push("Color cannot be empty");
  }
  if(errors.length){
    req.flash("error", errors);
    res.render('add', { rows: {} });
  }
  else{
      const rectangle = {
        width: width,
        height: height,
        color: color
      }
      let addRectangleQuery = 'INSERT INTO rectangles SET ?'
      dbConnection.query(addRectangleQuery, rectangle, (error, result)=>{
        if(error){
            res.end(error);
        }
        req.flash('success', 'Rectangle added');
        res.redirect('/');
    });
  }
});



router.get('/update/:id', (req, res, next)=> {
  var id = req.params.id;
  var getRectangleQuery = "SELECT * FROM rectangles WHERE id = ?";
  dbConnection.query(getRectangleQuery,[id],(error, result)=>{
    if(error){
      res.end(error);
    }
    if (!result.length) {
        req.flash('error', 'Rectangle ' + id +' not found')
        res.redirect('/')
    }
    else{
        console.log(result)
        res.render('update', {rows:result[0]});
    }
  });
});



router.post('/update/:id', (req, res, next)=> {
  let id = req.params.id;
  let width = req.body.width;
  let height = req.body.height;
  let color = req.body.color.trim();
  var errors=[];
  
  if(width <= 0){
    errors.push("Width must be positive");
  }
  if(height <= 0){
    errors.push("Height must be positive");
  }
  if(color.length === 0){
    errors.push("Color cannot be empty");
  }
  if(errors.length){
    req.flash("error", errors);
    res.render('update',{ rows: {
        id: id,
        width: width,
        height: height,
        color: color
    }})
  }
  else{
    var rectangle = [width, height,color,id];
    var updateRectangleQuery = 'UPDATE rectangles SET width = ?, height = ?, color = ? WHERE id = ?';
    dbConnection.query(updateRectangleQuery, rectangle, (error, result)=>{
        if(error){
         req.flash('error', error);
         res.render('update',{ rows: {
            id: id,
            width: width,
            height: height,
            color: color
        }})
        }
        req.flash('success', 'Rectangle updated');
        res.redirect('/');
    });
  }
});

router.get('/delete/:id', function(req, res, next) {
    let id = req.params.id;
    dbConnection.query('DELETE FROM rectangles WHERE id = ?' ,id, function(err, result) {
        if (err) {
            req.flash('error', err)
            res.redirect('/rectangles')
        } else {
            req.flash('success', 'Rectangle ' + id + ' deleted!')
            res.redirect('/')
        }
    })
})
module.exports = router;
