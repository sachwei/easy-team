var express = require('express');
var router = express.Router();
var Mongodb = require('../../database/mongodb');

/**
 * 保存产品
 */
router.post('/saveProject', function(req, res, next){
  var param = req.body;
  Mongodb.save('projects', param, function(err, docs){
    if(err){
      res.send("查询失败");
    } else {
      res.json(docs);
    }
  });
});

/**
 * 查询所有产品
 */
router.get('/findAllProjects', function(req, res, next){
  Mongodb.find('projects', {}, {}, function(err, docs){
    if(err){
      res.send("查询失败");
    } else {
      res.json(docs);
    }
  });
});

module.exports = router;
