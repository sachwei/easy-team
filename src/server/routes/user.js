var express = require('express');
var router = express.Router();
var MongoDB = require('../database/mongodb');

router.post('/login', function(req, res, next) {
  let param = '';
  for(let key in req.body){
    param += `${key}=${req.body[key]}&`
  }
  param = param.substr(0, param.length - 1);
  dbUtils.getLoginHttp().post('/login', param).then((response) => {
    const user = response.data
    if (user.errorCode === 0) {
      req.session.user = user;
      res.json(user);
    } else {
      res.send("用户名密码错误");
    }
  }, () => {
    res.send("登录失败");
  })
});

/**
 * 获取所有用户
 */
router.get('/getAllUsers', function(req, res, next){
  MongoDB.find('users', {}, {}, function(err, docs){
    if(err){
      res.send("查询失败");
    } else {
      res.json(docs);
    }
  });
});


module.exports = router;
