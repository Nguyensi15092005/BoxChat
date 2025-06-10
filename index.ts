import dotenv from 'dotenv';
import express, { Express } from "express";
import * as database from "./config/database";

import http from "http";
import { Server, Socket  } from "socket.io";

// flash
import flash from "express-flash";
import cookieParser from "cookie-parser";
import session from "express-session";
import Routes from './routes/index.route';

dotenv.config();


database.connect();
const app: Express = express();
const port: number | string = process.env.PORT || 3000;

// socket.io
const server = http.createServer(app);
const io = new Server(server);
global._io = io;
// End socket.io

// flash
app.use(cookieParser('SISISISISISISI'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// end flash


// dùng đc rep.body
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// hết dùng đc rep.body

// Nhúng file tĩnh
app.use(express.static(`${__dirname}/public`));

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// Routes
Routes(app);

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})






