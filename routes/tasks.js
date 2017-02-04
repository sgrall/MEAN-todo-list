var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://sarah:root@ds139899.mlab.com:39899/mean-todolist-db',['tasks'] );

// Get all tasks
router.get('/tasks', function(req, res, next){
  db.tasks.find(function(err, tasks){
    if(err){
      res.send(err);
    }
    res.json(tasks);
  });
});

// Get single task
router.get('/task/:id', function(req, res, next){
  db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
    if(err){
      res.send(err);
    }
    res.json(task);
  });
});

// Save task
router.post('/task', function(req, res, next){
  var task = req.body;
  if(!task.title || (task.isDone + '')){
    res.status(400);
    res.json({
      "error": "Bad data"
    });
  } else {
    db.tasks.save(task, function(err, task){
      if(err){
        res.send(err);
      }
      res.json(task);
    });
  }
});

// Delete task
router.delete('/task/:id', function(req, res, next){
  db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
    if(err){
      res.send(err);
    }
    res.json(task);
  });
});

// Update task
router.put('/task/:id', function(req, res, next){
  var task = req.body;
  var updTask = {};

  if(task.isDone){
    updTask.isDone = task.isDone;
  }

  if(task.task){
    updTask.task = task.task;
  }

  if(!updTask){
    res.status(400);
    res.json({
      "error": "Bad data"
    });
  } else {
    db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updTask, {}, function(err, task){
      if(err){
        res.send(err);
      }
      res.json(task);
    });
  }
});

module.exports = router;
