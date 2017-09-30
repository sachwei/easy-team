import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import webpack from 'webpack'
import session from 'express-session'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import config from '../../build/webpack.dev.conf'

var user = require('./routes/user');
var data = require('./routes/data');
var project = require('./routes/team/project');
// var excel = require('./routes/excel');

const app = express()

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: { colors: true }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(path.join(__dirname, 'views')))
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

// 会话过期时间1小时
app.use(session({
  secret:'secret',
  resave:true,
  saveUninitialized: false,
  cookie:{
    maxAge:1000 * 60 //过期时间设置(单位毫秒)
  }
}));

app.use(function (req, res, next) {
  console.log(req.url + ',' + req.originalUrl + ',' + req.baseUrl);

  if(req.url === '/user/login' || req.session.user) {
    next();
  } else {
    console.log("请重新登录");
    req.session.error = -1;
    res.redirect('/');
  }
});

app.get('/', function (req, res) {
  res.sendFile('./views/index.html')
})

app.use('/user', user);
app.use('/data', data);
app.use('/project', project);
// app.use('/excel', excel);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
// will print stacktrace
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: err
  })
})

app.listen(4000)

export default app
