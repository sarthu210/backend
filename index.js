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
  methods: 'GET,DELETE,PATCH,POST,PUT',
  allowedHeaders: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  credentials: true, // This allows cookies to be sent
}));

// Bodyparser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('trust proxy', true);
app.enable('trust proxy')

// Session configuration
app.use(session({
  secret: "IAMSARTHAKNANDE",
  resave: false,
  saveUninitialized: true,
  proxy: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 1,
    secure: true, // required for cookies to work on HTTPS
    httpOnly: false,
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
