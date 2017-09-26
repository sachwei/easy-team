var express = require('express');
var router = express.Router();
var Mongodb = require('../database/mongodb');

/**
 * 获取当月用户调休记录
 */
router.post('/getUserWorkRecords', function(req, res, next){
  var param = req.body;
  var userName = req.session.user.loginName;
  var startDate = new Date(param.year, param.month, 1, 0, 0, 0);
  var endDate = new Date(param.year, param.month, 31, 23, 59, 59);

  var where = {
    "userName": userName,
    "workDate": {
      '$gte': startDate,
      '$lte': endDate
    }
  };

  Mongodb.find('workRecords', where, {}, function(err, docs){
    if(err){
      res.send("查询失败");
    } else {
      res.json(docs);
    }
  });
});


/**
 * 获取当年用户调休记录
 */
router.post('/getYearRecords', function(req, res, next){
  var param = req.body;
  var userName = req.session.user.userName;
  var startDate = new Date(param.year, 1, 1, 0, 0, 0);
  var endDate = new Date(param.year, 12, 31, 23, 59, 59);

  var where = {
    "userName": userName,
    "workDate": {
      '$gte': startDate,
      '$lte': endDate
    }
  };

  Mongodb.find('workRecords', where, {}, function(err, docs){
    if(err){
      res.send("查询失败");
    } else {
      res.json(docs);
    }
  });
});

module.exports = router;
