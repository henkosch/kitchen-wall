const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');

const indexRouter = require('./routes/index');
const photowallRouter = require('./routes/photowall');
const presenterRouter = require('./routes/presenter');

const app = express();

// files setup
const filesDir = path.join(__dirname, 'files');

app.locals.filesDir = filesDir;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/files', express.static(filesDir));

app.use('/scripts/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/scripts/font-awesome', express.static(__dirname + '/node_modules/font-awesome/'));
app.use('/scripts/imagesloaded', express.static(__dirname + '/node_modules/imagesloaded'));
app.use('/scripts/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/scripts/qrcodejs', express.static(__dirname + '/node_modules/qrcodejs'));
app.use('/scripts/masonry', express.static(__dirname + '/node_modules/masonry-layout/dist'));
app.use('/scripts/pdfjs', express.static(__dirname + '/node_modules/pdfjs-dist/build'));
app.use('/scripts/resizer', express.static(__dirname + '/node_modules/browser-image-resizer/dist'));
app.use('/scripts/socketio', express.static(__dirname + '/node_modules/socket.io-client/dist'));
app.use('/scripts/glide', express.static(__dirname + '/node_modules/@glidejs/glide/dist'));

app.use(fileUpload());

app.use('/', indexRouter);
app.use('/presenter/:namespace', presenterRouter);
app.use('/photowall/:namespace', photowallRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
