'use strict';

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const http = require('http'),
      express = require('express'),
      expressLayouts = require('express-ejs-layouts'),
      session = require('express-session'),
      cors = require('cors'),
      morgan = require('morgan');

const db = require('./lib/database');

db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ limit: '10mb', extended: false }));
app.use(expressLayouts);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});
app.use(cors());
app.use(morgan('dev'));

const indexRouter = require('./routes/index'),
      createProductRouter = require('./routes/createProduct'),
      createProductPageRouter = require('./routes/createProductPage'),
      cartRouter = require('./routes/cart'),
      manageCartRouter = require('./routes/manage-cart');

app.use('/', indexRouter);
app.use('/api/createProduct', createProductRouter);
app.use('/createProduct', createProductPageRouter);
app.use('/cart', cartRouter);
app.use('/api/manage-cart', manageCartRouter);

const server = http.createServer(app);

server.listen(process.env.PORT || 8080);

