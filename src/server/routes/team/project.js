var express = require('express');
var router = express.Router();
var Mongodb = require('../../database/mongodb');

/**
 * 获取当月用户调休记录
 */
router.post('/saveProject', function(req, res, next){
  var param = req.body;
  Mongodb.save('projects', param, {}, function(err, docs){
    if(err){
      res.send("查询失败");
    } else {
      res.json(docs);
    }
  });
});

module.exports = router;
