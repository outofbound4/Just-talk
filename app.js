/*********************************************************************************************************************************************
 * *************************************************************************
 * *************************************************************************
 *  Configuration of Frameworks
 * *************************************************************************
 * *************************************************************************
 ******************************************************************************************************************************************/

const express = require("express");
const Debug = require("debug");
const path = require("path");
const app = express();
const debug = Debug("express:app"); // Module for Debug
const logger = require("morgan"); // Module for Log
const bodyParser = require("body-parser"); // Module for POST/GET datas
const cookieParser = require("cookie-parser"); // Module for cookie in Session
const session = require("express-session");
const config = require('./config'); //it includes configuration file.

app.use(express.static(__dirname + "/public")); // all statics files in /public
app.set('views', __dirname + '/src/views');
app.set("view engine", "ejs");

// app.use(logger("dev"));
app.use(bodyParser.json()); // API response en JSON
app.use(
  // get post non encode URL
  bodyParser.urlencoded({
    limit: '2mb',
    parameterLimit: 10,
    extended: true
  })
);

/**
 * Configuration of Session
 */
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    name: config.SESSION_NAME,
    secret: config.SESSION_SECRET,
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request.
    cookie: {
      maxAge: config.SESSION_LIFETIME,
      sameSite: true,
    }, // lifetime of cookie
    saveUninitialized: false // Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified.
  })
);
/**
 * Store in local session all
 */
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

/*********************************************************************************************************************************************
 * *************************************************************************
 * *************************************************************************
 *  Routing
 * *************************************************************************
 * *************************************************************************
 ******************************************************************************************************************************************/

const database = require('./src/DBConn/database');

/**
 * Routing
 */
//on root url home page calling
app.get("/", (req, res) => res.render("userAuth"));

const Router = require("./routes/Router");
app.use("/", Router);

var server;
if (!module.parent) {
  server = app.listen(config.PORT, function () {
    console.log(`app is listening at http://localhost:${config.PORT}`);
  });
}

/**
 * here establishing socket.io connection
 */
const SocketConnection = require("./socket/socket");
var SocketConnection_obj = new SocketConnection(server);
SocketConnection_obj.listenConnection();

module.exports = app;