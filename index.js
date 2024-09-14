import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import axios from "axios";
import register from "./routes/register.js";
import login from "./routes/login.js";
import logout from "./routes/logout.js";
import user from "./routes/getUser.js";
import enroll from "./routes/enroll.js";
import getEnrollInfo from "./routes/getEnrollInfo.js"
import levelSubmit from "./routes/levelSubmit.js";
import getLevels from "./routes/getLevels.js"
import "./database/connection.js";
import "./middleware/passport.js";


const app = express();
const port = 3000;

// CORS configuration
const allowedOrigin = "https://interactive-learning-platfrom.vercel.app"; // Set your Vercel app URL

app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type' , 'Authorization', 'Set-Cookie','Cookie','Cache-Control','connect.sid','Expires','Pragma'],
}));
// Bodyparser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Session configuration
app.use(session({
  secret: "IAMSARTHAKNANDE",
  resave: false,
  saveUninitialized: true,
  proxy: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 1,
    secure: true, // required for cookies to work on HTTPS
    httpOnly: true,
    sameSite: 'none'
  }
}));

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', register);
app.use('/auth', login);
app.use('/auth', logout);
app.use('/auth', user);
app.use('/course', enroll);
app.use('/course', getEnrollInfo);
app.use('/level', levelSubmit);
app.use('/level', getLevels);

app.get('/session-data', (req, res) => {
  // Send session data to the frontend
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).send('No session data available.');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
